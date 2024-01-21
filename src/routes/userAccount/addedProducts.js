const { Router } = require('express');
const router = Router();
const multer = require('multer')
const Products = require('../../database/schemas/Products');
const Users = require('../../database/schemas/Users');
const fs = require('fs');

router.get('/', async (req, res) => {
    const user = await Users.findOne({ username: req.session.account.username });
    const productIDs = user.addedProducts;
    const products = await Products.find({ _id: { $in: productIDs } });

    res.render('userAccount/addedProducts', { products: products, accountType: req.session.account.type });
});

router.post('/deleteProduct', async (req, res) => {
    try {
        const { productID } = req.body;
        const user = await Users.findOne({ username: req.session.account.username });

        const index = user.addedProducts.indexOf(productID);
        if (index === -1) {     // product not found in user's addedProducts
            return res.sendStatus(400);
        }

        const { deleteProduct } = require('../../utils/database');

        const status = await deleteProduct(productID);
        if (status) { 
            return res.sendStatus(400);
        }

        user.addedProducts.splice(index, 1);
        await user.save();

        res.redirect('/account/addedProducts');
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
