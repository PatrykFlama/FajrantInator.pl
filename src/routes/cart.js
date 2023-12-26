const { Router } = require('express');
const router = Router();
const User = require('../database/schemas/Users');
//TODO fix problems with total and price, remove from the cart, add another product to cart

function isProductInCart(cart,id){
    for(let i=0; i<cart.length; i++){
        if(cart[i].id == id){
            return true;
        }
    }
    return false;
}

function calculateTotal(cart,req){
    total = 0;
    for(let i=0; i<cart.length; i++){
        total = total + (cart[i].price);
    }
    req.session.total = total;
    return total;
}


router.get('/', (req, res) => {
    const cart = req.session.cart;
    const total = req.session.total;
    res.render('cart',{cart:cart, total:total});
});


router.post('/addToCart',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const tasklist = req.body.tasklist;
    const taskexercise = req.body.taskexercise;
    const price = req.body.price;
    const product = {id:id, name:name, tasklist:tasklist, taskexercise:taskexercise, description:description, price:price}
    
    if(req.session.cart){
        const cart = req.session.cart;
        if(!isProductInCart(cart, id)){
            cart.push(product);
        }
    }
    else{
        req.session.cart = [product];
    }

    calculateTotal(req.session.cart,req);

    res.redirect('/cart');
})

router.post('/removeProduct', (req,res)=>{
    const id = req.body.id;
    const cart = req.session.cart;
    for(let i=0; i<cart.length; i++){
        if(cart[i].id==id){
            cart.splice(cart.indexof(i), 1);
        }
    }
    calculateTotal(cart,req);
    res.redirect('/cart');
})

module.exports = router;
