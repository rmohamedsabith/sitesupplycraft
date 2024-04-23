const asyncHandler=require('express-async-handler')
const {User,ProductOwner,JobSeeker,Admin}=require('../models/userModel')
const sendToken=require('../util/jwt')
const sendmail = require('../util/sendMail')
const crypto=require('crypto')
const fs=require('fs').promises
const path=require('path')
const { deleteUserAllProducts } = require('./productController')
const { stringify } = require('querystring')
const mongoose=require('mongoose')
const GoogleUser = require('../models/googleUserModel')
 
//Registration:- SideSupplyCraft/registration
const register=asyncHandler(async(req,res,next)=>{  
  try {  
    const{role}=req.body
    if(role!=='Google User'){ 
    if(req.files){
      req.body.profile=`${process.env.BACK_END_URL}/uploads/users/${encodeURI(req.files['profile'][0].filename)}`
      req.files['certificate']?req.body.certificate=`${process.env.BACK_END_URL}/uploads/users/${encodeURI(req.files['certificate'][0].filename)}`:null
      req.files['currentBill']?req.body.currentBill=`${process.env.BACK_END_URL}/uploads/users/${encodeURI(req.files['currentBill'][0].filename)}`:null
    }

    //Duplicate data find
    const duplicate1=await User.findOne({email:req.body.email}).lean()

    if (duplicate1) {
        return res.status(409).json({ message: 'Duplicate email' })
    }
    
     //cofirm password
     if(req.body.password!==req.body.confirmPassword) return res.status(409).json({message:"Password is not matched"})

    //create data based on role
    var user;
    if(role==="Admin")
    {
         user=await Admin.create(req.body)
    }
    else if(role==="Product Owner")
    {
          
         user=await ProductOwner.create(req.body) // need to verify by Admin after status will uptaded
  
         //await Processing.create(user.findOne({email:user.email})) // need to verify by Admin after status will uptaded
    }    
    else if(role==="Job Seeker")
    {
         user=await JobSeeker.create(req.body)  
    }

    else{
         user=await User.create(req.body) 
    }

    if(!user)
    {
        return res.status(400).json({message:"There is no user to create"})

    }
    else{
        try {

          //get token
          const token=await user.getEmailValidationToken();
          //save user to save emailValidationToken field and emailValidationTokenExpire field
          await user.save({validateBeforeSave:false})
      
          //create URL
         /* const resetURL=`${req.protocol}://${req.get('host')}/SiteSupplyCraft/email/verify/${token}` */
            const resetURL=`${process.env.FROND_END_URL}/email/verify/${token}`
          const message = `Hi ${user.firstname} ${user.lastname},\n\n
                          We just need to verify your email address before you can access your Account.
                          <a href="${resetURL}"><button style="padding: 10px; background-color: #3498db; color: #ffffff; border-radius: 5px; cursor: pointer;">Verify Email</button></a>
                          \n\n
                          Thanks! – The Site Supply Craft team
                          \n\n If you have not requested this email, then ignore it.`;
      
          await sendmail(
              {
                  email:user.email,
                  subject:"EMAIL VERIFICATION",
                  message
              }
          )
          sendToken(user,201,res,`Email sent to your ${user.email} to Verify Your Email`)
      
         } catch (error) {
          user.emailValidationToken=undefined
          user.emailValidationTokenExpire=undefined
          await user.save({validateBeforeSave:false})
           res.status(500).json({success:"fail",message:error.message})
         }
      
    }
  } 
  else if(role==='Google User')
  {
    
    const duplicate=await GoogleUser.findOne({email:req.body.email}).lean()
    if(duplicate)
    { 
      const { token, ...userData } = req.body;
      const user = await GoogleUser.findOneAndUpdate({ email: req.body.email }, userData, { new: true });      
      sendToken(user,201,res,null,true)
    
    }
    else{
      const { token, ...userData } = req.body;
      const user = await GoogleUser.create(userData);
      sendToken(user,201,res,null,true)
    }


  }

  } catch (error) {
        if (error.name === 'ValidationError') {
          // Handle Mongoose validation errors
          const validationErrors = {};
          for (const field in error.errors) {
            validationErrors[field] = error.errors[field].message;
          }
          return res.status(400).json({ success: 'Fail', errors: validationErrors });
        } else {
          console.error(error);
          res.status(400).json({ success: 'Error', message:error.message });
        }
      }

}

)
//verify the Email /email/verify/:token
const verifyEmail=asyncHandler(async(req,res)=>{
  try {
    const hasedToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({
      emailValidationToken:hasedToken,
      emailValidationTokenExpire:
        {
          $gt:new Date()
        }
      })
      if(!user)
      {
        return res.status(400).json({message:"Email Verification token is invalid or expired"})
      }
      user.isvalidEmail=true;
      user.emailValidationToken=undefined
      user.emailValidationTokenExpire=undefined
      await user.save({validateBeforeSave:false})
      sendToken(user, 201, res,'Successfully verified your Email')
  } catch (err) {
    res.status(400)
    .json({
        success:false,
        message:err.message
    })
  }
})
//change the email /email/change
const changeUserEmail=asyncHandler( async (req,res)=>{
  let user = req.user;
  //checking for existing email in database
  const emailExist = await User.findOne({ email : req.body.email});
  if(emailExist){
    return res.status(400).json({message:"The given email already exists."});
  }
  user.email=req.body.email
  //save the email
  await user.save({validateBeforeSave:false});
  //sending a verification mail to new email id  
  try {
    //get token
    const token=await user.getEmailValidationToken();
    //save user to save emailValidationToken field and emailValidationTokenExpire field
    await user.save({validateBeforeSave:false})

    //create URL
    /* const resetURL=`${req.protocol}://${req.get('host')}/SiteSupplyCraft/email/verify/${token}` */
    const resetURL=`${process.env.FROND_END_URL}/email/verify/${token}`
    const message = `Hi ${user.firstname} ${user.lastname},\n\n
                    We just need to verify your email address before you can access your Account.
                    <a href="${resetURL}"><button style="padding: 10px; background-color: #3498db; color: #ffffff; border-radius: 5px; cursor: pointer;">Verify Email</button></a>
                    \n\n
                    Thanks! – The Site Supply Craft team
                    \n\n If you have not requested this email, then ignore it.`;

    await sendmail(
        {
            email:user.email,
            subject:"EMAIL VERIFICATION",
            message
        }
    )
    res.status(200).json({
        success: true,
        message: `Email sent to your ${user.email} to Verify Your Email`,
        USER:user,
    })

   } catch (error) {
    user.emailValidationToken=undefined
    user.emailValidationTokenExpire=undefined
    await user.save({validateBeforeSave:false})
     res.status(500).json({success:"fail",message:error.message})
   }  
})
//resend email /email/resend
const resendVerificationEmail=asyncHandler( async (req,res)=>{
  const user=req.user
  //Resending a verification mail
  try {
    //get token
    const token=await user.getEmailValidationToken();
    //save user to save emailValidationToken field and emailValidationTokenExpire field
    await user.save({validateBeforeSave:false})
    console.log(user)

    //create URL
    /* const resetURL=`${req.protocol}://${req.get('host')}/SiteSupplyCraft/email/verify/${token}` */
    const resetURL=`${process.env.FROND_END_URL}/email/verify/${token}`
    const message = `Hi ${user.firstname} ${user.lastname},\n\n
                    We just need to verify your email address before you can access your Account.
                    <a href="${resetURL}"><button style="padding: 10px; background-color: #3498db; color: #ffffff; border-radius: 5px; cursor: pointer;">Verify Email</button></a>
                    \n\n
                    Thanks! – The Site Supply Craft team
                    \n\n If you have not requested this email, then ignore it.`;

    await sendmail(
        {
            email:user.email,
            subject:"EMAIL VERIFICATION",
            message
        }
    )
    res.status(200).json({
        success: true,
        message: `Email sent to your ${user.email} to Verify Your Email again`
    })

   } catch (error) {
    user.emailValidationToken=undefined
    user.emailValidationTokenExpire=undefined
    await user.save({validateBeforeSave:false})
     res.status(500).json({success:"fail",message:error.message})
   }  
})
//Login:- SideSupplyCraft/login
const login=asyncHandler(async(req,res)=>{

       try{
         const {email,password}=req.body
        if(!email||!password)return res.status(400).json({success:"fail",message:"Please Enter Email and password"})

        //get data from the database based on the email and password
        
            const user= await User.findOne({email}).select('+password') 
            if(!user || !await user.isValidPassword(password)) return res.status(401).json({success:"fail",message:"Invalid  Email and password"})
            sendToken(user,200,res)
        }
        catch(err)
        {
            res.status(400).json({
                error:err.name,
                message:err.message
            })
        } 
})
//Logout:- SideSupplyCraft/logout
const logout=(req,res,next)=>{
   try {
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    }).status(200).json({success:"true",message:"logged out"})
   } catch (error) {
     res.status(400).json({success:"fail",message:error.message})
   }
} 
//forgotPassword:- SideSupplyCraft/password/forgot
const forgotPassword=asyncHandler(async(req,res,next)=>{

    if(req.body.email==='')
    {
      return res.status(400).json({message:"Please enter your email "})
    }
    const user =  await User.findOne({email: req.body.email});
    if(!user)
    {
        return res.status(400).json({message:"There is no user in this email"})

    }
    try {

    //get token
    const token=await user.getResetPasswordToken();
    //save user to save resetPasswordToken field and resetPasswordExpire field
    await user.save({validateBeforeSave:false})

    //create URL
    /* const resetURL=`${req.protocol}://${req.get('host')}/SiteSupplyCraft/password/reset/${token}` */
    const resetURL=`${process.env.FROND_END_URL}/password/reset/${token}`
    const message = `Your password reset url is as follows \n\n 
                    <a href="${resetURL}"><button style="padding: 10px; background-color: #3498db; color: #ffffff; border-radius: 5px; cursor: pointer;">Reset Password</button></a>
                    \n\n If you have not requested this email, then ignore it.`;

    await sendmail(
        {
            email:user.email,
            subject:"RECOVERY PASSWORD",
            message
        }
    )
    res.status(200).json({
        success: true,
        message: `Email sent to your ${user.email}`
    })

   } catch (error) {
    user.resetPasswordToken=undefined
    user.resetPasswordTokenExpire=undefined
    await user.save({validateBeforeSave:false})
     res.status(500).json({success:"fail",message:error.message})
   } 
} )
//reset Password /password/reset/:token
const resetPassword=asyncHandler(async(req,res)=>{
  try {
    const hasedToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({
      resetPasswordToken:hasedToken,
      resetPasswordTokenExpire:
        {
          $gt:new Date()
        }
      })
      if(!user)
      {
        return res.status(400).json({message:"'Password reset token is invalid or expired'"})
      }
  
      if(req.body.password!== req.body.confirmPassword)return res.status(400).json({message:"'Password does not match'"})
  
      user.password = req.body.password;
      user.resetPasswordToken=undefined
      user.resetPasswordTokenExpire=undefined
      await user.save({validateBeforeSave:false})
      sendToken(user, 201, res)
  } catch (err) {
    res.status(400)
    .json({
        success:false,
        message:err.message
    })
  }
})
//get logged user profile - /myprofile
const getProfile=asyncHandler(async(req,res,next)=>{
  try{
    let user
   if(req.user.role==='Google User')
   {user=await GoogleUser.findById(req.user.id).populate({
    path: 'carts.products',
    select: 'name price ratings images.image type priceType',
    populate: {
        path: 'owner',
        select: 'shopName'
    }
}).populate({
    path:'carts.laborers',
    select:'firstname lastname profile price priceType job'
})
.lean()
}
   else {user=await User.findById(req.user.id).populate({
      path: 'carts.products',
      select: 'name price ratings images.image type priceType',
      populate: {
          path: 'owner',
          select: 'shopName'
      }
  }).populate({
      path:'carts.laborers',
      select:'firstname lastname profile price priceType job'
  })
  .lean()
}
    res.status(200).json({
      success:true,
      user,
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
//password change - /myprofile/changepassword
const changePassword=asyncHandler(async(req,res,next)=>{
  try{
    const user=await User.findById(req.user.id).select('+password')
    if(! await user.isValidPassword(req.body.oldPassword)) 
    {
       return res.status(401).json({
        success:false,
        message:'old password is incorrect',
      })
    } 
     //cofirm password
     if(req.body.password!==req.body.confirmPassword) return res.status(409).json({message:"Password is not matched"})

     //assign new password
     user.password=req.body.password
     await user.save()
    res.status(200).json({
      success:true,
      user,
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
//update profile - /myprofile/edit/
const updateMyprofile=asyncHandler(async(req,res,next)=>{
  try{
    
    if(req.files){
      req.files['profile']?req.body.profile=`${process.env.BACK_END_URL}/uploads/users/${req.files['profile'][0].filename}`:null
      req.files['certificate']?req.body.certificate=`${process.env.BACK_END_URL}/uploads/users/${req.files['certificate'][0].filename}`:null
      req.files['currentBill']?req.body.currentBill=`${process.env.BACK_END_URL}/uploads/users/${req.files['currentBill'][0].filename}`:null
    }
    const user=await User.findById(req.user.id).select('+password')
    const profile=user.profile;
    //assign new data
    if(req.body.firstname)user.firstname=req.body.firstname
    if(req.body.lastname)user.lastname=req.body.lastname
    if(req.body.email)user.email=req.body.email
    if(req.body.profile)user.profile=req.body.profile
    if(req.body.number)user.address.number=req.body.number
    if(req.body.street)user.address.street=req.body.street
    if(req.body.city)user.address.city=req.body.city
    if(req.body.district)user.address.district=req.body.district
    if(req.body.postalCode)user.address.postalCode=req.body.postalCode
    if(req.body.phone)user.phone=req.body.phone
    if(req.body.nic)user.nic=req.body.nic
    if(req.body.emp_id)user.emp_id=req.body.emp_id
    if(req.body.title)user.title=req.body.title
    if(req.body.shopReg_no)user.shopReg_no=req.body.shopReg_no
    if(req.body.shopName)user.shopName=req.body.shopName
    if(req.body.certificate)user.certificate=req.body.certificate
    if(req.body.currentBill)user.currentBill=req.body.currentBill
    if(req.body.job)user.job=req.body.job
    if(req.body.price)user.price=req.body.price
    if(req.body.priceType)user.priceType=req.body.priceType
    if(req.body.description)user.description=req.body.description
    if(req.body.lat)user.location.lat=req.body.lat
    if(req.body.long)user.location.long=req.body.long
   
   /*  if(user.role==='Product Owner') // need to change if only changes happend we need to change the code
    {
      user.status='processing'
      await user.save()
      

    }
    else
    {
      await user.save()
    }  */
    await user.save()
    // delete the stored image if the new image is different
      if (profile && req.body.profile) {
        const oldProfileFilename = path.basename(new URL(profile).pathname);
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

      res.status(200).json({
        success:true,
        message:'successfully updated',
        user,
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

//delete logged user profile - /myprofile/delete
const deleteMyprofile=asyncHandler(async(req,res)=>{
  try{
    const profile=req.user.profile
    let currentBill;
    let certificate;
    if(req.user.role==='Product Owner')
    {
      currentBill=req.user.currentBill;
      certificate=req.user.certificate
      deleteUserAllProducts(req)
    }
    const user=await User.deleteOne({_id:req.user.id})
    
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

    res.cookie('token',null,{
      expires:new Date(Date.now()),
      httpOnly:true
     }).status(200).json({
      success:true,
      message:'successfully deleted',
      user,
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

//add to cart - /myCart/add/:model/:id
const addCart=asyncHandler(async(req,res,next)=>{
  const productId=req.params.id
  const model=req.params.model
  const user=req.user
 
  
   // Convert productId to ObjectId
   const productIdObject = new mongoose.Types.ObjectId(productId);
   if(user._id.equals(productIdObject))return res.status(400).json({message:'You can not add yourself'})

   // Check for duplicate
   const duplicate = user.carts[model].some((product) => product.equals(productIdObject));

  if(duplicate)return res.status(400).json({message:'You have already added this product'})

  //add to cart
  user.carts[model].push(productId)
  user.numOfCarts=(user.carts.products.length||0)+(user.carts.laborers.length||0)

  await user.save({validateBeforeSave: false});
  res.status(200).json({
      success: true,
      user
  })

})

//deleteOne to cart - /myCart/delete/:model/:id
const deleteOneCart=asyncHandler(async(req,res,next)=>{
  const productId=req.params.id
  const user=req.user
  const model=req.params.model
  // Convert productId to ObjectId
  const productIdObject = new mongoose.Types.ObjectId(productId);

  // Filter out the specified product from the user's carts
  user.carts[model] = user.carts[model].filter((item) => !item.equals(productIdObject));

  // Update the number of carts
  user.numOfCarts = user.carts.products.length+user.carts.laborers.length;
  
    await user.save({validateBeforeSave: false});
    res.status(200).json({
      success:true,
      user
    })
})
//deleteAll to cart - /myCart/deleteALl
const deleteAllCart=asyncHandler(async(req,res,next)=>{
  const user=req.user
  user.carts.products=[];
  user.carts.laborers=[];
  user.numOfCarts=0
  await user.save({validateBeforeSave: false});
    res.status(200).json({
      success:true,
      user
    })
})


module.exports=
{
  register,
  verifyEmail,
  resendVerificationEmail,
  changeUserEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getProfile,
  changePassword,
  updateMyprofile,
  deleteMyprofile,
  addCart,
  deleteOneCart,
  deleteAllCart,
}