const { Router } = require('express');
const router = Router();

const { products } = require('../data/TEMPdatabase.json');

router.get('/', (req, res) => {
    res.send(req.session.cart);
});

module.exports = router;
