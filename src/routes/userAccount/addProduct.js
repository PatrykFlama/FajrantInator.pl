const { Router } = require('express');
const router = Router();
const multer = require('multer')
// const vm = require('vm');
const Products = require('../../database/schemas/Products');
const upload = multer({ dest: __dirname+'../../../database/uploads' });       // TODO: declare multer globally or smth

router.get('/', (req, res) => {
    res.render('userAccount/addProduct', { error: null });
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
        });
        await product.save();

        // // Create a context for the vm
        // const sandbox = { 
        //     console: { log: (value) => { sandbox.result += value; } }, 
        //     result: [] 
        // };
        // const context = new vm.createContext(sandbox);
        // // Run the code snippet in the vm
        // const script = new vm.Script(code);
        // script.runInContext(context, { timeout: 5000 }); // timeout after 5 seconds
        // output: sandbox.result

        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
