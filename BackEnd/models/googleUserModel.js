const mongoose = require("mongoose");
const validator=require("validator")
const jwt=require('jsonwebtoken')

const googleUserSchema=new mongoose.Schema({
    //General Data
    
    name:{
        type:String,
        required:[true,'Please Enter Your Last Name']
    },
    email:{
        type:String,
        required:[true,'Please Enter Your Email'],
        validate:[validator.isEmail,"please enter valid Email"]
    },
    profile:{
        type:String,
    },

    role:{
        type:String,
        default:'Google User',
    },
    carts:{
        products:[{type:mongoose.Types.ObjectId,ref:'product'}],
        laborers:[{type:mongoose.Types.ObjectId,ref:'Job Seeker'}],
    }
    ,
    numOfCarts:{
        type:Number,
        default:0
    },
    isvalidEmail:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
})

googleUserSchema.methods.getJwtToken= function(){
    return jwt.sign({id:this.id,role:'Google User',email:this.email},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

//Define googleUser Model
const GoogleUser=mongoose.model('GoogleUser',googleUserSchema)
module.exports=GoogleUser