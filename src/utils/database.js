const Products = require('../database/schemas/Products');
const fs = require('fs');

async function deleteProduct(productID) {
    try {
        const product = await Products.findOne({ _id: productID });
        if (product === null) {     // product not found
            return 1;
        }

        const path = __dirname + '/../database/uploads';
        if (product.thumbnailFileName !== "") {
            fs.unlinkSync(`${path}/images/${product.thumbnailFileName}`);
        }
        if (product.solutionFileName !== "") {
            fs.unlinkSync(`${path}/files/${product.solutionFileName}`);
        }
    
        await Products.deleteOne({ _id: productID });
    } catch (error) {
        console.error(error);
        return 1;
    }
}

module.exports = { deleteProduct };