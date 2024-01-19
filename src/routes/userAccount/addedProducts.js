const { Router } = require('express');
const router = Router();
const multer = require('multer')
const Products = require('../../database/schemas/Products');
const Users = require('../../database/schemas/Users');

router.get('/', async (req, res) => {
    const user = await Users.findOne({ username: req.session.account.username });
    const productIDs = user.addedProducts;
    const products = await Products.find({ _id: { $in: productIDs } });

    res.render('userAccount/addedProducts', { products: products, accountType: req.session.account.type });
});

router.post('/deleteProduct', async (req, res) => {
    const { productID } = req.body;
    const user = await Users.findOne({ username: req.session.account.username });
    const index = user.addedProducts.indexOf(productID);

    if (index === -1) {     // product not found in user's addedProducts
        return res.sendStatus(400);
    }

    await Products.deleteOne({ _id: productID });

    user.addedProducts.splice(index, 1);
    await user.save();

    
    // const product = await Products.findOne({ _id: productID });
    // product.remove();
    
    // user.addedProducts.splice(index, 1);
    // await user.save();

    res.redirect('/account/addedProducts');
});

module.exports = router;
