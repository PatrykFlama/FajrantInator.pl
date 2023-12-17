const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const productsListing = require('./routes/productsListing');
const productViewRoute = require('./routes/productView');

const app = express();
const PORT = 3000; 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    // use qs library
app.use(cookieParser());

app.use('/listing', productsListing);
app.use('/product', productViewRoute);

app.get('/', (req, res) => {
    res.render('test');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
