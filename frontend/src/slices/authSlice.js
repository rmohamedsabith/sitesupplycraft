import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isLoading:false,
        isAuthenticated:false,
        message:null,
    },
    reducers:{
        registerRequest(state,action){
            return{
                ...state,
                isLoading:true,
                isAuthenticated:false
            }
        },
        registerSuccess(state,action){
            return{
                isLoading:false,
                isAuthenticated:true,
                user:action.payload.USER,
                message:action.payload.message
            }
        },
        registerFail(state,action){
            return{
                ...state,
                isLoading:false,
                isAuthenticated:false,
                error:action.payload
            }
        },
        loginRequest(state,action){
            return{
                ...state,
                isLoading:true,
                isAuthenticated:false
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
                isAuthenticated:false,
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
                error:null,
                message:null,
                ispasswordChanged:false,
                isUpdated:false
            }
        },
        clearMessage(state,action){
            return{
                ...state,
                message:null,
                ispasswordChanged:false
            }
        },
        loadUserRequest(state,action){
            return{
                ...state,
                isLoading:true,
                isAuthenticated:false,
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
                isAuthenticated:false,
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
                isAuthenticated:false,
                
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
                isAuthenticated:false,
                error:action.payload
            }
        },
        deleteProfileRequest(state,action){
            return {
                ...state,
                isLoading:true,
            }
        },
        deleteProfileSuccess(state,action){
            return{
                isLoading:false, 
                user:action.payload.user ,
                isAuthenticated:false          
            }
        },
        deleteProfileFail(state,action){
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
        updateProfileRequest(state,action){
            return {
                ...state,
                isLoading:true}
        },
        updateProfileSuccess(state,action){
            return{
                ...state,
                isLoading:false,  
                user:action.payload.user ,
                isUpdated:true          
            }
        },
        updateProfileFail(state,action){
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
       changePasswordRequest(state,action){
            return {
                ...state,
                isLoading:true,
                
            }
        },
       changePasswordSuccess(state,action){
            return{
                ...state,
                isLoading:false,  
                user:action.payload.user ,
                ispasswordChanged:true          
            }
        },
       changePasswordFail(state,action){
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
       verifyEmailRequest(state,action){
            return {
                ...state,
                isLoading:true}
        },
       verifyEmailSuccess(state,action){
            return{
                ...state,
                isLoading:false,  
                user:action.payload.USER,
                message:action.payload.message
                        
            }
        },
       verifyEmailFail(state,action){
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
       resendEmailRequest(state,action){
            return {
                ...state,
                isLoading:true}
        },
       resendEmailSuccess(state,action){
            return{
                ...state,
                isLoading:false, 
                message:action.payload.message
                        
            }
        },
       resendEmailFail(state,action){
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
       changeEmailRequest(state,action){
            return {
                ...state,
                isLoading:true}
        },
       changeEmailSuccess(state,action){
            return{
                ...state,
                isLoading:false,  
                user:action.payload.USER,
                message:action.payload.message
                        
            }
        },
       changeEmailFail(state,action){
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        },


    }
})

const{actions,reducer}=authSlice;
export const{
   verifyEmailRequest,
   verifyEmailSuccess,
   verifyEmailFail,
   changeEmailRequest,
   changeEmailSuccess,
   changeEmailFail,
   resendEmailRequest,
   resendEmailSuccess,
   resendEmailFail,
   changePasswordRequest,
   changePasswordSuccess,
   changePasswordFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    deleteProfileRequest,
    deleteProfileSuccess,
    deleteProfileFail,
    registerRequest,
    registerSuccess,
    registerFail,
    loginRequest,
    loginSuccess,
    loginFail,
    clearMessage,
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