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

module.exports = router;
