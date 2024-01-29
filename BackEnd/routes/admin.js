const express =require('express')
const { isAuthenticatedUser} = require('../middleware/authenticate')
const { getTotals } = require('../controllers/adminController')
const router=express.Router()

router.route('/totals').get(isAuthenticatedUser,getTotals)



module.exports=router