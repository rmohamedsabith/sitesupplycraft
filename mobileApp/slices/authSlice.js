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
                isLoading:true
            }
        },
        registerSuccess(state,action){
            return{
                isLoading:false,
                isAuthenticated:true,
                user:action.payload.USER
            }
        },
        registerFail(state,action){
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
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
        deleteProfileRequest(state,action){
            return {isLoading:true}
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
                isLoading:false,
                error:action.payload
            }
        },
        updateProfileRequest(state,action){
            return {isLoading:true}
        },
        updateProfileSuccess(state,action){
            return{
                isLoading:false,  
                user:action.payload.user ,
                isUpdated:true          
            }
        },
        updateProfileFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
       changePasswordRequest(state,action){
            return {isLoading:true}
        },
       changePasswordSuccess(state,action){
            return{
                isLoading:false,  
                user:action.payload.user ,
                ispasswordChanged:true          
            }
        },
       changePasswordFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
       verifyEmailRequest(state,action){
            return {isLoading:true}
        },
       verifyEmailSuccess(state,action){
            return{
                isLoading:false,  
                user:action.payload.USER,
                message:action.payload.message
                        
            }
        },
       verifyEmailFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
       resendEmailRequest(state,action){
            return {isLoading:true}
        },
       resendEmailSuccess(state,action){
            return{
                isLoading:false,  
                user:action.payload.USER,
                message:action.payload.message
                        
            }
        },
       resendEmailFail(state,action){
            return {
                isLoading:false,
                error:action.payload
            }
        },
       changeEmailRequest(state,action){
            return {isLoading:true}
        },
       changeEmailSuccess(state,action){
            return{
                isLoading:false,  
                user:action.payload.USER,
                message:action.payload.message
                        
            }
        },
       changeEmailFail(state,action){
            return {
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