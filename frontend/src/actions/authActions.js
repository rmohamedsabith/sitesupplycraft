
import{loginFail, loginRequest, loginSuccess,clearError, loadUserRequest, loadUserSuccess, loadUserFail, logoutSuccess, logoutFail, forgetPasswordRequest, forgetPasswordSuccess, forgetPasswordFail, resetPasswordRequest, resetPasswordSuccess, resetPasswordFail, registerRequest, registerSuccess, registerFail, updateProfileRequest, updateProfileSuccess, updateProfileFail, deleteProfileRequest, deleteProfileSuccess, deleteProfileFail, changePasswordRequest, changePasswordSuccess, changePasswordFail, verifyEmailRequest, verifyEmailSuccess, verifyEmailFail, resendEmailRequest, resendEmailSuccess, resendEmailFail, changeEmailRequest, changeEmailSuccess, changeEmailFail} from '../slices/authSlice'
import axios from 'axios'

export const register=(userData)=>async(dispatch)=>{
    
    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type' : 'multipart/form-Data'
            }
        }
        if(userData.role!=='Google User'){
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`/SiteSupplyCraft/registration`,userData, config);
        dispatch(registerSuccess(data))
    }
    else{
        const { data }  = await axios.post(`/SiteSupplyCraft/registration`,userData);
        dispatch(registerSuccess(data))
    }
        
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
}
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
        dispatch(clearError())
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

export const updateProfile=userData=>async(dispatch)=>{
    try {
        dispatch(updateProfileRequest())

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const {data}=await axios.put(`/SiteSupplyCraft/myprofile/edit`,userData,config)
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }

}
export const deleteProfile=async(dispatch)=>{
    try {
        dispatch(deleteProfileRequest())
        const {data}=await axios.delete(`/SiteSupplyCraft/myprofile/delete`)
        dispatch(deleteProfileSuccess(data))
    } catch (error) {
        dispatch(deleteProfileFail(error.response.data.message))
    }

}
export const verifyEmail=token=>async(dispatch)=>{
    try {
        dispatch(verifyEmailRequest())
        const {data}=await axios.put(`/SiteSupplyCraft/email/verify/${token}`)
        dispatch(verifyEmailSuccess(data))
    } catch (error) {
        dispatch(verifyEmailFail(error.response.data.message))
    }

}
export const resendEmail=async(dispatch)=>{
    try {
        dispatch(resendEmailRequest())

        const {data}=await axios.put(`/SiteSupplyCraft/email/resend`)
        dispatch(resendEmailSuccess(data))
    } catch (error) {
        dispatch(resendEmailFail(error.response.data.message))
    }

}
export const changeEmail=(newEmail)=>async(dispatch)=>{
    try {
        dispatch(changeEmailRequest())
        const {data}=await axios.put(`/SiteSupplyCraft/email/change`,{'email':newEmail},)
        dispatch(changeEmailSuccess(data))
    } catch (error) {
        dispatch(changeEmailFail(error.response.data.message))
    }

}
export const changePassword=(userData)=>async(dispatch)=>{
    try {
        dispatch(changePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data}=await axios.put(`/SiteSupplyCraft/myprofile/changepassword`,userData,config)
        dispatch(changePasswordSuccess(data))
    } catch (error) {
        dispatch(changePasswordFail(error.response.data.message))
    }

}