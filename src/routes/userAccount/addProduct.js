const { Router } = require('express');
const router = Router();
const multer = require('multer')
const Products = require('../../database/schemas/Products');
const Users = require('../../database/schemas/Users');
const upload = multer({ dest: __dirname+'../../../database/uploads' });       // TODO: declare multer globally or smth

router.get('/', (req, res) => {
    res.render('userAccount/addProduct', { error: null, success: null });
});

router.post('/', upload.single('file'), async (req, res) => {
    try {
        // Save the product fields and uploaded file path to the database
        const filename = (req.file) ? req.file.path : "";
        const product = new Products({  
            name: req.body.name, 
            description: req.body.description,
            price: req.body.price, 
            courseName: req.body.course,
            listNumber: req.body.listNumber,
            taskNumber: req.body.taskNumber,
            description: req.body.description,
            solutionFileName: filename,
            solutionCode: req.body.code,
            author: req.session.account.username,
        });
        await product.save();

        const user = await Users.findOne({ username: req.session.account.username });
        user.addedProducts.push(product._id);
        await user.save();

        res.render('userAccount/addProduct', { error: null, success: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.render('userAccount/addProduct', { error: "Internal server error", success: null });
    }
});

module.exports = router;
