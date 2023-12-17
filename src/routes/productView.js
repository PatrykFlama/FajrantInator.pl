const { Router } = require('express');
const router = Router();

const { products } = require('../data/TEMPdatabase.json');

router.get('/:id', (req, res) => {
    const parsedID = parseInt(req.params.id);
    if (isNaN(parsedID)){
        return res.status(400).send({ error: 'ID must be a number' });
        // TODO - add error handling    
    }
    else {
        res.send(products.find(product => product.id === parsedID));
    }
});

module.exports = router;