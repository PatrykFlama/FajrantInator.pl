const express = require('express');
const cookieParser = require('cookie-parser');

const homeRoute = require('./routes/home');
const productViewRoute = require('./routes/productView');

const app = express();
const PORT = 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    // use qs library
app.use(cookieParser());

app.use('/home', homeRoute);
app.use('/product', productViewRoute);

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
