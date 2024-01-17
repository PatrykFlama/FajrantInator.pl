const { Router } = require('express')
const router = Router();

router.use((req, res, next) => {
    if (req.session.account.type === 'guest') {
        res.redirect('/');
    }
    else {
        next();
    }
});

router.use('/addProduct', require('./addProduct'));
router.use('/addedProducts', require('./addedProducts'));
router.use('/editProduct', require('./editProduct'));
router.use('/quiz', require('./quiz'));

router.get('/', (req, res) => {
    res.render('userAccount/userAccount', { user: req.session.account.type, 
        check: req.session.account.check, 
        seller: req.session.account.seller,
    });
});

module.exports = router;
