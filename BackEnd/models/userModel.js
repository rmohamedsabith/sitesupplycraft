const mongoose = require("mongoose");
const validator=require("validator")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema=new mongoose.Schema({
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
    },
    password:{
        type:String,
        required:[true,"please Enter a Password"],
        select:false //to hide the password when find method call
    },
    phone:{
        type:String,
        required:[true,'Please enter phone number'],
        validate:[validator.isMobilePhone,'Please Enter valid phone number']//+94 77 123 3243
    },
    role:{
        type:String,
        default:'Customer',
        enum:['Customer','Admin','Product Owner','Job Seeker']
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
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    isvalidEmail:{
        type:Boolean,
        default:false
    },
    emailValidationToken:String, 
    emailValidationTokenExpire:Date
},{
    timestamps:true
})

//create seperate models for each role
const adminSchema=new mongoose.Schema({
    emp_id: {
        type: String,
        default: "",
        validate: {
            validator: function (value) {
                return this.role === 'Admin' ? value !== "" : true;
            },
            message: 'Please enter your valid Employee id',
        },
    },
    title: {
        type: String,
        default: "",
        validate: {
            validator: function (value) {
                return this.role === 'Admin' ? value !== "" : true;
            },
            message: 'Please enter your valid your Title',
        },
    }
,
}, {
    discriminatorKey: 'role',
    _id: false, // to disable automatic _id generation for discriminator models
})

const productOwnerSchema=new mongoose.Schema({
    
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
    }
    ,
   address:
   {
       number:{type:String,required:[true,'Please Enter Your Address no']},
       street:{type:String,required:[true,'Please Enter Street']},
       city:{type:String,required:[true,'Please Enter your city']},
       district:{type:String,required:[true,'Please Enter Your District']},
       postalCode:{type:Number,required:[true,'Please Enter Your Postal Code']}
   },
    
    certificate:{
        type:String,
        required:[true,'Upload your shop registered certificate']
    },
    currentBill:{
        type:String,
        required:[true,'Upload your shop current bill Whic is within one month']
    },
    location:{
        lat:{
            type:Number,
            required:[true,'select Your location']
        },
        long:{
            type:Number,
            required:[true,'select Your location']
        },
    }
    ,
    status:{
        type:String,
        default:'processing',
        enum:{
            values:['processing','verified','cancelled']
        }
    }

},{
    discriminatorKey: 'role',
    _id: false, // to disable automatic _id generation for discriminator models
})

const jobSeekerSchema=new mongoose.Schema({
    
    job:{
        type: String,
        required: true,                
        enum: {
            values: [ 
                'Electrician', 
                'Plumber',
                'Meason',
                'Painter',
                'Tiles',
                'A/C Repair',
                'LandScaping',
                'Engineer',
                'Carpenter',
                'Curtin',
                'Cleaner',
                'Concrete Slup',
                'Movers',
                'CCTV Technician',
                'Cieling',
                'Architech',
                'Contractor',
                'Others'
            ],
            message : "Please select a job"
        }
    }
    ,
   address:
   {
       number:{type:String,required:[true,'Please Enter Your Address no']},
       street:{type:String,required:[true,'Please Enter Street']},
       city:{type:String,required:[true,'Please Enter your city']},
       district:{type:String,required:[true,'Please Enter Your District']},
       postalCode:{type:Number,required:[true,'Please Enter Your Postal Code']}
   } ,
   location:{
    lat:{
        type:Number,
        required:[true,'select Your location']
    },
    long:{
        type:Number,
        required:[true,'select Your location']
    },
    },
    price:{
        type:Number,
        required:[true,'Please mention your One Day Charge']
    },
    priceType:{
        type:String,
        default:'/perDay',
        enum:{
            values:['/perDay','/perMonth','/perHour']
        }
        

    },
    description:{
        type:String,
    },
    ratings:{
        type:Number,
        default:0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
    {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    status:{
        type:String,
        default:'Active',
        enum:{
            values:['Active','Deactive']
        }
    }
},{
    discriminatorKey: 'role',
    _id: false,
})

userSchema.pre('save',async function (next){
    try {
        this.firstname=this.firstname.toUpperCase();
        this.lastname=this.lastname.toUpperCase();
        if(!this.isModified('password')) return next()
        this.password=await bcrypt.hash(this.password,10)//to hash the password
       return next()
        
    } catch (error) {
        next(error)
    }
})

userSchema.methods.getJwtToken= function(){
    return jwt.sign({id:this.id,role:this.role,email:this.email},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword= async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.getResetPasswordToken=function(){
    
    //generate token
    const token=crypto.randomBytes(20).toString('hex')

    // to make hashed toke and set resetPasswordToken and resetPasswordExpire
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
    this.resetPasswordTokenExpire=new Date(Date.now()+ 30*60*60*1000)

    return token;

}
userSchema.methods.getEmailValidationToken=function(){
    
    //generate token
    const token=crypto.randomBytes(20).toString('hex')

    // to make hashed toke and set resetPasswordToken and resetPasswordExpire
    this.emailValidationToken=crypto.createHash('sha256').update(token).digest('hex')
    this.emailValidationTokenExpire=new Date(Date.now()+ 3*24*60*60*1000)

    return token;

}

//Define User Model
const User=mongoose.model('User',userSchema)

//Define the Discriminators model
const Admin = User.discriminator('Admin', adminSchema);
const ProductOwner = User.discriminator('Product Owner', productOwnerSchema);
const JobSeeker = User.discriminator('Job Seeker', jobSeekerSchema);



module.exports= {
    User,
    Admin,
    ProductOwner,
    JobSeeker
};