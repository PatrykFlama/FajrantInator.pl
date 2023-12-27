const { Router } = require('express');
const router = Router();

router.get('/',(req,res)=>{
    const accountType = req.session.account.type;
    if (accountType === 'guest') {
        res.render('login', { error: null });
    } else {
        res.redirect('order');
    }
})


module.exports = router;