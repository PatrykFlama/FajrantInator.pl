const { Router } = require('express');
const router = Router();
const User = require('../database/schemas/Users');

router.get('/', (req, res) => {
    res.send(req.session.cart);
});

module.exports = router;
