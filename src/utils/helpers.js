const bcrypt = require('bcryptjs');
const Product = require('../database/schemas/Products');
const User = require('../database/schemas/Users');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

function comparePasswords(password, hash) {
    return bcrypt.compareSync(password, hash);
}

async function calculateProductsTotal(cart){
    total = 0;
    for(let i=0; i<cart.length; i++){
        const productPrice = await Product.findById(cart[i]);
        total += productPrice.price;
    }
    return total.toFixed(2);
}

async function checkCart(cart){
    for (let i = 0; i < cart.length; i++) {
        const user = await User.findOne({ owned: cart[i] });
        if (!user) {
            cart.splice(i, 1);
            i--;
        }
    }
    return cart;
}

module.exports = {
    hashPassword,
    comparePasswords,
    calculateProductsTotal,
    checkCart,
};
