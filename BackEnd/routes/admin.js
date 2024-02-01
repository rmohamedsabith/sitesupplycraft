const express =require('express')
const { isAuthenticatedUser} = require('../middleware/authenticate')
const { getTotals, getTotals_per_month } = require('../controllers/adminController')
const router=express.Router()

router.route('/admin/totals').get(isAuthenticatedUser,getTotals)
router.route('/admin/counts').get(isAuthenticatedUser,getTotals_per_month)



module.exports=router