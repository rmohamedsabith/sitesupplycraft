import { createSlice } from "@reduxjs/toolkit";

const usersSlice=createSlice({
    name:"users",
    initialState:{
        isLoading:false,
        success:false,
        isDeleted:false,
        isUpdated:false
    },
    reducers:{
        addFavouriteRequest(state,action){
            return {isLoading:true}
        },
        addFavouriteSuccess(state,action){
            return{
                isLoading:false,
                success:true                
            }
        },
        addFavouriteFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        deleteOneRequest(state,action){
            return {isLoading:true}
        },
        deleteOneSuccess(state,action){
            return{
                isLoading:false,
                isDeleted:true                
            }
        },
        deleteOneFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        deleteAllRequest(state,action){
            return {isLoading:true}
        },
        deleteAllSuccess(state,action){
            return{
                isLoading:false,
                isDeleted:true                
            }
        },
        deleteAllFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        getProcessingRequest(state,action){
            return {isLoading:true}
        },
        getProcessingSuccess(state,action){
            return{
                isLoading:false,
                data:action.payload.data,
                count:action.payload.count               
            }
        },
        getProcessingFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        cancelAccountRequest(state,action){
            return {isLoading:true}
        },
        cancelAccountSuccess(state,action){
            return{
                isLoading:false,            
            }
        },
        cancelAccountFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        viewProcessingRequest(state,action){
            return {isLoading:true}
        },
        viewProcessingSuccess(state,action){
            return{
                isLoading:false, 
                data:action.payload.data           
            }
        },
        viewProcessingFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
        verifyAccountRequest(state,action){
            return {isLoading:true}
        },
        verifyAccountSuccess(state,action){
            return{
                isLoading:false, 
                user:action.payload.user           
            }
        },
        verifyAccountFail(state,action){
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
        clearData(state,action){
            return{
                ...state,
                success:false,
                isDeleted:false,
            }
        } 
    }
});

const {actions,reducer}=usersSlice;

export const{
    verifyAccountRequest,
    verifyAccountSuccess,
    verifyAccountFail,
    viewProcessingRequest,
    viewProcessingSuccess,
    viewProcessingFail,
    cancelAccountRequest,
    cancelAccountSuccess,
    cancelAccountFail,
    getProcessingRequest,
    getProcessingSuccess,
    getProcessingFail,
    deleteAllRequest,
    deleteAllSuccess,
    deleteAllFail,
    deleteOneRequest,
    deleteOneSuccess,
    deleteOneFail,
    addFavouriteRequest,
    addFavouriteSuccess,
    addFavouriteFail,
    clearError,
    clearData
}=actions

export default reducer