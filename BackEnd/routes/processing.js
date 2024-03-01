const express =require('express')
const {verifyProductOwner, cancelleingReq, getProcessing, viewProceesingProduct} = require('../controllers/processingController')
const { isAuthenticatedUser, authorizedUser } = require('../middleware/authenticate')
const router=express.Router()

router.route('/processing').get(isAuthenticatedUser,authorizedUser('Admin'),getProcessing)
router.route('/processing/:id').get(isAuthenticatedUser,authorizedUser('Admin'),viewProceesingProduct)
router.route('/processing/:id/cancel').delete(isAuthenticatedUser,authorizedUser('Admin'),cancelleingReq)
router.route('/processing/:id/verify').put(isAuthenticatedUser,authorizedUser('Admin'),verifyProductOwner)


module.exports=router