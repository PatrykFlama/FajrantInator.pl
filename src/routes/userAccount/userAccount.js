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
router.use('/quiz', require('./quiz'));

router.get('/', (req, res) => {
    let check = req.session.account.check;
    if(check === false){
        res.redirect('/account/quiz');
        return;
    }
    res.render('userAccount/userAccount');
});

module.exports = router;
