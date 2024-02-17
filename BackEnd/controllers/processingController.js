const asyncHandler=require('express-async-handler')
const { User, ProductOwner} = require('../models/userModel')
const sendmail =require('../util/sendMail')

//Processing status data  -> /procesing
const getProcessing=asyncHandler(async(req,res)=>{
  const data = await ProductOwner.find({
    $and: [
        { $or: [{ status: 'processing' }, { status: 'cancelled' }] },
        { isvalidEmail: true }
    ]
    }).exec();
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
    //create URL
    /*const resetURL=`${req.protocol}://${req.get('host')}/SiteSupplyCraft/email/verify/${token}`*/
    const resetURL=`${process.env.FROND_END_URL}/login`
  //Send my about product owner Status
  try {
    const message = `Hi ${data.firstname} ${data.lastname},\n\n
                    Your Account is Cancelled. Please recheck your Certificate and Current Bill details are match with your given details after updata your profile.
                    \n\n
                    To go our website use this ${resetURL}\n\n
                    Thanks! – The Site Supply Craft team
                    \n\n If you have not requested this email, then ignore it.`;

    await sendmail(
        {
            email:data.email,
            subject:"Account Cancelled",
            message
        }
    )
    res.status(200).json({
        success: true,
        message: `Email was sent to  ${data.email}`
    })

   } catch (error) {
     res.status(500).json({success:"fail",message:error.message})
   }

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

        //create URL
    /*const resetURL=`${req.protocol}://${req.get('host')}/SiteSupplyCraft/email/verify/${token}`*/
    const resetURL=`${process.env.FROND_END_URL}/login`

         //Send my about product owner Status
  try {
    const message = `Hi ${data.firstname} ${data.lastname},\n\n
                    Your Account is verified. Check the Status on your Profile.
                    Now you can post your Product.
                    \n\n
                    To go our website use this ${resetURL}\n\n
                    Thanks! – The Site Supply Craft team
                    \n\n If you have not requested this email, then ignore it.`;

    await sendmail(
        {
            email:data.email,
            subject:"Account Verified",
            message
        }
    )
    res.status(200).json({
        success: true,
        message:'successfully status was changed to verified',
        data,
    })

   } catch (error) {
     res.status(500).json({success:"fail",message:error.message})
   }
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