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
                error:action.payload.error
            }
        },
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },
        clearProducts(state,action){
            return{isLoading:false,
                products:null,
                count:null,
                totalCount:null,
                resPerPage:null}
        }
    }
});

const {actions,reducer}=productsSlice;

export const{
    productsRequest,
    productsSuccess,
    productsFail,
    clearError,
    clearProducts
}=actions

export default reducer