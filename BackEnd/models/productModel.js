const mongoose=require('mongoose')
const User=require('./userModel')

const productSchema= new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter the Product Name"],
        trim:true,
        maxLength:[100,"Product Name Cannot Exceed 100 Characters"]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    images:[
        {
            image:{
                type:String,
                require:true
            }
        }
    ],
    price:{
        type:Number,
        required:[true,"Please Enter price"]
    },
    priceType:{
        type:String,
        default:'/perDay',
        enum:{
            values:['/perDay','/perMonth','/perHour']
        }
        

    },
    discount:{
        type:Number,
        default:0
    },
   
   /*  filter:{
        type:mongoose.Schema.Types.Mixed
    }, */
    type:{
        type:String,
        default:"sell",
        enum: 
            ["sell","rent"]        
    },
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                'Masonry',
                'Metal', 
                'Wood',
                'Plastics',
                'Glass',
                'Electrical',
                'Plumbing',
                'Paints',
                'Tiles',
                'Machines',
                'Tools',
                'Others'
            ],
            message : "Please select correct category"
        }
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings:{
        type:Number,
        default:0,
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
 reviews: [
    {
           /*  user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }, */
           user: {
                normal:{type: mongoose.Schema.ObjectId,ref:'User'
                },
                googleUser:{
                    type: mongoose.Schema.ObjectId,ref:'GoogleUser'
                }
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
    timestamps:true
})

productSchema.pre('save',function(next){
     this.name=this.name.toUpperCase();
     next();
})

module.exports=mongoose.model('product',productSchema)