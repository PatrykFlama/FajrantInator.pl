const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');
const Users = require('../database/schemas/Users');

router.get('/:productID', async (req, res) => {
    const product = await Products.findOne({ _id: req.params.productID });
    const ratings = product.ratings.map((rating) => rating.rating);
    const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : null;

    let cart = req.session.cart;
    let user = req.session.account.type;

    if (!product) {     // error: 'Product not found'
        res.render('productView', { productName: `Product with id ${parsedID} not found`, productPrice: null, productDescription: null , cart: cart, user: user})
        return;
    }

    if (req.session.account.type !== 'guest') {
        const user = await Users.findOne({ username: req.session.account.username});
        let ratingObject = product.ratings.filter((ratingObj) => ratingObj.user.equals(user._id))[0];
        let yourRate = -1;
        
        if(ratingObject){
            yourRate = ratingObject.rating;
        }

        if (user.orders.includes(product.id)) {
            const productName = product.name;
            const productCourseName = product.courseName;
            const productTask = product.taskNumber;
            const productExercise = product.listNumber;

            res.render('productView_B', { 
                id:product.id, 
                productName, 
                productCourseName, 
                productTask, 
                productExercise, 
                productPrice: product.price, 
                productDescription: product.description,
                productSolutionFileName: product.solutionFileName, 
                productSolutionCode: product.solutionCode,
                ratings: product.ratings, 
                averageRating, 
                cart: cart, 
                user: user,
                yourRate
            });
            return;
        }
    }

    

    const productName = product.name;
    const productCourseName = product.courseName;
    const productTask = product.taskNumber;
    const productExercise = product.listNumber;

    res.render('productView', { 
        id:product.id,
        productName, productCourseName, productTask, productExercise, 
        productPrice:product.price, 
        productDescription:product.description,
        ratings: product.ratings, 
        averageRating, 
        cart: cart, 
        user: user
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
});

router.post('/rateProduct', async (req,res)=>{
    try {
        const { productID, rating } = req.body;
        const user = await Users.findOne({ username: req.session.account.username });
        const product = await Products.findOne({ _id: productID });
    
        if (product.ratings.some((ratingObj) => ratingObj.user.equals(user.id))) {
          res.status(400).send('You have already rated this product');
          return;
        }
        
        product.ratings.push({ user: user.id, rating });
        await product.save();
    
        res.redirect(`/product/${productID}`);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/deleteProduct', async (req,res)=>{
    if(req.session.account.type !== 'admin'){
        res.status(403).send('Forbidden');
        return;
    }

    try {
        const { productID } = req.body;
        await Products.deleteOne({ _id: productID });
        res.redirect('/products');
    } 
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.post('/deleteRating', async (req,res)=>{
    if (req.session.account.type !== 'admin') {
        res.status(403).send('Forbidden');
        return;
    }

    try {
        const { productID, userID } = req.body;
        const product = await Products.findOne({ _id: productID });
        product.ratings.pull({ user: userID });
        await product.save();
        res.redirect(`/product/${productID}`);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

});

module.exports = router;
