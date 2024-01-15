const { Router } = require('express')
const router = Router();
const Products = require('../../database/schemas/Products');
const Users = require('../../database/schemas/Users');

router.post('/', async (req, res) => {
    const { productID } = req.body;
    const parsedID = parseInt(productID);

    if (isNaN(parsedID)) {
        return res.sendStatus(400);
    }

    const product = await Products.findOne({ _id: productID });
    if (!product) {
        return res.sendStatus(400);
    }

    res.render('userAccount/editProduct', { product: product });
});

router.post('/saveProduct', async (req, res) => {
    const { productID, name, description, price, courseName, listNumber, taskNumber, code } = req.body;
    const parsedID = parseInt(productID);
    const parsedPrice = parseInt(price);
    const parsedListNumber = parseInt(listNumber);
    const parsedTaskNumber = parseInt(taskNumber);

    if (isNaN(parsedID) || isNaN(parsedPrice) || isNaN(parsedListNumber) || isNaN(parsedTaskNumber)) {
        return res.sendStatus(400);
    }

    const user = await Users.findOne({ username: req.session.account.username });
    const index = user.addedProducts.indexOf(productID);
    if (index === -1) {     // product not found in user's addedProducts
        return res.sendStatus(400);
    }

    const product = await Products.findOne({ _id: productID });
    if (!product) {
        return res.sendStatus(400);
    }

    product.name = name;
    product.description = description;
    product.price = parsedPrice;
    product.courseName = courseName;
    product.listNumber = parsedListNumber;
    product.taskNumber = parsedTaskNumber;
    product.code = code;

    await product.save();

    res.redirect('/userAccount/addedProducts');
});

module.exports = router;
