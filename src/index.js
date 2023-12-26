const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('./database');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    // use qs library
app.use(cookieParser());
app.use(session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
}));
app.use((req, res, next) => {       // TODO integrate with database
    if (!req.session.account) {     // if there is no session, create new one with guest account
        req.session.account = {
            type: 'guest'
        }
    }
    if (!req.session.cart) {        // if there is no cart, create new one
        req.session.cart = [];
    }

    next();
})

app.use('/listing', require('./routes/productsListing'));
app.use('/product', require('./routes/productView'));
app.use('/cart',    require('./routes/cart'));
app.use('/login',   require('./routes/login'));
app.use('/admin',   require('./routes/adminPanel'));  // TODO

app.get('/', (req, res) => {
    const { account } = req.session; 
    const accountType = account.type;
    const { username, email } = account;

    res.render('index', { accountType, username, email });
});

app.get('/logout', (req, res) => {
    if(req.session.account.type !== 'guest') {
        req.session.account = {
            type: 'guest'
        }
    }
    res.redirect('/');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
