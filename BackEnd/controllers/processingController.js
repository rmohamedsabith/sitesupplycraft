const asyncHandler= require('express-async-handler')
const { User, ProductOwner} = require('../models/userModel')
const sendmail =require('../util/sendMail')
const fs=require('fs').promises
const path=require('path')

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
    /* data.status='cancelled'
    await data.save() */
    //create URL
    /*const resetURL=`${req.protocol}://${req.get('host')}/SiteSupplyCraft/email/verify/${token}`*/
    const resetURL=`${process.env.FROND_END_URL}/login`
  //Send my about product owner Status
  try {
    const message = `Hi ${data.firstname} ${data.lastname},\n\n
                    Your Account is Cancelled. Please recheck your Certificate and Current Bill details are match with your given details after Re-register your profile.
                    \n\n
                    To go our website use this ${resetURL}\n\n
                    Thanks! – The Site Supply Craft team
                    \n\n If you have not requested this email, then ignore it.`;

    await sendmail(
        {
            email:data.email,
            subject:"Account Cancelled and Deleted",
            message
        }
    )
    /* await User.findByIdAndDelete(req.params.id) */
      const profile=data.profile
      let currentBill;
      let certificate;
      if(data.role==='Product Owner')
      {
        currentBill=data.currentBill;
        certificate=data.certificate
      }
           
      // delete the stored image if the new image is different
      if (profile) {
        const oldProfileFilename = encodeURI(path.basename(new URL(profile).pathname));
        console.log(oldProfileFilename)
        const oldProfileFilePath = path.join(__dirname,'..','uploads', 'users', oldProfileFilename);
        // Check if the file exists before attempting to delete
        try {
          await fs.access(oldProfileFilePath);
          // Delete the old file
          await fs.unlink(oldProfileFilePath);
        } catch (error) {
          console.error('Error deleting old profile image:', error.message);
        }
      }
      if (currentBill) {
        const oldCurrentBillFilename = encodeURI(path.basename(new URL(currentBill).pathname));
        console.log(oldCurrentBillFilename)
        const oldCurrentBillFilePath = path.join(__dirname,'..','uploads', 'users', oldCurrentBillFilename);
        // Check if the file exists before attempting to delete
        try {
          await fs.access(oldCurrentBillFilePath);
          // Delete the old file
          await fs.unlink(oldCurrentBillFilePath);
        } catch (error) {
          console.error('Error deleting old currentBill image:', error.message);
        }
      }
      if (certificate) {
        const oldcertificateFilename = encodeURI(path.basename(new URL(certificate).pathname));
        console.log(oldcertificateFilename)
        const oldcertificateFilePath = path.join(__dirname,'..','uploads', 'users', oldcertificateFilename);
        // Check if the file exists before attempting to delete
        try {
          await fs.access(oldcertificateFilePath);
          // Delete the old file
          await fs.unlink(oldcertificateFilePath);
        } catch (error) {
          console.error('Error deleting old certificate image:', error.message);
        }
      }
      const user=await User.deleteOne({_id:data.id})
      res.status(200).json({
        success: true,
        message: `Email was sent to  ${data.email} and Account was deleted.`
    })
    }
    catch(err)
    {
      res.status(400).json({
        success:false,
        message:err.message,
      })
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