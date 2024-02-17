
import {clearError, deleteAllProductsFail, deleteAllProductsRequest, deleteAllProductsSuccess, getTotal_per_monthFail, getTotal_per_monthRequest, getTotal_per_monthSuccess, myProductsFail, myProductsRequest, myProductsSuccess, productsFail, productsRequest, productsSuccess } from "../slices/productsSlice"
import axios from 'axios'

export const getProducts=(keyword, price, category, rating,city,district, currentPage,model)=>async(dispatch)=>{
    
    try {
        
        dispatch(productsRequest())
        let link=`http://192.168.195.148:4500/SiteSupplyCraft/${model}?page=${currentPage}`

        if(keyword)link+=`&keyword=${keyword}`
        if(category)link+=`&${model==='products'||model==='products/sell'||model==='products/rent'?'category':'job'}=${category}`
        if(rating)link+=`&ratings[gte]=${rating}`
        if(district)link+=`&district=${district}`
        if(city)link+=`&city=${city}`
        if(price)link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`

        const {data} = await axios.get(link)
        console.log("result:- "+data)
        dispatch(productsSuccess(data))
        
        
    }catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching data';
        dispatch(productsFail(errorMessage));
    }

}

export const clearProductsError=(dispatch)=>{
    dispatch(clearError())
}

export const getOwnerProducts=(keyword)=>async(dispatch)=>{
    
    try {
        dispatch(myProductsRequest())
        let link=`/SiteSupplyCraft/myProducts?`

        if(keyword)link+=`keyword=${keyword}`

        /* if(category)link+=`&${model==='products'||model==='products/sell'||model==='products/rent'?'category':'job'}=${category}`
        if(rating)link+=`&ratings[gte]=${rating}`
        if(district)link+=`&district=${district}`
        if(city)link+=`&city=${city}`
        if(price)link += `&price[gte]=${price[0]}&price[lte]=${price[1]}` */

        const {data} = await axios.get(link)
        dispatch(myProductsSuccess(data))
        
    } catch (error) {
        dispatch(myProductsFail(error.response.data.message))
    }

}

export const deleteAllMyProduct=async(dispatch)=>{
    try {
        dispatch(deleteAllProductsRequest())
        const {data}=await axios.delete(`/SiteSupplyCraft/product/deleteAll`)
        dispatch(deleteAllProductsSuccess(data))        
    } catch (error) {
        dispatch(deleteAllProductsFail(error.response.data.message))

    }
}
export const getTotal_per_month=async(dispatch)=>{
    try {
        dispatch(getTotal_per_monthRequest())
        const {data}=await axios.get(`/SiteSupplyCraft/myProducts/count`)
        dispatch(getTotal_per_monthSuccess(data))        
    } catch (error) {
        dispatch(getTotal_per_monthFail(error.response.data.message))

    }
}




