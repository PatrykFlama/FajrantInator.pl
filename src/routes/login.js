const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    const accountType = req.session.account.type;
    if (accountType === 'guest') {
        res.render('login');
    } else {
        res.redirect('/');
    }
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.sendStatus(400);
    }

    // TODO - check if username and password are correct
    if (username === 'admin' && password === 'admin') {
        req.session.account = {
            type: 'admin'
        }
    } else {
        req.session.account = {
            type: 'user'
        }
    }

    res.redirect('/');
});

// TODO register


module.exports = router;
