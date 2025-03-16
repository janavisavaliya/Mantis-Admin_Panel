const mongoose = require('mongoose');

const ExsubcategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    exsubcategory: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }
})

const exsubcategory = mongoose.model('exsubcategory', ExsubcategorySchema);
module.exports = exsubcategory;