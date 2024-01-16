const { Router } = require('express')
const router = Router();

router.use('/addProduct', require('./addProduct'));
router.use('/addedProducts', require('./addedProducts'));
router.use('/editProduct', require('./editProduct'));
router.use('/quiz', require('./quiz'));

router.get('/', (req, res) => {
    let check = req.session.account.check;
    let seller = req.session.account.seller
    if(check === false){
        res.redirect('/account/quiz');
        return;
    }
    else if(check === true && seller === false){
        res.render('userAccount/userAccount_D');
        return;
    }
    res.render('userAccount/userAccount');
});

module.exports = router;
