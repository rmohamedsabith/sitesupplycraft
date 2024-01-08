

import axios from 'axios'
import { addReviewFail, addReviewRequest, addReviewSuccess, clearError, productFail, productRequest, productSuccess, reviewsFail, reviewsRequest, reviewsSuccess } from '../slices/productSlice'

export const getProduct=(id)=>async(dispatch)=>{
    try {
        dispatch(productRequest())
        const {data}=await axios.get(`/SiteSupplyCraft/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response.data.message))
    }
}

export const reviews =(id)=>async(dispatch)=>{
    try {
        dispatch(reviewsRequest())
        const {data}=await axios.get(`/SiteSupplyCraft/product/${id}/reviews`)
        dispatch(reviewsSuccess(data))
    } catch (error) {
        dispatch(reviewsFail(error.response.data.message))
    }
}

export const addReview=(id,rating,comment)=>async(dispatch)=>{

    try {
        dispatch(addReviewRequest())
        const config={
            Headers:{
                'Content-type': 'application/json'
            }
        }
        const {data}=await axios.put(`/SiteSupplyCraft/product/${id}/addreview`,{rating,comment},config)
        dispatch(addReviewSuccess(data))
    } catch (error) {
        dispatch(addReviewFail(error.response.data.message))
    }
}




