const { Router } = require('express');
const router = Router();

const { products } = require('../data/TEMPdatabase.json');

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
        return res.status(400).send({ error: 'Username and password are required' });
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
    res.send(200);
});

module.exports = router;
