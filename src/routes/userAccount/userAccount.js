const { Router } = require('express')
const router = Router();

// router.use((req, res, next) => {
//     const accountType = req.session.account.type;
//     if (accountType === 'guest') {
//         res.redirect('/');
//     } else {
//         next();
//     }
// });

router.use('/addProduct', require('./addProduct'));
router.use('/addedProducts', require('./addedProducts'));
router.use('/editProduct', require('./editProduct'));

router.get('/', (req, res) => {
    res.render('userAccount/userAccount');
});

module.exports = router;
