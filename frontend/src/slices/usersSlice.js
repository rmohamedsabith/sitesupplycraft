import { createSlice } from "@reduxjs/toolkit";

const usersSlice=createSlice({
    name:"users",
    initialState:{
        isLoading:false,
        success:false,
        isDeleted:false
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