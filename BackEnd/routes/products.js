const express =require('express')
const { getAll, createProduct, updateProduct, deleteProduct, getOne, addReview, getAllReviews, deleteReview, getUserproducts, getSell, getRent, deleteUserAllProducts, changeStatus, getTotal_per_month,checkDuplicate } = require('../controllers/productController')
const router=express.Router()
const {isAuthenticatedUser,authorizedUser}=require('../middleware/authenticate')

const multer=require('multer')
const path=require('path')

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads/products'));
      },
      filename: function (req, file, cb) {
        const dateSuffix = Date.now(); // Get current timestamp
        const originalName = file.originalname; // Get the original name of the file
        const newName = `${dateSuffix}-${originalName.replace(/\s/g, '_')}`; // Combine timestamp and original name
        cb(null, newName);
      },
    }),
  }); 

router.route('/products').get(getAll)
router.route('/products/sell').get(getSell)
router.route('/products/rent').get(getRent)
router.route('/Myproducts').get(isAuthenticatedUser,authorizedUser("Product Owner"),getUserproducts)
router.route('/Myproducts/count').get(isAuthenticatedUser,authorizedUser("Product Owner"),getTotal_per_month)
router.route('/product/:id/changeStatus').put(isAuthenticatedUser,authorizedUser("Product Owner"),changeStatus)
router.route('/product/:id/delete').delete(isAuthenticatedUser,authorizedUser("Product Owner"),deleteProduct)
router.route('/product/:id/edit').put(isAuthenticatedUser,authorizedUser("Product Owner"),upload.array('images'),updateProduct)
router.route('/product/:id').get(isAuthenticatedUser,getOne)
router.route('/product/:id/addreview').put(isAuthenticatedUser,addReview)
router.route('/product/:id/reviews').get(getAllReviews)

//wants to do
router.route('/product/new').post(isAuthenticatedUser,authorizedUser("Product Owner"),upload.array('images'),createProduct)
router.route('/products/check').post(isAuthenticatedUser,authorizedUser("Product Owner"),checkDuplicate)
router.route('/products/deleteAll').delete(isAuthenticatedUser,authorizedUser("Product Owner"),deleteUserAllProducts)
router.route('/product/:id/deletereview').delete(isAuthenticatedUser,deleteReview)

module.exports=router