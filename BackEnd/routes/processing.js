const express =require('express')
const {verifyProductOwner, cancelleingReq} = require('../controllers/processingController')
const { isAuthenticatedUser, authorizedUser } = require('../middleware/authenticate')
const router=express.Router()

router.route('/processing/:id/cancel').put(isAuthenticatedUser,authorizedUser('Admin'),cancelleingReq)
router.route('/processing/:id/verify').put(isAuthenticatedUser,authorizedUser('Admin'),verifyProductOwner)


module.exports=router