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
    if (isNaN(parsedID)){
        return res.status(400).send({ error: 'ID must be a number' });
        // TODO - add error handling    
    }
    const product = products.find(product => product.id === parsedID);

    if (!product) {
        return res.status(404).send({ error: `Product ${parsedID} not found` });
    }
    
    const productName = product.courseName + ', Task ' + product.taskList + ', Exercise ' + product.taskExercise;
    res.render('productView', { productName, product });
});



module.exports = router;