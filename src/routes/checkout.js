const { Router } = require('express');
const router = Router();
const Order = require('../database/schemas/Orders');
//TODO: fix duplicate key error in MONGO

router.post('/createOrder', async(req,res)=>{
    const accountType = req.session.account.type;
    if (accountType === 'guest') {
        res.render('login', { error: null });
    }
    else{
        const cart = req.session.cart;
        const username = req.session.username;
        const email = req.session.email;

        if (!cart || cart.length === 0) {
            return res.render('cart', { cart: [], total: 0, error: 'Your cart is empty.', accountType: accountType });
        }

        const total = cart.reduce((acc, product) => acc + product.price, 0);


        const newOrder = new Order({
            cost: total,
            username: username,
            email: email,
            type: accountType,
            date: new Date(), 
            products: cart.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description : product.description, 
                image : product.image,
                courseName : product.courseName,
                listNumber : product.listNumber,
                taskNumber : product.taskNumber,
                solution : product.solution,
                
            })),
        });


        try {
            await newOrder.save();
            req.session.cart = []; 
            req.session.total = 0;
            res.render('order', { order: newOrder });
        } catch (error) {
            console.error(error);
            res.render('cart', { cart: cart, total: total, error: 'Failed to create the order.', accountType: accountType });
        }
    }
})


module.exports = router;