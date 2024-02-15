import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{
        isLoading:false,
        product: {},
        reviews: [],
        isReviewSubmitted:false,
        isProductAdded:false,
        isReviewDeleted:false,
        isProductDeleted:false
    },
    reducers:{
       
       
        clearProduct(state,action){
            return{
                ...state,
                isLoading:false,
                product:{},
                }
        },

        //One product
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

        //Add product
        addProductRequest(state,action)
        {
            return{
                ...state,
                isLoading:true
            }
        },
        addProductSuccess(state,action){
            return{
                isLoading:false,
                isProductAdded:true,
                product:action.payload.Product,
            }
        },
        addProductFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        
        //Delete product
        deleteProductRequest(state,action)
        {
            return{
                ...state,
                isLoading:true
            }
        },
        deleteProductSuccess(state,action){
            return{
                isLoading:false,
                isProductDeleted:true,
            }
        },
        deleteProductFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },

        //One Product Reviews
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

        //Add Review
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

        //Delete Review
        deleteReviewRequest(state, action){
            return {
                ...state,
                isLoading: true
            }
        },
        deleteReviewSuccess(state, action){
            return {
                ...state,
                isLoading: false,
                isReviewDeleted:true,
                product:action.payload.Product
            }
        },
        deleteReviewFail(state, action){
            return {
                ...state,
                isLoading: false,
                error:  action.payload
            }
        },
        //Change Status
        changeStatusRequest(state, action){
            return {
                ...state,
                isLoading: true
            }
        },
        changeStatusSuccess(state, action){
            return {
                ...state,
                isLoading: false,
                product:action.payload.Product
            }
        },
        changeStatusFail(state, action){
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
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    addReviewRequest,
    addReviewSuccess,
    addReviewFail,
    clearReviewSubmitted,
    clearProduct,
    addProductRequest,
    addProductSuccess,
    addProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    changeStatusRequest,
    changeStatusSuccess,
    changeStatusFail,
}=actions

export default reducer