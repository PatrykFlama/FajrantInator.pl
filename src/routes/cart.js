const { Router } = require('express');
const router = Router();
const User = require('../database/schemas/Users');
const Product = require('../database/schemas/Products');
const { calculateProductsTotal } = require('../utils/helpers');


router.get('/', async (req, res) => {
    let cart = [];
    for (let i = 0; i < req.session.cart.length; i++){
        cart[i] = await Product.findById(req.session.cart[i]);
    }
    const total = await calculateProductsTotal(req.session.cart);
    res.render('cart', {cart: cart, total: total });
});

router.post('/addToCart', (req,res)=>{
    const productID = req.body.id;
    
    if(req.session.cart){
        const cart = req.session.cart;
        if(!cart.includes(productID)){    // we can buy only one product of each type
            cart.push(productID);
        }
    }
    else{
        req.session.cart = [productID];
    }

    res.redirect(req.get('Referrer'));
})

router.post('/removeProduct', (req,res)=>{
    const id = req.body.id;
    const cart = req.session.cart;
    for(let i = 0; i < cart.length; i++){
        if(cart[i] == id){
            cart.splice(i, 1);
            break;
        }
    }

    res.redirect('/cart');
})

module.exports = router;
