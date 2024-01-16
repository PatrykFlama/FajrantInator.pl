const { Router } = require('express');
const router = Router();
const Users = require('../database/schemas/Users');
const { hashPassword, comparePasswords, checkCart } = require('../utils/helpers');

router.get('/', (req, res) => {
    const accountType = req.session.account.type;
    const redirectURL = req.query.redirect;

    if (accountType === 'guest') {
        if (redirectURL) {
            res.render('login', { error: null, redirectURL });
        } else {
            res.render('login', { error: null, redirectURL: '/' });
        }
    } else {
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    const { username, password, redirectURL } = req.body;

    if (!username || !password) {
        return res.sendStatus(400);
    }
  
    // check if user exists in DB and if password matches
    const user = await Users.findOne({ username: username });
    if (!user) {
        res.render('login', { error: 'Nie znaleziono użytkownika', redirectURL: redirectURL });
        return;
    }

    if (!comparePasswords(password, user.password)) {
        res.render('login', { error: 'Błędne hasło' , redirectURL: redirectURL });
        return;
    }

    req.session.account = {
        type: user.type,
        username: username,
        email: user.email,
        userID: user._id,
        check: user.check,
        seller: user.seller,
    }

    req.session.cart = await checkCart(req.session.cart);
    
    res.redirect(redirectURL);
});


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
        password: hashPassword(password),
        email: email,
    });

    await newUser.save();

    res.redirect('/login');
});


module.exports = router;
