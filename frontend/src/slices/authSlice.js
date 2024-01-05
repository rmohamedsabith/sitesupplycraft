import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isLoading:false,
        isAuthenticated:false
    },
    reducers:{
        loginRequest(state,action){
            return{
                ...state,
                isLoading:true
            }
        },
        loginSuccess(state,action){
            return{
                isLoading:false,
                isAuthenticated:true,
                user:action.payload.USER
            }
        },
        loginFail(state,action){
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
        logoutSuccess(state, action){
            return {
                isLoading: false,
                isAuthenticated: false,
            }
        },
        logoutFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                user:null,
                error:null
            }
        },
        loadUserRequest(state,action){
            return{
                ...state,
                isLoading:true,
            }
        },
        loadUserSuccess(state,action){
            return{
                isLoading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },
        loadUserFail(state,action){
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
        
        forgetPasswordRequest(state,action){
            return{
                ...state,
                isLoading:true,
                message:null
            }
        },
        forgetPasswordSuccess(state,action){
            return{
                ...state,
                isLoading:false,
                message:action.payload.message
            }
        },
        forgetPasswordFail(state,action){
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
        resetPasswordRequest(state,action){
            return{
                ...state,
                isLoading:true,
                
            }
        },
        resetPasswordSuccess(state,action){
            return{
                ...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload.USER
            }
        },
        resetPasswordFail(state,action){
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        },


    }
})

const{actions,reducer}=authSlice;
export const{
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    forgetPasswordRequest,
    forgetPasswordSuccess,
    forgetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
}=actions
export default reducer