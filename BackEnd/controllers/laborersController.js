const asyncHandler = require("express-async-handler");
const { JobSeeker, User } = require("../models/userModel");
const apiFeatures = require("../util/apiFeatures");

//getAll laborers /laborers
const getLaborers=asyncHandler(async(req,res)=>{
    const resultperpage=8;
    const apifeature=new apiFeatures(JobSeeker.find({status:'Active'}),req.query)
      apifeature.search();
      await apifeature.filter('JobSeeker');
      apifeature.paginate(resultperpage);   
    const datas=await apifeature.query
    let Products;
    apifeature.data?Products=datas.filter(data=>{if((data.address.district===apifeature.data.district&&apifeature.data.city===null)||(data.address.district===apifeature.data.district && data.address.city===apifeature.data.city))return data}):Products=datas
    const totalProductsCount=await JobSeeker.countDocuments({status:'Active'});
    if(!Products)
    {
        return res.status(400).json({message:"There are no laborers"})
    }
    res.status(200).json(
        {
            Success:true,
            Total_count:totalProductsCount,
            count:Products.length,
            resPerPage:resultperpage,
            Products

        })
})

//getone laborer /laborer/:id
const getLaborer=asyncHandler(async(req,res)=>{
    const Product=await JobSeeker.findOne({_id:req.params.id}).exec()

    if(!Product)
    {
        return res.status(400).json({message:"There are no product to find"})
    }
    res.status(200).json({
        success:true,
        product:Product
    })
})
//create review  /laborer/:id/addreview
const addReview=asyncHandler(async(req,res,next)=>{
   /*  const productId=req.params.id
    const user=req.user.id
    const {rating,comment}=req.body

    const review={user,rating,comment}
    if(user===productId)return res.status(400).json({message:"you can't review yourself"})

    const Product=await JobSeeker.findById(productId).exec()
    const isReviewed=Product.reviews.find(review=>{
        return review.user.toString()===user.toString()
    })
    if(isReviewed){
        //updating the  review
        Product.reviews.forEach(review => {
            if(review.user.toString() === user.toString()){
                review.comment = comment
                review.rating = rating
                review.date=Date.now()
            }

        })

    }else{
        //creating the review
        Product.reviews.push(review)
        Product.numOfReviews = Product.reviews.length;
    }
//find the average of the product reviews
    Product.ratings = Product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / Product.reviews.length;
    Product.ratings = isNaN(Product.ratings)?0:Product.ratings;
    
    await Product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        Product
    }) */

    const productId=req.params.id
    const user=req.user.id
    const {rating,comment}=req.body

    let review;
    if(req.user.role==='Google User')review={user:{googleUser:user},rating,comment}
    else review={user:{normal:user},rating,comment}

    if(user===productId)return res.status(400).json({message:"you can't review yourself"})

    
    const Product=await JobSeeker.findById(productId).exec()
    const isReviewed=Product.reviews.find(review=>{
        return review.user.normal?.toString()===user.toString()||review.user.googleUser?.toString()===user.toString()
    })
    console.log(isReviewed)

    if(isReviewed){
        //updating the  review
        Product.reviews.forEach(review => {
            if(review.user.normal?.toString() === user.toString()){
                review.comment = comment
                review.rating = rating
                review.date=Date.now()
            }
            else if(review.user.googleUser?.toString()===user.toString()){
                review.comment = comment
                review.rating = rating
                review.date=Date.now()
            }

        })

    }else{
        //creating the review
        Product.reviews.push(review)
        Product.numOfReviews = Product.reviews.length;
    }
//find the average of the product reviews
    Product.ratings = Product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / Product.reviews.length;
    Product.ratings = isNaN(Product.ratings)?0:Product.ratings;
    
    await Product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        Product,
        count:Product.numOfReviews
        
    })
})
//get all Reviews /laborer/:id/reviews
const getAllReviews=asyncHandler(async(req,res,next)=>{
    const Product=await JobSeeker.findById({_id:req.params.id}).populate({
        path:'reviews.user.normal',
        select:'firstname lastname profile role'
    }).populate({
        path:'reviews.user.googleUser',
        select:'name profile role'
    });
    res.status(200).json(
        {
            success:true,
            noOfReview:Product.numOfReviews,
            reviews:Product.reviews
        }
    )
})

//delete review /laborer/:id/deletereview
const deleteReview=asyncHandler(async(req,res,next)=>{
    const Product =await JobSeeker.findById(req.params.id)

    /* const reviews=Product.reviews.filter(review=>{
        return review.user.toString()!==req.user.id.toString()
    }) */

    const reviews = Product.reviews?.filter((review) => {
        const normalUserId = review.user.normal?.toString();
        const googleUserId = review.user.googleUser?.toString();
        const reqUserId = req.user.id?.toString();
      
        return normalUserId !== reqUserId && googleUserId !== reqUserId;
      });

    //number of reviews
    const numOfReviews=reviews.length

     //finding the average with the filtered reviews
     let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    await JobSeeker.findByIdAndUpdate(req.params.id, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
       
    })
})

module.exports={
    getLaborers,
    getAllReviews,
    addReview,
    deleteReview,
    getLaborer
}