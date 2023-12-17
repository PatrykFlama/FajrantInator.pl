const { Router } = require('express');
const router = Router();

const { products } = require('../data/TEMPdatabase.json');

function filterProductByString(product, searchString) {
    return product.courseName.toLowerCase().includes(searchString.toLowerCase()) ||
          (searchString.toLowerCase().includes('task') && searchString.includes(toString(product.taskList))) ||
          (searchString.toLowerCase().includes('exercise') && searchString.includes(toString(product.taskExercise))) ||
          (searchString.toLowerCase().includes('price') && searchString.includes(toString(product.price)));
}

router.get('/', (req, res) => {
    const { taskList, taskExercise, courseName } = req.query;
    const { orderPrice } = req.query;
    const { searchString } = req.query;
    
    const parsedTaskList = parseInt(taskList);
    const parsedTaskExercise = parseInt(taskExercise);

    let filteredProducts = products;
    
    if (courseName) {
        filteredProducts = filteredProducts.filter(product => product.courseName === courseName);
    }
    if (!isNaN(parsedTaskList)) {
        filteredProducts = filteredProducts.filter(product => product.taskList == parsedTaskList);
    }
    if (!isNaN(parsedTaskExercise)) {
        filteredProducts = filteredProducts.filter(product => product.taskExercise == parsedTaskExercise);
    }

    if (searchString) {
        filteredProducts = filteredProducts.filter(product => product.productDescription.includes(searchString));
    }

    if (orderPrice === 'asc') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (orderPrice === 'desc') {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    res.send(filteredProducts);
});

router.get('/product/:id', (req, res) => {
    res.redirect(`/product/${req.params.id}`);
});


module.exports = router;
