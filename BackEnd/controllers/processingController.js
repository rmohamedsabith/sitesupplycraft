const asyncHandler= require('express-async-handler')
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
    const user=await User.findById(req.params.id).exec()
    if(!user)
    {
        return res.status(400).json({message:"There are no produt owner to cancel"})
    }
    const message = `We understand that this may cause inconvenience, and we apologize for any disruption to your services. 
                      \nOur goal is to maintain the integrity and security of our platform, and your cooperation in this matter is highly appreciated.
                      \nPlease note that your account will remain suspended until the re-registration process is completed successfully. 
                      \nWe appreciate your prompt attention to this matter.
    
                    \n\nThank you for your understanding and cooperation.`;

    await sendmail(
        {
            email:user.email,
            subject:"Your Account is Suppend",
            message
        }
    )

        const data=await User.deleteOne(req.params.id).exec()
        
        res.status(200).json({
          success:true,
          data,          
        })
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
        const user=await User.findById(req.params.id)
        if(!user)
        {
            return res.status(400).json({message:"There are no product to delete"})
        }
        user.status='verified'
        await user.save()

        const message = `I'm pleased to inform you that the verification process is complete. 
                        \nThe product meets all criteria and standards. If you have any questions, feel free to reach out.`;

    await sendmail(
        {
            email:user.email,
            subject:"Verification Successful",
            message
        }
    )
        res.status(200).json({
          success:true,
          message:'successfully status was changed to verified',
          user,
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