const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const ExSubcategoryModel = require('../models/ExsubcategoryModel');
const ProductModel = require('../models/ProductModel');
const fs = require('fs');


// const viewproduct = async (req, res) => {
//     try {
//         let product = await ProductModel.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');
//         return res.render('product/viewproduct', {
//             product: product
//         })
//     } catch (err) {
//         console.log(err);
//         return false
//     }
// }
const viewproduct = async (req, res) => {
    try {
        let product = await ProductModel
            .find({})
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('exsubcategoryId');

        return res.render('product/viewproduct', {
            product: product
        });
    } catch (err) {
        console.log("Error in viewproduct:", err);
        return false;
    }
};



const addProduct = async (req, res) => {
    try {
        let categories = await CategoryModel.find({ status: 'active' })
        let subcategories = await SubcategoryModel.find({ status: 'active' });
        let exsubcategories = await ExSubcategoryModel.find({ status: 'active' })
        return res.render('product/addproduct', {
            category: categories,
            subcategory: subcategories,
            exsubcategory: exsubcategories
        })
    } catch (err) {
        console.log(err);
        return false
    }
}

const ajaxSubcategory = async (req, res) => {
    let subcategoryid = req.query.subcategoryid;
    try {
        let exsubcategory = await ExSubcategoryModel.find({ subcategoryId: subcategoryid }).populate('categoryId').populate('subcategoryId');
        return res.status(200).send({
            success: true,
            message: "record successfully fetch",
            exsubcategory: exsubcategory,
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

// const insertProduct = async (req, res) => {
//     try {
//         const { editid, category, subcategory, exsubcategory, product } = req.body;
//         if (editid) {
//             await ProductModel.findByIdAndUpdate(editid, {
//                 categoryId: category,
//                 subcategoryId: subcategory,
//                 exsubcategory: exsubcategory,
//                 product: product
//             })
//             req.flash('success', 'Exsubcategory successfully update');
//             return res.redirect('/product')
//         } else {
//             await ProductModel.create({
//                 categoryId: category,
//                 subcategoryId: subcategory,
//                 exsubcategory: exsubcategory,
//                 product: product
//             })
//             req.flash('success', 'Exsubcategory successfully create');
//             return res.redirect('/product')
//         }
//     } catch (err) {
//         console.log(err);
//         return false;
//     }
// }
const insertProduct = async (req, res) => {

    try {
        const { category, subcategory, exsubcategory, product } = req.body;

        await ProductModel.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategoryId: exsubcategory,
            product: product,
            productImage: req.file?.path
        });

        req.flash('success', 'Product successfully added');
        return res.redirect('/product'); // Redirect to product listing after success
    } catch (err) {
        console.log("Error inserting product:", err);
        req.flash('error', 'There was an error adding the product');
        return res.redirect('/product/addproduct');
    }
};



const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        if (status == "deactive") {
            await ProductModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash('success', "Subcategory update")
            return res.redirect('/product')
        } else {
            await ProductModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash("success", "Subcategory Update")
            return res.redirect('/product')
        }
    } catch (err) {
        console.log(err);
        return false
    }
}

const deleteProduct = async (req, res) => {
    try {
        let id = req.query?.id;
        await ProductModel.findByIdAndDelete(id);
        req.flash('success', 'subcategory successfully delete')
        return res.redirect('/product');

    } catch (err) {
        console.log(err);
        return false;

    }
}


const editProduct = async (req, res) => {
    try {
        let id = req.query?.id
        let category = await CategoryModel.find({ status: 'active' })
        let subcategory = await SubcategoryModel.find({ status: 'active' })
        let exsubcategory = await ExSubcategoryModel.find({ status: 'active' })
        let single = await ProductModel.findById(id).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');
        return res.render('product/editproduct', {
            category: category,
            subcategory: subcategory,
            exsubcategory: exsubcategory,
            single
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateProduct = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory, product } = req.body;
        console.log(req.file);

        if (!editid) {
            req.flash('error', 'Product ID is missing.');
            return res.redirect('/product');
        }
        let productData = await ProductModel.findById(editid);

        if (!req.file) {
            await ProductModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                product: product
            });
        } else {
            fs.unlinkSync(productData?.productImage);
            await ProductModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                product: product,
                productImage: req.file?.path
            });
        }

        req.flash('success', 'Product successfully updated');
        return res.redirect('/product');
    } catch (err) {
        console.log("Error updating product:", err);
        req.flash('error', 'Error updating product');
        return res.redirect('/product');
    }
};


module.exports = {
    viewproduct,
    addProduct,
    ajaxSubcategory,
    insertProduct,
    changeStatus,
    deleteProduct,
    editProduct,
    updateProduct
}