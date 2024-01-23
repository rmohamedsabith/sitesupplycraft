

import axios from 'axios'
import { addReviewFail, addReviewRequest, addReviewSuccess,productFail, productRequest, productSuccess, reviewsFail, reviewsRequest, reviewsSuccess } from '../slices/productSlice'

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




