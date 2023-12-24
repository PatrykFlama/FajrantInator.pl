const { Router } = require('express');
const router = Router();

const { products } = require('../data/TEMPdatabase.json');

/* //TODO
* check if user already bought this product
* POST allow for buying product
* POST allow for rating product
*/

router.get('/:productID', (req, res) => {
    const parsedID = parseInt(req.params.productID);
    if (isNaN(parsedID)){  // error: 'ID must be a number' 
        res.render('productView', { productName: `Product ${req.params.productID} not found`, productPrice: null, productDescription: null })
        return;
    }
    const product = products.find(product => product.id === parsedID);
    
    if (!product) {     // error: 'Product not found'
        res.render('productView', { productName: `Product with id ${parsedID} not found`, productPrice: null, productDescription: null })
        return;
    }
    
    const productName = product.courseName + ', Task ' + product.taskList + ', Exercise ' + product.taskExercise;
    res.render('productView', { productName, productPrice:product.price, productDescription:product.description });
});


module.exports = router;
