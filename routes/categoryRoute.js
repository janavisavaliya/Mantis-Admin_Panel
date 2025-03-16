const express = require('express');

const routes = express.Router();

const { addCategoryPage, viewCategoryPage, insertCategory, changeStatus, deleteCategory, editCategory, updateCategory } = require('../controller/CategoryController');

routes.get('/', viewCategoryPage)
routes.get('/addcategorypage', addCategoryPage)
routes.post('/insertcategory', insertCategory)
routes.get('/deletecategory', deleteCategory)
routes.get('/editcategory', editCategory)
routes.post('/updatecategory', updateCategory)

routes.get('/changestatus', changeStatus);



module.exports = routes;