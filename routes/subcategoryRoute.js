const express = require('express');

const routes = express.Router();

const { addsubCategorypage, viewsubCategorypage, insertSubcategory, editSubcategory, changeStatus, deleteSubcategory } = require('../controller/SubcategoryController');

routes.get('/', viewsubCategorypage)
routes.get('/addsubcategorypage', addsubCategorypage);
routes.post('/insertsubcategory', insertSubcategory);
routes.get('/deletesubcategory', deleteSubcategory)

routes.get('/editsubcategory', editSubcategory);
routes.get('/changestatus', changeStatus);



module.exports = routes;