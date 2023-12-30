const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');
const Users = require('../database/schemas/Users')


router.get('/:productID', async (req, res) => {
    // const product = await Products.findOne({ $and: [{ courseName: req.params.courseName }, 
    //                                                 { taskList: req.params.listNumber }, 
    //                                                 { taskExercise: req.params.taskNumber }] });
    const product = await Products.findOne({ _id: req.params.productID });
    const ratings = product.ratings.map((rating) => rating.rating);
    const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : null;

    if (!product) {     // error: 'Product not found'
        res.render('productView', { productName: `Product with id ${parsedID} not found`, productPrice: null, productDescription: null })
        return;
    }

    if (req.session.account.type !== 'guest') {
        const user = await Users.findOne({ username: req.session.account.username});

        if (user.orders.includes(product.id)) {
            const productName = product.courseName + ', Task ' + product.taskList + ', Exercise ' + product.taskExercise;
            res.render('productView_B', { id:product.id, productName, productPrice:product.price, productDescription:product.description, 
                productSolution:product.solution, ratings: product.ratings, averageRating});
            return;
        }
    }
    const productName = product.courseName + ', Task ' + product.taskList + ', Exercise ' + product.taskExercise;
    res.render('productView', { id:product.id, productName, productPrice:product.price, productDescription:product.description,
        ratings: product.ratings, averageRating });
});

router.post('/addToCart', (req,res)=>{
    const productID = req.body.id;
    
    if(req.session.cart){
        const cart = req.session.cart;
        if(!cart.includes(productID)){    
            cart.push(productID);
        }
    }
    else{
        req.session.cart = [productID];
    }

    const productURL = `/product/${productID}`;
    res.redirect(productURL);
})

router.post('/rateProduct', async (req,res)=>{
    try {
        const { productID, rating } = req.body;
        const user = await Users.findOne({ username: req.session.account.username });
    
        const product = await Products.findOne({ _id: productID });
    
        if (product.ratings.some((ratingObj) => ratingObj.user.equals(user._id))) {
          res.status(400).send('You have already rated this product');
          return;
        }
    
        product.ratings.push({ user: user._id, rating });
        await product.save();
    
        res.redirect(`/product/${productID}`);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router;
