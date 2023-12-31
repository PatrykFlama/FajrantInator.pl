const { Router } = require('express');
const router = Router();
const { hashPassword } = require('../utils/helpers');
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
    res.render('admin/adminPanel', { messageUser: null, messageProduct: null });
});

router.get('/displayUsers', async (req, res) => {
    const users = await Users.find({ type: 'user' });
    res.render('admin/displayUsers', { users });
});

router.post('/addProduct', async (req, res) => {
    try {
        const { name, description, price, image, courseName, listNumber, taskNumber, solutionDescription } = req.body;
        const product = new Products({
            name,
            description,
            price,
            image,
            courseName,
            listNumber,
            taskNumber,
            solutionDescription,
        });
        await product.save();
        res.render('admin/adminPanel', { messageProduct: 'Product added successfully', messageUser: null });
    } catch (error) {
        res.render('admin/adminPanel', { messageProduct: 'Failed to add product', messageUser: null });
    }
});

router.post('/removeProduct', async (req, res) => {
    try {
        const { id } = req.body;
        await Products.findByIdAndDelete(id);
    } catch (error) {}

    res.redirect('listing');
});

router.post('/addUser', async (req, res) => {
    try {
        const { username, password, email, type } = req.body;
        const user = new Users({
            username,
            password: hashPassword(password),
            email,
            type
        });
        await user.save();
        res.render('admin/adminPanel', { messageUser: 'User added successfully', messageProduct: null });
    } catch (error) {
        res.render('admin/adminPanel', { messageUser: 'Failed to add user', messageProduct: null });
    }
});

router.post('/removeUser', async (req, res) => {
    try {
        const { id } = req.body;
        await Users.findByIdAndDelete(id);
    } catch (error) {}

    res.redirect('/admin/displayUsers')
});

module.exports = router;
