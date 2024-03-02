const asyncHandler=require('express-async-handler');
const Payment = require('../models/paymentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.processPayment = asyncHandler(async (req, res, next) => {
    // Assuming req.body.amount is in LKR, convert it to cents
    const amountInLKR = parseFloat(req.body.amount);
    const conversionRate = 100; // 1 LKR = 100 cents

    // Convert LKR to cents
    const amountInCents = Math.round(amountInLKR * conversionRate);

    // Check if the converted amount meets the minimum requirement
    if (amountInCents < 50) {
        return res.status(400).json({
            success: "Fail",
            message: `Amount must be at least 50 cents. ${amountInLKR} LKR converts to approximately ${amountInCents} cents.`
        });
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: process.env.STRIPE_CURRENCY, // Use the appropriate currency code for LKR
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment" },
      /*   shipping: req.body.shipping */
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    });
});

exports.sendStripeApi  = asyncHandler(async(req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})

//create paymentDetail  /payment/new
exports.newPayment =  asyncHandler( async (req, res, next) => {
    const {
        postedItems,
        totalPrice,
        paymentInfo,
        count
    } = req.body;

    const payment = await Payment.create({
        postedItems,
        totalPrice,
        paymentInfo,
        count,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        payment
    })
})

//getAllPayments /payments
exports.getAllPayments = asyncHandler(async (req, res, next) => {
    const payments = await Payment.find().populate('user','firstname lastname profile');

    let totalAmount = 0;
    let totalCount=0;
    let data={
        "January": {"no":0,"total":0},
        "February": {"no":0,"total":0},
        "March": {"no":0,"total":0},
        "April": {"no":0,"total":0},
        "May": {"no":0,"total":0},
        "June": {"no":0,"total":0},
        "July": {"no":0,"total":0},
        "August": {"no":0,"total":0},
        "September": {"no":0,"total":0},
        "October": {"no":0,"total":0},
        "November": {"no":0,"total":0},
        "December": {"no":0,"total":0}
      }
    payments.map((item)=>{
        switch(item.createdAt.getMonth())
        {
            case 0:{
                data['January'].no+=item.count;
                data['January'].total+=item.totalPrice;
                break;
            }
            case 1:{
                data['February'].no+=item.count;
                data['February'].total+=item.totalPrice;
                break;
            }
            case 2:{
                data['March'].no+=item.count;
                data['March'].total+=item.totalPrice;
                break;
            }
            case 3:{
                data['April'].no+=item.count;
                data['April'].total+=item.totalPrice;
                break;
            }
            case 4:{
                data['May'].no+=item.count;
                data['May'].total+=item.totalPrice;
                break;
            }
            case 5:{
                data['June'].no+=item.count;
                data['June'].total+=item.totalPrice;
                break;
            }
            case 6:{
                data['July'].no+=item.count;
                data['July'].total+=item.totalPrice;
                break;
            }
            case 7:{
                data['August'].no+=item.count;
                data['August'].total+=item.totalPrice;
                break;
            }
            case 8:{
                data['September'].no+=item.count;
                data['September'].total+=item.totalPrice;
                break;
            }
            case 9:{
                data['October'].no+=item.count;
                data['October'].total+=item.totalPrice;
                break;
            }
            case 10:{
                data['November'].no+=item.count;
                data['November'].total+=item.totalPrice;
                break;
            }
            case 11:{
                data['December'].no+=item.count;
                data['December'].total+=item.totalPrice;
                break;
            }
        }
        
    })

    payments.forEach(payment => {
        totalAmount += payment.totalPrice;
        totalCount+=payment.count
        
    })

    res.status(200).json({
        success: true,
        totalAmount,
        totalCount,
        post_per_month_Totals:data,
        payments
    })
})

// get single payment detail /payment/:id
exports.getOnePayment=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const payment=await Payment.findOne({_id:id}).populate('user','_id firstname lastname profile address')

    res.status(200).json({
        success:true,
        payment
    })

})
