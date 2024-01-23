import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{
        isLoading:false,
        product: {},
        reviews: [],
        isReviewSubmitted:false
    },
    reducers:{
       
       
        clearProduct(state,action){
            return{
                ...state,
                isLoading:false,
                product:{},
                }
        },
        productRequest(state,action)
        {
            return{
                ...state,
                isLoading:true
            }
        },
        productSuccess(state,action){
            return{
                isLoading:false,
                product:action.payload.product,
            }
        },
        productFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        reviewsRequest(state, action){
            return {
                ...state,
                isLoading: true
            }
        },
        reviewsSuccess(state, action){
            return {
                ...state,
                isLoading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action){
            return {
                ...state,
                isLoading: false,
                error:  action.payload
            }
        },
        addReviewRequest(state, action){
            return {
                ...state,
                isLoading: true
            }
        },
        addReviewSuccess(state, action){
            return {
                ...state,
                isLoading: false,
                isReviewSubmitted:true,
                product:action.payload.Product
            }
        },
        addReviewFail(state, action){
            return {
                ...state,
                isLoading: false,
                error:  action.payload
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
         clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },


    }
});

const {actions,reducer}=productSlice;

export const{
    clearError,
    clearProducts,
    productRequest,
    productSuccess,
    productFail,
    reviewsRequest,
    reviewsSuccess,
    reviewsFail,
    addReviewRequest,
    addReviewSuccess,
    addReviewFail,
    clearReviewSubmitted,
    clearProduct
}=actions

export default reducer