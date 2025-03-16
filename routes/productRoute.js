const express = require('express');

const routes = express.Router();

const multer = require('multer');

//file upload start


const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        let uniq = Math.floor(Math.random() * 10000000);
        cb(null, `${file.fieldname}-${uniq}`);
    }
})
const fileUpload = multer({ storage: st }).single('productImage');
//file upload end

const { viewproduct, insertProduct, ajaxSubcategory, changeStatus, deleteProduct, editProduct, addProduct, updateProduct } = require('../controller/productController');

routes.get('/', viewproduct)
routes.get('/addproduct', addProduct)
routes.get('/ajaxsubcategorywiserecord', ajaxSubcategory)
routes.post('/insertproduct', fileUpload, insertProduct)
routes.get('/changestatus', changeStatus)
routes.get('/deleteproduct', deleteProduct)
routes.get('/editproduct', editProduct)
routes.post('/updateProduct', fileUpload, updateProduct)

module.exports = routes;