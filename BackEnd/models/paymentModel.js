const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    postedItems: [],
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
        }
    },
    count:{
        type:Number,
        required:true
    }
    ,
    paidAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

let Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;