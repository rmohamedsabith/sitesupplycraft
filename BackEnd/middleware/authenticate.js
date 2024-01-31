const jwt = require("jsonwebtoken")
const {User} = require("../models/userModel")
const AsyncHandler = require("express-async-handler")
const GoogleUser = require("../models/googleUserModel")

const isAuthenticatedUser=AsyncHandler(async(req,res,next)=>{
    const{token}=req.cookies    

    if(!token)return res.status(401).json({success:false,message:"Before access that page you have to login first"})

    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
    try {
        
        if (decode.role==='Google User') {
            req.user = await GoogleUser.findOne({ email: decode.email });
          } else {
            // Handle the case for your custom JWT tokens
            req.user = await User.findById({ _id: decode.id });
          } 
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token',error:error.message });
    }
})

const authorizedUser=(...roles)=>{

    return (req,res,next)=>{
        if(!roles.includes(req.user.role))return res.status(401).json({success:"fail",message:`Role:${req.user.role} is not allowed to access this page`})
        if(roles.includes(req.user.role)&&req.user.role==='Product Owner'&&req.user.status!=='verified')return res.status(401).json({success:"fail",message:`Role:${req.user.role}'s profile is not verfied to access this page`})
        next();
    }

   
}

module.exports={
    isAuthenticatedUser,authorizedUser
}