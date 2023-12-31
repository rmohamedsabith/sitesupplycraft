
import{loginFail, loginRequest, loginSuccess,clearError, loadUserRequest, loadUserSuccess, loadUserFail, logoutSuccess, logoutFail, forgetPasswordRequest, forgetPasswordSuccess, forgetPasswordFail, resetPasswordRequest, resetPasswordSuccess, resetPasswordFail} from '../slices/authSlice'
import axios from 'axios'

export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch(loginRequest())
        const{data}=await axios.post('/SiteSupplyCraft/login',{email,password})
        dispatch(loginSuccess(data))
    }
    catch(err)
    {
        dispatch(loginFail(err.response.data.message))
    }
}
export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const loadUser=async(dispatch)=>{
    try {
        dispatch(loadUserRequest())
        const {data}=await axios.get('/SiteSupplyCraft/myprofile')
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}

export const logout=async(dispatch)=>{
    try {
        await axios.get('/SiteSupplyCraft/logout')
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail(error.response.data.message))
    }
}

export const forgetPassword=(email)=>async(dispatch)=>{
    try {
        dispatch(forgetPasswordRequest())
        const{data}=await axios.post('/SiteSupplyCraft/password/forgot',{email})
        dispatch(forgetPasswordSuccess(data))
    } catch (error) {
        dispatch(forgetPasswordFail(error.response.data.message))
    }
}

export const resetPassword=(token,password,confirmPassword)=>async(dispatch)=>{
    try {
        dispatch(resetPasswordRequest())
        const {data}=await axios.put(`/SiteSupplyCraft/password/reset/${token}`,{password,confirmPassword})
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
}