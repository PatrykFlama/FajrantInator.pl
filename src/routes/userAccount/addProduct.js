const { Router } = require('express');
const router = Router();
const Products = require('../../database/schemas/Products');
const Users = require('../../database/schemas/Users');
const { upload } = require('../../utils/multer');

router.get('/', (req, res) => {
    res.render('userAccount/addProduct', { error: null, success: null, accountType: req.session.account.type });
});

router.post('/', async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                if (err == 'Error: Only images are allowed') {
                    res.render('userAccount/addProduct', { error: "Only images are allowed (.jpg .jpeg .png .gif)", success: null, accountType: req.session.account.type });
                } else if (err == 'Error: Only files are allowed') {
                    res.render('userAccount/addProduct', { error: "Only files are allowed", success: null, accountType: req.session.account.type });
                } else {
                    console.error(err);
                    res.render('userAccount/addProduct', { error: "Internal server error", success: null, accountType: req.session.account.type });
                }
                return;
            }

            const thumbnailFileName = req.files.thumbnailFile ? req.files.thumbnailFile[0].filename : "";
            const solutionFileName = req.files.solutionFile ? req.files.solutionFile[0].filename : "";
            const product = new Products({  
                name: req.body.name, 
                description: req.body.description,
                price: req.body.price, 
                courseName: req.body.course,
                listNumber: req.body.listNumber,
                taskNumber: req.body.taskNumber,
                description: req.body.description,
                thumbnailFileName,
                solutionFileName,
                solutionCode: req.body.solutionCode,
                author: req.session.account.username,
            });
            await product.save();
            
            const user = await Users.findOne({ username: req.session.account.username });
            user.addedProducts.push(product._id);
            await user.save();
            
            res.render('userAccount/addProduct', { error: null, success: "Pomyślnie dodano produkt.", accountType: req.session.account.type });
        });
    } catch (error) {
        console.error(error);
        res.render('userAccount/addProduct', { error: "Wewnętrzny błąd serwera.", success: null, accountType: req.session.account.type });
    }
});

module.exports = router;
