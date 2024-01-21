const { Router } = require('express');
const router = Router();
const Products = require('../database/schemas/Products');
const Users = require('../database/schemas/Users');

router.get('/:productID', async (req, res) => {
    try {
        let cart = req.session.cart;
        let user = req.session.account.type;

        const ObjectId = require('mongoose').Types.ObjectId;
        if (!ObjectId.isValid(req.params.productID)) {     // error: 'Product not found'
            res.render('productView', { error: `Product not found`, cart: cart, user: user})
            return;
        }

        const product = await Products.findOne({ _id: req.params.productID });
        if (!product) {     // error: 'Product not found'
            res.render('productView', { error: `Product not found`, cart: cart, user: user})
            return;
        }

        const ratings = product.ratings.map((rating) => rating.rating);
        const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : null;

        if (req.session.account.type !== 'guest') {
            const user = await Users.findOne({ username: req.session.account.username});
            let ratingObject = product.ratings.filter((ratingObj) => ratingObj.user.equals(user._id))[0];
            let yourRate = -1;
            
            if(ratingObject){
                yourRate = ratingObject.rating;
            }

            if (user.orders.includes(product.id) || req.session.account.type === 'admin') {
                res.render('productView_B', { 
                    product,
                    averageRating, 
                    cart: cart, 
                    user: user,
                    yourRate,
                });
                return;
            }
        }

        res.render('productView', { 
            product,
            averageRating, 
            cart: cart, 
            user: user,
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

router.post('/addToCart', (req,res)=>{
    const productID = req.body.id;
    
    if(req.session.cart){
        const cart = req.session.cart;
        if(!cart.includes(productID)){    
            cart.push(productID);
        }
    }
    else{
        req.session.cart = [productID];
    }

    const productURL = `/product/${productID}`;
    res.redirect(req.get('Referrer'));
});

router.post('/rateProduct', async (req,res)=>{
    console.log('got here') // WITHOUT THIS LINE CODE DOESNT WORK IDK WHY THE HELLss
    try {
        const { productID, rating } = req.body;
        const user = await Users.findOne({ username: req.session.account.username });
        const product = await Products.findOne({ _id: productID });
    
        if (product.ratings.some((ratingObj) => ratingObj.user.equals(user.id))) {
          res.status(400).send('You have already rated this product');
          return;
        }
        
        product.ratings.push({ user: user.id, rating });
        await product.save();
    
        res.redirect(`/product/${productID}`);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/deleteProduct', async (req,res)=>{
    if(req.session.account.type !== 'admin'){
        res.status(403).send('Forbidden');
        return;
    }

    try {
        const { productID } = req.body;
        await Products.deleteOne({ _id: productID });
        res.redirect('/listing');
    } 
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.post('/deleteRating', async (req,res)=>{
    if (req.session.account.type !== 'admin') {
        res.status(403).send('Forbidden');
        return;
    }

    try {
        const { productID, userID } = req.body;
        const product = await Products.findOne({ _id: productID });
        product.ratings.pull({ user: userID });
        await product.save();
        res.redirect(`/product/${productID}`);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

});

router.post('/downloadSolution', async (req, res)=>{
    try {
        const productID = req.body.productID;

        if(!productID || req.session.account.type === 'guest'){
            res.sendStatus(403);
            return;
        }

        res.set({
            'Location': `/product/${productID}`,
        });
    
        const user = await Users.findOne({ username: req.session.account.username });
        
        if(!user.orders.includes(productID)){
            res.sendStatus(403);
            return;
        }

        const product = await Products.findOne({ _id: productID });
        const fileName = product.solutionFileName;
        let fixedFileName = "";

        let i=0;
        while(fileName[i] !== '-' && i<fileName.length) i++;
        i++;
        for(; i<fileName.length-4; i++){
            fixedFileName += fileName[i];
        }

        res.download(`src/database/uploads/files/${fileName}`, fixedFileName);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
