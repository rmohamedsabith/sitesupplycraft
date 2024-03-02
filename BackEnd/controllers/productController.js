const product =require('../models/productModel')
const asyncHandler=require('express-async-handler')
const apiFeatures = require('../util/apiFeatures')
const fs=require('fs').promises
const path=require('path')
const mongoose= require('mongoose')

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
    const {name} = req.body; // Extract the name from req.body
        console.log(name)
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const upperCaseName = name.toUpperCase();
    const duplicate = await product.findOne({name:upperCaseName,owner:req.user._id}).lean().exec()
    //console.log(duplicate)
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
/* const createProduct = asyncHandler(async(req, res) => {
    // Check if the request body contains an array of products
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: 'Request body must be an array of products' });
    }


    const products = req.body.map(async (productData) => {
        // Check for duplicate product name for each product
        const duplicate = await product.findOne({ name: productData.name, owner: req.user._id }).lean().exec();
        if (duplicate) {
            return { error: `Duplicate name for product '${productData.name}'` };
        }

        let images = [];
        if (productData.images && productData.images.length > 0) {
            productData.images.forEach(file => {
                let url = `${process.env.BACK_END_URL}/uploads/products/${file.filename}`;
                images.push({ image: url });
            });
        }
        productData.images = images;
        // Add the user id to the owner field
        productData.owner = req.user.id;

        const newProduct = await product.create(productData);
        if (!newProduct) {
            return { error: `Failed to create product '${productData.name}'` };
        }
        return newProduct;
    });

    Promise.all(products).then(createdProducts => {
        const errors = createdProducts.filter(product => product.error);
        if (errors.length > 0) {
            return res.status(409).json({ errors });
        }
        res.status(201).json({
            success: true,
            products: createdProducts
        });
    }).catch(err => {
        console.error('Error creating products:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}); */


//create a new product  -> /product/duplicate
const checkDuplicate = asyncHandler(async (req, res) => {      
    try {
        const {name} = req.body; // Extract the name from req.body
        console.log(name)
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const upperCaseName = name.toUpperCase();
        // Check for duplicate product name
        const duplicateProduct = await product.findOne({ name: upperCaseName, owner: req.user._id }).lean().exec();
        //console.log(duplicateProduct);
        if (duplicateProduct) {
            return res.status(200).json({ duplicate: true, message: 'Duplicate name' });
        }
        return res.status(200).json({ duplicate: false, message: 'There is no duplicate name' });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error); // Internal Server Error
    }
});




//update a product  -> /product/:id/edit
const updateProduct=asyncHandler(async(req,res)=>{

    try {
        //find data
        const Product=await product.findOne({_id:req.params.id}).populate('owner','shopName address phone location').exec()
        if(!Product)
        {
            return res.status(400).json({message:"There are no product to update"})
        }
        if(req.body.name)
        {
                // Check for duplicate 
            const duplicate = await product.findOne({ name:req.body.name}).lean().exec()

            // Allow updates to the original user 
            if (duplicate && duplicate?._id.toString() !== req.params.id) {
                return res.status(409).json({ message: 'Duplicate username' })
            }
        }
         const oldImages=Product.images;
         let images=[];
         /* req.images.forEach(item => {
            if (typeof item === 'string') {
                images.push(item);
            }
          }); */
            if(req.files?.length>0)
            {
                req.files.forEach(file=>{
                    let url=`${process.env.BACK_END_URL}/uploads/products/${file.filename}`
                    images.push({image:url})
                })
                req.body.images=images; 
            }
                   
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
            Product:data
        })
    } catch (error) {
        console.log(error)
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
    console.log(Product.createdAt.getMonth())
    console.log(Product.createdAt)
    if(!Product)
    {
        return res.status(400).json({message:"There are no product to find"})
    }
    res.status(200).json({
        success:true,
        product:Product
    })
})

//change status /product/:id/changeStatus
const changeStatus=asyncHandler(async(req,res)=>{
    const p=await product.findOneAndUpdate({_id:req.params.id},{status:req.body.status}).populate('owner','shopName address phone email location').exec()
    const Product=await product.findOne({_id:req.params.id}).populate('owner','shopName address phone email location').exec()
    res.status(200).json({
        Product
    })
})
//create review  /product/:id/addreview
const addReview=asyncHandler(async(req,res,next)=>{
    const productId=req.params.id
    const user=req.user.id
    const {rating,comment}=req.body

    let review;
    if(req.user.role==='Google User')review={user:{googleUser:user},rating,comment}
    else review={user:{normal:user},rating,comment}

    const Product=await product.findById(productId).populate('owner','shopName address phone email location').exec()
    if(user===Product.owner.id)return res.status(400).json({message:"you can't review your product yourself"})
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

//get all Reviews /product/:id/reviews
const getAllReviews=asyncHandler(async(req,res,next)=>{
    const Product=await product.findById({_id:req.params.id}).populate({
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

//delete review /product/:id/deletereview
const deleteReview=asyncHandler(async(req,res,next)=>{
    let Product =await product.findById(req.params.id)

    
    const reviews = Product.reviews?.filter((review) => {
        const normalUserId = review.user.normal?.toString();
        const googleUserId = review.user.googleUser?.toString();
        const reqUserId = req.user.id?.toString();
      
        return normalUserId !== reqUserId && googleUserId !== reqUserId;
      });
    //number of reviews
    const numOfReviews=reviews?.length

     //finding the average with the filtered reviews
     let ratings = reviews?.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews?.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    Product=await product.findByIdAndUpdate(req.params.id, {
        reviews,
        numOfReviews,
        ratings
    })

    Product=await product.findById(req.params.id)

    res.status(200).json({
        success: true ,
        Product       
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

//get product owner's products count according to month /myProducts/count
const getTotal_per_month=asyncHandler(async(req,res)=>{
    try {
        const Products=await product.find({owner:req.user._id}).populate('owner','shopName address phone email location').exec()
    let data={
        "January": 0,
        "February": 0,
        "March": 0,
        "April": 0,
        "May": 0,
        "June": 0,
        "July": 0,
        "August": 0,
        "September": 0,
        "October": 0,
        "November": 0,
        "December": 0
      }
    Products.map((item)=>{
        switch(item.createdAt.getMonth())
        {
            case 0:{
                data['January']++;
                break;
            }
            case 1:{
                data['February']++;
                break;
            }
            case 2:{
                data['March']++;
                break;
            }
            case 3:{
                data['April']++;
                break;
            }
            case 4:{
                data['May']++;
                break;
            }
            case 5:{
                data['June']++;
                break;
            }
            case 6:{
                data['July']++;
                break;
            }
            case 7:{
                data['August']++;
                break;
            }
            case 8:{
                data['September']++;
                break;
            }
            case 9:{
                data['October']++;
                break;
            }
            case 10:{
                data['November']++;
                break;
            }
            case 11:{
                data['December']++;
                break;
            }
        }
        
    })

    return res.status(200).json({
        success:true,
        data

    })
    } catch (error) {
        return res.status(409).json({
            success:false,
            error:error.message
    
        })
    }
    

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
    deleteUserAllProducts,
    changeStatus,
    getTotal_per_month,
    checkDuplicate
}
