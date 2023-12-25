const { Router } = require('express');
const router = Router();
const User = require('../database/schemas/Users');

router.get('/', (req, res) => {
    //res.send(req.session.cart);
    const cart = req.session.cart;
    const total = req.session.total;
    res.render('cart',{cart:cart, total:total});
});

module.exports = router;
