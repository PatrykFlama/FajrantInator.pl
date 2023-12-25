const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');

/* //TODO
* check if user already bought this product
* POST allow for buying product
* POST allow for rating product
*/

router.get('/:productID', async (req, res) => {
    // const product = await Products.findOne({ $and: [{ courseName: req.params.courseName }, 
    //                                                 { taskList: req.params.listNumber }, 
    //                                                 { taskExercise: req.params.taskNumber }] });
    const product = await Products.findOne({ _id: req.params.productID });
    
    if (!product) {     // error: 'Product not found'
        res.render('productView', { productName: `Product with id ${parsedID} not found`, productPrice: null, productDescription: null })
        return;
    }
    
    const productName = product.courseName + ', Task ' + product.taskList + ', Exercise ' + product.taskExercise;
    res.render('productView', { productName, productPrice:product.price, productDescription:product.description });
});


module.exports = router;
