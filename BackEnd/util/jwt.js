const GoogleUser = require("../models/googleUserModel")
const { findOne } = require("../models/processingModel")
const { User } = require("../models/userModel")

const sendToken=async(user,statusCode,res,additional=null,isGoogleUser=false)=>{

    try{
        //create token
        const token=await user.getJwtToken()
  
    //create cookie options
    const option={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }    
        let USER
       if(isGoogleUser)
       {USER=await GoogleUser.findById({_id:user.id}).populate({
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
       else {USER=await User.findById({_id:user.id}).populate({
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

    res.status(statusCode)
    .cookie('token',token,option)
    .json({
        success:true,
        USER,
        token,
        message:additional
    })
    }  
    catch(err)
    {
        console.log(err)
        res.status(400)
        .json({
            success:false,
            message:err.message
        })
    }
}
module.exports=sendToken