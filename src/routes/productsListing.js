const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');

function filterProductByString(product, searchString) {
    return product.courseName.toLowerCase().includes(searchString.toLowerCase()) ||
          (searchString.toLowerCase().includes('task') && searchString.includes(toString(product.taskList))) ||
          (searchString.toLowerCase().includes('exercise') && searchString.includes(toString(product.taskExercise))) ||
          (searchString.toLowerCase().includes('price') && searchString.includes(toString(product.price)));
}


router.get('/', async (req, res) => {
    const { taskList, taskExercise, courseName, orderPrice, searchString } = req.query;
    
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

    res.render('productsListing', { products: filteredProducts });
});

router.get('/product/:id', (req, res) => {
    res.redirect(`/product/${req.params.id}`);
});


module.exports = router;
