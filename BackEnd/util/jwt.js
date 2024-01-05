const { findOne } = require("../models/processingModel")
const { User } = require("../models/userModel")

const sendToken=async(user,statusCode,res)=>{

    try{
        //create token
    const token=await user.getJwtToken()
  
    //create cookie options
    const option={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }
   const USER=await User.findOne({_id:user.id})
    res.status(statusCode)
    .cookie('token',token,option)
    .json({
        success:true,
        USER,
        token
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