const { Router } = require('express');
const router = Router();
const Order = require('../database/schemas/Orders');
const Product = require('../database/schemas/Products');
const User = require('../database/schemas/Users');
const { calculateProductsTotal } = require('../utils/helpers');

router.post('/createOrder', async (req, res)=>{
    const accountType = req.session.account.type;
    if (accountType === 'guest') {
        res.render('login', { error: null });
        return;
    }

    const cart = req.session.cart;
    const username = (req.session.account.type === 'user' ? req.session.account.username : req.session.account.type);
    const email = req.session.account.email;

    if (!cart || cart.length === 0) {
        res.redirect('/cart');
        return;
    }

    const total = await calculateProductsTotal(cart);
    const newOrder = new Order({
        cost: total,
        username: username,
        email: email,
        accountType: accountType,
        date: new Date(), 
        products: cart,
    });

    try {
        await newOrder.save();
        req.session.cart = [];

        const user = await User.findOne({ username: username });
        user.orders.push(newOrder.products);
        await user.save();

        let boughtProducts = [];
        for (let i = 0; i < newOrder.products.length; i++){
            boughtProducts[i] = await Product.findById(newOrder.products[i]);
        }

        res.render('order', { order: newOrder, products: boughtProducts, error: null });
    } catch (error) {
        console.error(error);
        res.render('order', { order: newOrder, products: [], error: 'Failed to create the order.' });
    }
})


module.exports = router;
