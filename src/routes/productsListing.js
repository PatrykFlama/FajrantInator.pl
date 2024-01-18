const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');
const Users = require('../database/schemas/Users')

router.get('/', async (req, res) => {
    let products = await Products.find();
    let courseNames = new Set();
    let listNumbers = new Set();
    let taskNumbers = new Set();
    for(let product of products){
        // console.log(product)
        courseNames.add(product.courseName);
        listNumbers.add(product.listNumber);
        taskNumbers.add(product.taskNumber);
    }

    const { listNumber, taskNumber, courseName, orderPrice, searchString, owned } = req.query;
    
    const parsedListNumber = parseInt(listNumber);
    const parsedTaskNumber = parseInt(taskNumber);

    let query = {};

    if (courseName) {
        query.courseName = courseName;
    }
    if (!isNaN(parsedListNumber)) {
        query.listNumber = parsedListNumber;
    }
    if (!isNaN(parsedTaskNumber)) {
        query.taskNumber = parsedTaskNumber;
    }

    let filteredProducts = await Products.find(query);

    // if (searchString) {
    //     filteredProducts = filteredProducts.filter(product => product.description.includes(searchString));
    // }

    // TEST OF REGEX SEARCHING (ignore letter case)
    if (searchString) {
        const regex = new RegExp(searchString, "i");
        filteredProducts = filteredProducts.filter(product => regex.test(product.description));
    }

    if (orderPrice === 'asc') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (orderPrice === 'desc') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    let user = 'guest';
    if(req.session.account.type !== 'guest'){
        user = await Users.findOne({ username: req.session.account.username});
    }

    if(user !== 'guest'){
        filteredProducts = filteredProducts.filter(product => !user.addedProducts.includes(product._id));
        if(owned === 'true'){
            filteredProducts = filteredProducts.filter(product => user.orders.includes(product._id));
        } else if(owned === 'false'){
            filteredProducts = filteredProducts.filter(product => !user.orders.includes(product._id));
        }
    }

    let cart = req.session.cart;
    res.render('productsListing', { products: filteredProducts, user: user, cart: cart, courseNames, taskNumbers, listNumbers });
});

router.get('/product/:id', (req, res) => {
    res.redirect(`/product/${req.params.id}`);
});


module.exports = router;
