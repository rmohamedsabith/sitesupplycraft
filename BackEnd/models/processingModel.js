/* const mongoose = require("mongoose");
const validator=require("validator")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const processingSchema=new mongoose.Schema({
    //General Data
    firstname:{
        type:String,
        required:[true,'Please Enter Your First Name']
    },
    lastname:{
        type:String,
        required:[true,'Please Enter Your Last Name']
    },
    email:{
        type:String,
        required:[true,'Please Enter Your Email'],
        unique:true,
        validate:[validator.isEmail,"please enter valid Email"]
    },
    profile:{
        type:String,
        required:[true,"please Upload Your picture"]
    },
    address:
        {
            number:{type:String,required:[true,'Please Enter Your Address no']},
            street:{type:String,required:[true,'Please Enter Street']},
            city:{type:String,required:[true,'Please Enter your city']},
            district:{type:String,required:[true,'Please Enter Your District']},
            province:{type:String,required:[true,'Please Enter Your Province']},
            postalCode:{type:Number,required:[true,'Please Enter Your Postal Code']}
        }
    ,
    phone:{
        type:String,
        required:[true,'Please enter phone number'],
        validate:[validator.isMobilePhone,'Please Enter valid phone number']//+94 77 123 3243
    },
    
    nic: {
        type: String,
        unique: [true, 'NIC should be unique'],
        default: "",
        validate: {
            validator: function (value) {
                const trimmedValue = value.trim();
                
                if (/^\d{12}$/.test(trimmedValue) || (trimmedValue.endsWith('v') && trimmedValue.length === 10)) {
                    return true;
                }
    
                return false;
            },
            message: 'Please enter a valid NIC with either 12 digits or a 10-character string ending with "v".'
        }
    }
    ,
    role:{
        type:String,
        default:'Customer',
        enum:['Customer','Admin','Product Owner','Job Seeker']
    }
   ,
   shopReg_no: {
    type: String,
    default: "",
    validate: {
        validator: function (value) {
            return this.role === 'Product Owner' ? value !== "" : true;
        },
        message: 'Please enter your Shop\'s Registration number',
    },
    },
    shopName:
    {
        type:String,
        default:"",
        validate: {
            validator: function (value) {
                if(this.role==='Product Owner')
                    return value!==""
            },
            message: 'Please enter your Shop Name'
        }
    },
    certificate:{
        type:String,
        required:[true,'Upload your shop registered certificate']
    },
    currentBill:{
        type:String,
        required:[true,'Upload your shop current bill Whic is within one month']
    },
    status:{
        type:String,
        default:'processing',
        enum:{
            values:['processing','verified','cancelled']
        }
    }
    },{
        timestamps:true
})


processingSchema.methods.getJwtToken= function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

module.exports= mongoose.model('Processing',processingSchema) */