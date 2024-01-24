const product =require('../models/productModel')
const asyncHandler=require('express-async-handler')
const apiFeatures = require('../util/apiFeatures')
const fs=require('fs').promises
const path=require('path')

//fetch all Data -> /product
const getAll=asyncHandler(async(req,res)=>{
    const resultperpage=8;
    const apifeature=new apiFeatures(product.find({status:'Active'}).populate('owner','shopName address phone location'),req.query)
      apifeature.search();
      await apifeature.filter('product');
      apifeature.paginate(resultperpage);   
    const Products=await apifeature.query
    const totalProductCount=await product.countDocuments({status:'Active'});
    if(!Products)
    {
        return res.status(400).json({message:"There are no Products"})
    }
    res.status(200).json(
        {
            Success:true,
            Total_count:totalProductCount,
            count:Products.length,
            resPerPage:resultperpage,
            Products

        })
})

//get all renting product /products/rent
const getRent=asyncHandler(async(req,res)=>{
    const resultperpage=8;
    const apifeature=new apiFeatures(product.find({status:'Active',type:'rent'}).populate('owner','shopName address phone location'),req.query)
      apifeature.search();
      await apifeature.filter('product');
      apifeature.paginate(resultperpage);   
    const Products=await apifeature.query
    const totalProductCount=await product.countDocuments({status:'Active'});
    if(!Products)
    {
        return res.status(400).json({message:"There are no Products"})
    }
    res.status(200).json(
        {
            Success:true,
            Total_count:totalProductCount,
            count:Products.length,
            resPerPage:resultperpage,
            Products

        })
})
//get all selling product /products/sell
const getSell=asyncHandler(async(req,res)=>{
    const resultperpage=8;
    const apifeature=new apiFeatures(product.find({status:'Active',type:'sell'}).populate('owner','shopName address phone location'),req.query)
      apifeature.search();
      await apifeature.filter('product');
      apifeature.paginate(resultperpage);   
    const Products=await apifeature.query
    const totalProductCount=await product.countDocuments({status:'Active'});
    if(!Products)
    {
        return res.status(400).json({message:"There are no Products"})
    }
    res.status(200).json(
        {
            Success:true,
            Total_count:totalProductCount,
            count:Products.length,
            resPerPage:resultperpage,
            Products

        })
})


//create a new product  -> /product/new
const createProduct=asyncHandler(async(req,res)=>{      
    // Check for duplicate username
    const duplicate = await product.findOne({name:req.body.name,owner:req.user._id}).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate name' })
    }
    
    let images=[];
    if(req.files.length>0)
    {
        req.files.forEach(file=>{
            let url=`${process.env.BACK_END_URL}/uploads/products/${file.filename}`
            images.push({image:url})
        })
    }
    req.body.images=images;
    //add the user id to the seller filed
    req.body.owner=req.user.id
    const Product=await product.create(req.body)
    if(!product)
    {
        return res.status(400).json({message:"There is no product to create"})

    }
    else{
        res.status(201).json({
            success:true,
            Product
        })
    } 

    
})
//update a product  -> /product/:id/edit
const updateProduct=asyncHandler(async(req,res)=>{

    try {
        //find data
        const Product=await product.findOne({_id:req.params.id}).populate('owner','shopName address phone location').exec()
        if(!Product)
        {
            return res.status(400).json({message:"There are no product to update"})
        }
         // Check for duplicate 
         const duplicate = await product.findOne({ name:req.body.name}).lean().exec()

         // Allow updates to the original user 
         if (duplicate && duplicate?._id.toString() !== req.params.id) {
             return res.status(409).json({ message: 'Duplicate username' })
         }
         const oldImages=Product.images;
         let images=[];
        if(req.files.length>0)
        {
            req.files.forEach(file=>{
                let url=`${process.env.BACK_END_URL}/uploads/products/${file.filename}`
                images.push({image:url})
            })
        }
        req.body.images=images;
  
        const data =await product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
         })
         
       
        // delete the stored image if the new image is different
        if (oldImages && req.body.images) {
            oldImages.forEach(async image=>{
                const oldImageFilename = path.basename(new URL(image.image).pathname);
                console.log(oldImageFilename)
                const oldImageFilePath = path.join(__dirname,'..','uploads', 'products', oldImageFilename);
                // Check if the file exists before attempting to delete
                try {
                  await fs.access(oldImageFilePath);
                  // Delete the old file
                  await fs.unlink(oldImageFilePath);
                } catch (error) {
                  console.error('Error deleting old image image:', error.message);
                }
            })
            
        }

        res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
          })
    }
})
//Delete a product  -> /product/:id/delete
const deleteProduct=asyncHandler(async(req,res)=>{
    const Product=await product.findOne({_id:req.params.id}).exec()
    if(!Product)
    {
        return res.status(400).json({message:"There are no product to delete"})
    }
    const oldImages=Product.images;
    
    const deletedData=await Product.deleteOne()
    // delete the stored image if the new image is different
    if (oldImages) {
        oldImages.forEach(async image=>{
            const oldImageFilename = path.basename(new URL(image.image).pathname);
            console.log(oldImageFilename)
            const oldImageFilePath = path.join(__dirname,'..','uploads', 'products', oldImageFilename);
            // Check if the file exists before attempting to delete
            try {
              await fs.access(oldImageFilePath);
              // Delete the old file
              await fs.unlink(oldImageFilePath);
            } catch (error) {
              console.error('Error deleting old image image:', error.message);
            }
        })
        
    }
    
    res.status(200).json(deletedData)
})
//get one product  -> /product/:id
const getOne=asyncHandler(async(req,res)=>{
    const Product=await product.findOne({_id:req.params.id}).populate('owner','shopName address phone email location').exec()

    if(!Product)
    {
        return res.status(400).json({message:"There are no product to find"})
    }
    res.status(200).json({
        success:true,
        product:Product
    })
})

//create review  /product/:id/addreview
const addReview=asyncHandler(async(req,res,next)=>{
    const productId=req.params.id
    const user=req.user.id
    const {rating,comment}=req.body

    const review={user,rating,comment}

    const Product=await product.findById(productId).populate('owner','shopName address phone email location').exec()
    if(user===Product.owner.id)return res.status(400).json({message:"you can't review your product yourself"})
    const isReviewed=Product.reviews.find(review=>{
        return review.user.toString()===user.toString()
    })
    console.log(isReviewed)

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
    })
})

//get all Reviews /product/:id/reviews
const getAllReviews=asyncHandler(async(req,res,next)=>{
    const Product=await product.findById({_id:req.params.id}).populate('reviews.user','firstname lastname profile');
    res.status(200).json(
        {
            success:true,
            noOfReview:Product.numOfReviews,
            reviews:Product.reviews
        }
    )
})

//delete review /product/:id/deletereview
const deleteReview=asyncHandler(async(req,res,next)=>{
    const Product =await product.findById(req.params.id)

    const reviews=Product.reviews.filter(review=>{
        return review.user.toString()!==req.user.id.toString()
    })
    //number of reviews
    const numOfReviews=reviews.length

     //finding the average with the filtered reviews
     let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    await product.findByIdAndUpdate(req.params.id, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true       
    })
})

//get all items which are posted by one product owner  /myProducts
const getUserproducts=asyncHandler(async(req,res)=>{
    const resultperpage=8;
    const apifeature=new apiFeatures(product.find({owner:req.user._id}).populate('owner','shopName address phone location'),req.query)
      apifeature.search();
      await apifeature.filter('product');
      apifeature.paginate(resultperpage);   
    const Products=await apifeature.query
   

    if(!Products || Products.length === 0)
    {
        return res.status(400).json({message:"There are no Products"})
    }
    // Filter active products from the retrieved Products
    const activeProducts = Products.filter(product => product.status === 'Active');

    res.status(200).json(
        {
            Success:true,
            count:Products.length,
            ActiveProducts:activeProducts.length,
            DeactiveProducts:(Products.length-activeProducts.length),
            Products
        })
})

//Delete user's all products
const deleteUserAllProducts=asyncHandler(async(req,res)=>{
    const Products=await product.find({owner:req.user.id}).exec()
    if(!Products)
    {
        return res.status(400).json({message:"There are users no product to delete"})
    }
    
    const deletedData=await product.deleteMany({owner:req.user.id})
    return res.status(200).json({
        success:true,
        deletedCount:deletedData.result.deletedCount
    })
    
    
})

module.exports={
    getAll,
    getSell,
    getRent,
    createProduct,
    updateProduct,
    deleteProduct,
    getOne,
    addReview,
    getAllReviews,
    deleteReview,
    getUserproducts,
    deleteUserAllProducts
}
