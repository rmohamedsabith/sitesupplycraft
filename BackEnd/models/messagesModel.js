const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    content:{
        type:String,
        required:[true,'Enter Your Message']
    },
    date:{
        type:Date,
        default:Date.now
    },
    isViewed:{
        type:Boolean,
        default:false, 
    }
})

const Message=mongoose.model('Message',messageSchema)
module.exports=Message;