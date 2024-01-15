const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');
const Users = require('../database/schemas/Users')

router.get('/', async (req, res) => {
    const { taskList, taskExercise, courseName, orderPrice, searchString, owned } = req.query;
    
    const parsedTaskList = parseInt(taskList);
    const parsedTaskExercise = parseInt(taskExercise);

    let query = {};

    if (courseName) {
        query.courseName = courseName;
    }
    if (!isNaN(parsedTaskList)) {
        query.taskList = parsedTaskList;
    }
    if (!isNaN(parsedTaskExercise)) {
        query.taskExercise = parsedTaskExercise;
    }

    let filteredProducts = await Products.find(query);

    if (searchString) {
        filteredProducts = filteredProducts.filter(product => product.description.includes(searchString));
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
        }
    }

    let cart = req.session.cart;

    res.render('productsListing', { products: filteredProducts, user: user, cart: cart });
});

router.get('/product/:id', (req, res) => {
    res.redirect(`/product/${req.params.id}`);
});


module.exports = router;
