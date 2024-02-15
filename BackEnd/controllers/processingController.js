const asyncHandler=require('express-async-handler')
const { User, ProductOwner} = require('../models/userModel')

//Processing status data  -> /procesing
const getProcessing=asyncHandler(async(req,res)=>{
    const data=await ProductOwner.findOne({status:'processing',isvalidEmail:true}).exec()
    if(!data)
    {
        return res.status(400).json({message:"There are no produt owner on processing State"})
    }
    res.status(200).json(
      {
        data,
        count:data.legnth
      })
})
//Delete a data  -> /procesing/:id/delete
const cancelleingReq=asyncHandler(async(req,res)=>{
    const data=await User.findById(req.params.id).exec()
    if(!data)
    {
        return res.status(400).json({message:"There are no produt owner to cancel"})
    }
    data.status='cancelled'
    await data.save()
    res.status(200).json(data)
})
///processing/:id
const viewProceesingProduct=asyncHandler(async(req,res)=>{
    try{
        const data=await User.findById(req.params.id)
        if(!data)
        {
            return res.status(400).json({message:"There are no product to delete"})
        }
        res.status(200).json({
          success:true,
          data,
        })
      }
      catch(err)
    {
        console.log(err)
        res.status(400).json({
          success:false,
          message:err.message,
        })
    }
      
})
///processing/:id/verify
const verifyProductOwner=asyncHandler(async(req,res)=>{
    try{
        const data=await User.findById(req.params.id)
        if(!data)
        {
            return res.status(400).json({message:"There are no product to delete"})
        }
        data.status='verified'
        await data.save()
        res.status(200).json({
          success:true,
          message:'successfully status was changed to verified',
          data,
        })
      }
      catch(err)
    {
        console.log(err)
        res.status(400).json({
          success:false,
          message:err.message,
        })
    }
      
})



module.exports={cancelleingReq,verifyProductOwner,getProcessing,viewProceesingProduct}