const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');
const Users = require('../database/schemas/Users');

router.use((req, res, next) => {
    if (req.session.account.type !== 'admin') {
        res.redirect('/');
    }
    else {
        next();
    }
})

router.get('/', (req, res) => {
    res.render('admin/adminPanel');
});

router.get('/displayUsers', async (req, res) => {
    const users = await Users.find({ type: 'user' });
    res.render('admin/displayUsers', { users });
});

router.post('/addProduct', async (req, res) => {
    try {
        const { name, description, price, image, courseName, listNumber, taskNumber, solution } = req.body;
        const product = new Products({
            name,
            description,
            price,
            image,
            courseName,
            listNumber,
            taskNumber,
            solution
        });
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to add product' });
    }
});

router.post('/addUser', async (req, res) => {
    try {
        const { username, password, email, type } = req.body;
        const user = new Users({
            username,
            password,
            email,
            type
        });
        await user.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add user' });
    }
});

module.exports = router;
