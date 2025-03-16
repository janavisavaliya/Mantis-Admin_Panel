const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true // Check if this field is required
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true // Check if this field is required
    },
    exsubcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exsubcategory',
        required: true // Check if this field is required
    },
    product: {
        type: String,
        required: true // Check if product name is required
    },
    productImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active' // Ensure this is correct
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
