const express=require('express')
const { isAuthenticatedUser} = require('../middleware/authenticate')
const { processPayment, sendStripeApi, newPayment, getAllPayments, getOnePayment } = require('../controllers/paymentController')
const router=express.Router()

router.route('/payment/process').post(isAuthenticatedUser,processPayment)
router.route('/payment/stripeApi').get(isAuthenticatedUser,sendStripeApi)
router.route('/payment/new').post(isAuthenticatedUser,newPayment)
router.route('/payments').get(isAuthenticatedUser,getAllPayments)
router.route('/payment/:id').get(isAuthenticatedUser,getOnePayment)


module.exports=router