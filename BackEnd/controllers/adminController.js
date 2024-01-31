const asyncHandler=require('express-async-handler')
const { User, JobSeeker, ProductOwner} = require('../models/userModel')
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

//get  count according to month /admin/counts
const getTotals_per_month=asyncHandler(async(req,res)=>{
  try {
      const products=await product.find().exec()
      const jobseekers=await JobSeeker.find({isvalidEmail:true}).exec()
      const productOwners=await ProductOwner.find({status:'verified',isvalidEmail:true}).exec()
      const customers=await User.find({status:'verified',isvalidEmail:true}).exec()

  let data={
    "productOwners":{
      "January": 0,
      "February": 0,
      "March": 0,
      "April": 0,
      "May": 0,
      "June": 0,
      "July": 0,
      "August": 0,
      "September": 0,
      "October": 0,
      "November": 0,
      "December": 0
    },
    "products":{
      "January": 0,
      "February": 0,
      "March": 0,
      "April": 0,
      "May": 0,
      "June": 0,
      "July": 0,
      "August": 0,
      "September": 0,
      "October": 0,
      "November": 0,
      "December": 0
    },
    "jobseekers":{
      "January": 0,
      "February": 0,
      "March": 0,
      "April": 0,
      "May": 0,
      "June": 0,
      "July": 0,
      "August": 0,
      "September": 0,
      "October": 0,
      "November": 0,
      "December": 0
    },
    "customers":{
      "January": 0,
      "February": 0,
      "March": 0,
      "April": 0,
      "May": 0,
      "June": 0,
      "July": 0,
      "August": 0,
      "September": 0,
      "October": 0,
      "November": 0,
      "December": 0
    }
  }
  products.map((item)=>{
      switch(item.createdAt.getMonth())
      {
          case 0:{
              data.products['January']++;
              break;
          }
          case 1:{
              data.products['February']++;
              break;
          }
          case 2:{
              data.products['March']++;
              break;
          }
          case 3:{
              data.products['April']++;
              break;
          }
          case 4:{
              data.products['May']++;
              break;
          }
          case 5:{
              data.products['June']++;
              break;
          }
          case 6:{
              data.products['July']++;
              break;
          }
          case 7:{
              data.products['August']++;
              break;
          }
          case 8:{
              data.products['September']++;
              break;
          }
          case 9:{
              data.products['October']++;
              break;
          }
          case 10:{
              data.products['November']++;
              break;
          }
          case 11:{
              data.products['December']++;
              break;
          }
      }
      
  })
  productOwners.map((item)=>{
      switch(item.createdAt.getMonth())
      {
          case 0:{
              data.productOwners['January']++;
              break;
          }
          case 1:{
              data.productOwners['February']++;
              break;
          }
          case 2:{
              data.productOwners['March']++;
              break;
          }
          case 3:{
              data.productOwners['April']++;
              break;
          }
          case 4:{
              data.productOwners['May']++;
              break;
          }
          case 5:{
              data.productOwners['June']++;
              break;
          }
          case 6:{
              data.productOwners['July']++;
              break;
          }
          case 7:{
              data.productOwners['August']++;
              break;
          }
          case 8:{
              data.productOwners['September']++;
              break;
          }
          case 9:{
              data.productOwners['October']++;
              break;
          }
          case 10:{
              data.productOwners['November']++;
              break;
          }
          case 11:{
              data.productOwners['December']++;
              break;
          }
      }
      
  })
  jobseekers.map((item)=>{
      switch(item.createdAt.getMonth())
      {
          case 0:{
              data.jobseekers['January']++;
              break;
          }
          case 1:{
              data.jobseekers['February']++;
              break;
          }
          case 2:{
              data.jobseekers['March']++;
              break;
          }
          case 3:{
              data.jobseekers['April']++;
              break;
          }
          case 4:{
              data.jobseekers['May']++;
              break;
          }
          case 5:{
              data.jobseekers['June']++;
              break;
          }
          case 6:{
              data.jobseekers['July']++;
              break;
          }
          case 7:{
              data.jobseekers['August']++;
              break;
          }
          case 8:{
              data.jobseekers['September']++;
              break;
          }
          case 9:{
              data.jobseekers['October']++;
              break;
          }
          case 10:{
              data.jobseekers['November']++;
              break;
          }
          case 11:{
              data.jobseekers['December']++;
              break;
          }
      }
      
  })
  customers.map((item)=>{
      switch(item.createdAt.getMonth())
      {
          case 0:{
              data.customers['January']++;
              break;
          }
          case 1:{
              data.customers['February']++;
              break;
          }
          case 2:{
              data.customers['March']++;
              break;
          }
          case 3:{
              data.customers['April']++;
              break;
          }
          case 4:{
              data.customers['May']++;
              break;
          }
          case 5:{
              data.customers['June']++;
              break;
          }
          case 6:{
              data.customers['July']++;
              break;
          }
          case 7:{
              data.customers['August']++;
              break;
          }
          case 8:{
              data.customers['September']++;
              break;
          }
          case 9:{
              data.customers['October']++;
              break;
          }
          case 10:{
              data.customers['November']++;
              break;
          }
          case 11:{
              data.customers['December']++;
              break;
          }
      }
      
  })

  return res.status(200).json({
      success:true,
      data

  })
  } catch (error) {
      return res.status(409).json({
          success:false,
          error:error.message
  
      })
  }
  

})



module.exports={
  getTotals,
  getTotals_per_month
}