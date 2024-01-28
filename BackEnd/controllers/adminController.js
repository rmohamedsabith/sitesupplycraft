const asyncHandler=require('express-async-handler')
const { User} = require('../models/userModel')
const product = require('../models/productModel')

//get total of Advertisments and jobseekers and product owners and customers  -> /totals
const getTotals=asyncHandler(async(req,res)=>{
    
    res.status(200).json(
      {
        productOwnerCount:await User.countDocuments({status:'verified',isvalidEmail:true,role:'Product Owner'}),
        cutomerCount:await User.countDocuments({isvalidEmail:true,role:'Customer'}),
        adsCount:(await product.countDocuments()),
        jobSeekerCount:(await User.countDocuments({isvalidEmail:true,role:'Job Seeker'}))
      })
})


module.exports={getTotals}