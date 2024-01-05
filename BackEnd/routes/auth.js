const express =require('express')
const { 
    register,
    login, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getProfile, 
    changePassword,
    updateMyprofile,
    deleteMyprofile
    } = require('../controllers/authController')
const { isAuthenticatedUser } = require('../middleware/authenticate')
const router=express.Router()
const multer=require('multer')
const path=require('path')

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads/users'));
      },
      filename: function (req, file, cb) {
        const dateSuffix = Date.now(); // Get current timestamp
        const originalName = file.originalname; // Get the original name of the file
        const newName = `${dateSuffix}-${originalName}`; // Combine timestamp and original name
        cb(null, newName);
      },
    }),
  });

router.route('/Registration').post(upload.fields([{name:'profile'},{name:'certificate'},{name:'currentBill'}]),register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/myprofile').get(isAuthenticatedUser,getProfile)
router.route('/myprofile/changepassword').put(isAuthenticatedUser,changePassword)
router.route('/myprofile/edit').put(isAuthenticatedUser,upload.fields([{name:'profile'},{name:'certificate'},{name:'currentBill'}]),updateMyprofile)
router.route('/myprofile/delete').delete(isAuthenticatedUser,deleteMyprofile)


module.exports=router