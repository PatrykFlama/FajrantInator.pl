const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
var mysql = require('mysql')

mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_FajrantInator"
})

const app = express();
const PORT = 3000; 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    // use qs library
app.use(cookieParser());
app.use(session({
    secret: "ornotsecret",
    resave: false,
    saveUninitialized: false,
}));
app.use((req, res, next) => {
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
app.use('/cart',    require('./routes/cart'));  // TODO
app.use('/login',   require('./routes/login'));

app.get('/', (req, res) => {
    const { account } = req.session;
    const accountType = account.type;

    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        pasword:"",
        database:"db_FajrantInator"
    })

    con.query("SELECT * FROM products",(err, result)=>{
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('index',{accountType, result:result});
    })

    //res.render('index', { accountType });
});

app.get('/logout', (req, res) => {
    if(req.session.account.type !== 'guest') {
        req.session.account = {
            type: 'guest'
        }
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
