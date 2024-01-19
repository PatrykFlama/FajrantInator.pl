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
});

router.get('/', (req, res) => {
    res.redirect('/admin/displayUsers');       // deprecated
    return;
    res.render('admin/adminPanel', { messageUser: null, messageProduct: null });
});

router.get('/populateDatabase', async (req, res) => {
    const { populateDatabase } = require('../database/populateDatabase');
    await populateDatabase();
    res.redirect('/');
});

router.get('/displayUsers', async (req, res) => {
    const users = await Users.find();
    let status = {};
    for(let user of users){
        if(user.type === 'admin'){
            status[user.id] = "admin"
        } else if(user.check === false){
            status[user.id] = "niezweryfikowany"
        } else if(user.seller === false){
            status[user.id] = "nieudana weryfikacja"
        } else {
            status[user.id] = "zweryfikowany"
        }
    }
    const me = req.session.account.userID;
    res.render('admin/displayUsers', { users, me, status });
});

router.post('/addProduct', async (req, res) => {
    res.redirect('/admin/displayUsers');        // deprecated
    return;
    try {
        const product = new Products({
            name: req.body.name, 
            description: req.body.description,
            price: req.body.price, 
            courseName: req.body.course,
            listNumber: req.body.listNumber,
            taskNumber: req.body.taskNumber,
            description: req.body.description,
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

router.post('/toggleAccountType', async (req, res) => {
    try {
        const { id } = req.body;
        const user = await Users.findById(id);
        user.type = user.type === 'user' ? 'admin' : 'user';
        await user.save();
    } catch (error) {}

    res.redirect('/admin/displayUsers');
});

router.post('/toggleVerification', async (req, res) => {
    try {
        const { id } = req.body;
        const user = await Users.findById(id);
        if(user.type === 'admin'){
            res.redirect('/admin/displayUsers');
            return;
        }
        if(user.seller === true){
            user.seller = false;
        } else {
            user.seller = true;
            user.check = true;
        }
        await user.save();
    } catch (error) {}

    res.redirect('/admin/displayUsers');
});

module.exports = router;
