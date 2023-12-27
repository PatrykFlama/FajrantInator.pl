const { Router } = require('express');
const router = Router();
const User = require('../database/schemas/Users');

function isProductInCart(cart,id){
    for(let i=0; i<cart.length; i++){
        if(cart[i].id == id){
            return true;
        }
    }
    return false;
}

function calculateTotal(cart){
    total = 0;
    for(let i=0; i<cart.length; i++){
        total = total + (cart[i].price);
    }
    return total;
}


router.get('/', (req, res) => {
    const cart = req.session.cart;
    const total = calculateTotal(cart);
    req.session.total = total;
    res.render('cart',{cart: cart, total: total });
});


router.post('/addToCart',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const image = req.body.image;
    const courseName = req.body.courseName;
    const listNumber = req.body.listNumber;
    const taskNumber = req.body.taskNumber;
    const solution = req.body.solution;
    const product = {id:id, name:name, description:description, price:price, image:image, courseName:courseName, 
        listNumber:listNumber, taskNumber:taskNumber, solution:solution }
    
    if(req.session.cart){
        const cart = req.session.cart;
        if(!isProductInCart(cart, id)){
            cart.push(product);
        }
    }
    else{
        req.session.cart = [product];
    }

    const total = calculateTotal(req.session.cart,req);
    req.session.total = total;

    res.redirect('/listing');
})

router.post('/removeProduct', (req,res)=>{
    const id = req.body.id;
    const cart = req.session.cart;
    for(let i=0; i<cart.length; i++){
        if(cart[i].id==id){
            cart.splice(i, 1);
            break;
        }
    }
    const total = calculateTotal(cart,req);
    req.session.total = total;
    res.redirect('/cart');
})

module.exports = router;
