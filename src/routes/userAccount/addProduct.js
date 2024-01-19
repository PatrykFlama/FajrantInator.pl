const { Router } = require('express');
const router = Router();
const Products = require('../../database/schemas/Products');
const Users = require('../../database/schemas/Users');
const { images_upload } = require('../../utils/multer');

router.get('/', (req, res) => {
    res.render('userAccount/addProduct', { error: null, success: null });
});

router.post('/', async (req, res) => {
    try {
        // Save the product fields and uploaded file path to the database
        images_upload.single('file')(req, res, async (err) => {
            if (err) {
                if (err == 'Error: Only images are allowed'){
                    res.render('userAccount/addProduct', { error: "Only images are allowed (.jpg .jpeg .png .gif)", success: null });
                } else {
                    console.error(err);
                    res.render('userAccount/addProduct', { error: "Internal server error", success: null });
                }
                return;
            }
            
            const image_filename = (req.file) ? req.file.filename : "";
            const product = new Products({  
                name: req.body.name, 
                description: req.body.description,
                price: req.body.price, 
                courseName: req.body.course,
                listNumber: req.body.listNumber,
                taskNumber: req.body.taskNumber,
                description: req.body.description,
                imageFileName: image_filename,
                solutionCode: req.body.solutionCode,
                author: req.session.account.username,
            });
            await product.save();
            
            const user = await Users.findOne({ username: req.session.account.username });
            user.addedProducts.push(product._id);
            await user.save();
            
            res.render('userAccount/addProduct', { error: null, success: "Product added successfully" });
        });
    } catch (error) {
        console.error(error);
        res.render('userAccount/addProduct', { error: "Internal server error", success: null });
    }
});

module.exports = router;
