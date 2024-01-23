const express =require('express')
const { isAuthenticatedUser } = require('../middleware/authenticate')
const { getLaborers, addReview, getAllReviews, deleteReview, getLaborer } = require('../controllers/laborersController')
const router=express.Router()

router.route('/laborers').get(getLaborers)
router.route('/laborer/:id').get(getLaborer)
router.route('/laborer/:id/addreview').put(isAuthenticatedUser,addReview)
router.route('/laborer/:id/reviews').get(getAllReviews)
router.route('/laborer/:id/deletereview').delete(isAuthenticatedUser,deleteReview)

module.exports=router