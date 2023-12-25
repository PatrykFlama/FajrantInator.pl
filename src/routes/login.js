const { Router } = require('express');
const router = Router();
const Users = require('../database/schemas/Users');


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
router.get('/register', (req, res) => {
    res.render('register', {error: null});
});

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password) {   // TODO - add email validation
        return res.sendStatus(400);
    }
    
    const checkDB = await Users.findOne({ $or: [{ username: username }, { email: email }] });
    if (checkDB) {
        res.render('register', { error: 'Username or email already taken' });
        return res.sendStatus(400);
    }

    const newUser = new Users({
        username: username,
        password: password,
        email: email,
    });

    await newUser.save();

    res.redirect('/login');
});


module.exports = router;
