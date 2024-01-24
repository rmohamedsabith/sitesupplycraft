import { createSlice } from "@reduxjs/toolkit";

const productsSlice=createSlice({
    name:"products",
    initialState:{
        isLoading:false
    },
    reducers:{
        productsRequest(state,action){
            return {isLoading:true}
        },
        productsSuccess(state,action){
            return{
                isLoading:false,
                products:action.payload.Products,
                count:action.payload.count,
                totalCount:action.payload.Total_count,
                resPerPage:action.payload.resPerPage
            }
        },
        productsFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        myProductsRequest(state,action){
            return {isLoading:true}
        },
        myProductsSuccess(state,action){
            return{
                isLoading:false,
                products:action.payload.Products,
                count:action.payload.count,
                ActiveProducts:action.payload.ActiveProducts,
                DeactiveProducts:action.payload.DeactiveProducts
            }
        },
        myProductsFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },

        //Delete all my products
        deleteAllMyProductsRequest(state,action){
            return {isLoading:true}
        },
        deleteAllMyProductsSuccess(state,action){
            return{
                isLoading:false,
                deletedCount:action.payload.deletedCount
            }
        },
        deleteAllMyProductsFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },
        clearProducts(state,action){
            return{
                ...state,
                isLoading:false,
                products:null,
                count:null,
                totalCount:null,
                resPerPage:null}
        },
       

    }
});

const {actions,reducer}=productsSlice;

export const{
    productsRequest,
    productsSuccess,
    productsFail,
    myProductsRequest,
    myProductsSuccess,
    myProductsFail,
    deleteAllProductsRequest,
    deleteAllProductsSuccess,
    deleteAllProductsFail,
    clearError,
    clearProducts,
}=actions

export default reducer