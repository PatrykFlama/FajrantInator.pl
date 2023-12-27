const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');
const Users = require('../database/schemas/Users')

/* //TODO
* check if user already bought this product
* POST allow for rating product
*/

router.get('/:productID', async (req, res) => {
    // const product = await Products.findOne({ $and: [{ courseName: req.params.courseName }, 
    //                                                 { taskList: req.params.listNumber }, 
    //                                                 { taskExercise: req.params.taskNumber }] });
    const product = await Products.findOne({ _id: req.params.productID });

    if (!product) {     // error: 'Product not found'
        res.render('productView', { productName: `Product with id ${parsedID} not found`, productPrice: null, productDescription: null })
        return;
    }

    // if (req.session.account.type !== 'guest') {
    //     const user = await Users.findOne({ username: req.session.account.username});

    //     if (user.orders.includes(product.id)) {
    //         const productName = product.courseName + ', Task ' + product.taskList + ', Exercise ' + product.taskExercise;
    //         res.render('productView_B', { id:product.id, productName, productPrice:product.price, productDescription:product.description, 
    //         productSolution:product.solution });
    //     }
    // }
    const productName = product.courseName + ', Task ' + product.taskList + ', Exercise ' + product.taskExercise;
    res.render('productView', { id:product.id, productName, productPrice:product.price, productDescription:product.description });
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


module.exports = router;
