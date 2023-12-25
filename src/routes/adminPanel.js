const { Router } = require('express');
const router = Router();

router.use((req, res, next) => {
    if (req.session.account.type !== 'admin') {
        res.redirect('/');
    }
    next();
})

router.get('/', (req, res) => {
    res.send(req.session.cart);
});

module.exports = router;
