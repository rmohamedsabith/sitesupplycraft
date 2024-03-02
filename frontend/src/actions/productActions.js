import axios from 'axios'
import { addProductFail, addProductRequest, addProductSuccess, addReviewFail, addReviewRequest, addReviewSuccess,changeStatusFail,changeStatusRequest,changeStatusSuccess,deleteProductFail,deleteProductRequest,deleteProductSuccess,productFail, productRequest, productSuccess, reviewsFail, reviewsRequest, reviewsSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from '../slices/productSlice'

export const getProduct=(id,model)=>async(dispatch)=>{
    try {
        dispatch(productRequest())
        const {data}=await axios.get(`/SiteSupplyCraft/${model}/${id}`)
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response.data.message))
    }
}
export const reviews =(id,model)=>async(dispatch)=>{
    try {
        dispatch(reviewsRequest())
        const {data}=await axios.get(`/SiteSupplyCraft/${model}/${id}/reviews`)
        dispatch(reviewsSuccess(data))
    } catch (error) {
        dispatch(reviewsFail(error.response.data.message))
    }
}
export const addReview=(id,rating,comment,model)=>async(dispatch)=>{

    try {
        dispatch(addReviewRequest())
        const config={
            Headers:{
                'Content-type': 'application/json'
            }
        }
        const {data}=await axios.put(`/SiteSupplyCraft/${model}/${id}/addreview`,{rating,comment},config)
        dispatch(addReviewSuccess(data))
    } catch (error) {
        dispatch(addReviewFail(error.response.data.message))
    }
}
export const addProduct=productData=>async(dispatch)=>{
    try {
        dispatch(addProductRequest())
        const {data}=await axios.post(`/SiteSupplyCraft/product/new`,productData)
        dispatch(addProductSuccess(data))   
        console.log(data)     
    } catch (error) {
        dispatch(addProductFail(error.response.data.message))

    }
}
export const updateProduct=(id,formData)=>async(dispatch)=>{
    try {
        dispatch(updateProductRequest())
        const {data}=await axios.put(`/SiteSupplyCraft/product/${id}/edit`,formData)
        dispatch(updateProductSuccess(data))        
    } catch (error) {
        dispatch(updateProductFail(error.response.data.message))

    }
}
export const deleteProduct=id=>async(dispatch)=>{
    try {
        dispatch(deleteProductRequest())
        const {data}=await axios.delete(`/SiteSupplyCraft/product/${id}/delete`)
        dispatch(deleteProductSuccess(data))        
    } catch (error) {
        dispatch(deleteProductFail(error.response.data.message))

    }
}
export const changeStatus=(id,status)=>async(dispatch)=>{
    try {
        dispatch(changeStatusRequest())
        const {data}=await axios.put(`/SiteSupplyCraft/product/${id}/changeStatus`,{status})
        dispatch(changeStatusSuccess(data))        
    } catch (error) {
        dispatch(changeStatusFail(error.response.data.message))

    }
}







