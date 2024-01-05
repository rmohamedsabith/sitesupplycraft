const asyncHandler=require('express-async-handler')
const { User} = require('../models/userModel')

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



module.exports={cancelleingReq,verifyProductOwner}