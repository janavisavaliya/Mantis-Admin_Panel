const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/SubcategoryModel');
const ExSubcategoryModel = require('../models/ExsubcategoryModel');

const viewExsubcategorypage = async (req, res) => {
    try {
        let exsubcategory = await ExSubcategoryModel.find({}).populate('categoryId').populate('subcategoryId');
        return res.render('exsubcategory/view_ex_subcategory', {
            exsubcategory: exsubcategory
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addexsubcategorypage = async (req, res) => {
    try {
        let categories = await CategoryModel.find({ status: 'active' });
        let subcategories = await SubcategoryModel.find({ status: 'active' });
        return res.render('exsubcategory/add_ex_subcategory', {
            category: categories,
            subcategory: subcategories
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const ajaxCategorywiseRecord = async (req, res) => {
    let categoryid = req.query.categoryid;
    try {
        let subcategory = await SubcategoryModel.find({ categoryId: categoryid }).populate('categoryId');
        return res.status(200).send({
            success: true,
            message: "record successfully fetch",
            subcategory: subcategory,

        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const insertExsubcategory = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory } = req.body;
        if (editid) {
            await ExSubcategoryModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategory: exsubcategory
            })
            req.flash('success', 'Exsubcategory successfully update');
            return res.redirect('/exsubcategory')
        } else {
            await ExSubcategoryModel.create({
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategory: exsubcategory
            })
            req.flash('success', 'Exsubcategory successfully create');
            return res.redirect('/exsubcategory/addexsubcategorypage')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteExsubategory = async (req, res) => {
    try {
        let id = req.query?.id;

        // Delete only from ExSubcategoryModel
        await ExSubcategoryModel.findByIdAndDelete(id);

        req.flash('success', 'Exsubcategory successfully deleted');
        return res.redirect('/exsubcategory');
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error deleting Exsubcategory");
    }
};

const editExsubcategory = async (req, res) => {
    try {
        let id = req.query?.id
        let category = await CategoryModel.find({ status: 'active' })
        let subcategory = await SubcategoryModel.find({ status: 'active' })
        let single = await ExSubcategoryModel.findById(id).populate('categoryId').populate('subcategoryId');

        return res.render('exsubcategory/edit_ex_subcategory', {
            category: category,
            subcategory: subcategory,
            single
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;

        // Validate ID exists
        const exsubcategory = await ExSubcategoryModel.findById(id);
        if (!exsubcategory) {
            req.flash("error", "Exsubcategory not found");
            return res.redirect('/exsubcategory');
        }

        // Update status
        await ExSubcategoryModel.findByIdAndUpdate(id, { status });

        req.flash("success", "Exsubcategory status successfully updated");
        return res.redirect('/exsubcategory');
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error updating Exsubcategory status");
    }
};

module.exports = {
    addexsubcategorypage, ajaxCategorywiseRecord, insertExsubcategory, viewExsubcategorypage, editExsubcategory, deleteExsubategory, changeStatus
}