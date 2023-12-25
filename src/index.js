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
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: "ornotsecret",
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
app.use('/cart',    require('./routes/cart'));  // TODO
app.use('/login',   require('./routes/login'));
app.use('/admin',   require('./routes/adminPanel'));  // TODO

function isProductInCart(cart,id){
    for(let i=0; i<cart.length; i++){
        if(cart[i].id == id){
            return true;
        }
    }
    return false;
}

function calculateTotal(cart,req){
    total = 0;
    for(let i=0; i<cart.length; i++){
        total = total + (cart[i].price);
    }
    req.session.total = total;
    return total;
}

app.get('/', (req, res) => {
    const { account } = req.session; 
    const accountType = account.type;

    res.render('index', { accountType });
});

app.get('/logout', (req, res) => {
    if(req.session.account.type !== 'guest') {
        req.session.account = {
            type: 'guest'
        }
    }
    res.redirect('/');
});

app.post('/add_to_cart',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const tasklist = req.body.tasklist;
    const taskexercise = req.body.taskexercise;
    const price = req.body.price;
    const product = {id:id, name:name, tasklist:tasklist, taskexercise:taskexercise, description:description, price:price}
    
    if(req.session.cart){
        const cart = req.session.cart;
        if(!isProductInCart(cart, id)){
            cart.push(product);
        }
    }
    else{
        req.session.cart = [product];
    }

    calculateTotal(req.session.cart,req);

    res.redirect('/cart');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
