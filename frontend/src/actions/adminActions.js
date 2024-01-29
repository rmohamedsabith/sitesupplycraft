import axios from 'axios'
import { cancelOwnerFail, cancelOwnerRequest, cancelOwnerSuccess, getProcessingOwnersFail, getProcessingOwnersRequest, getProcessingOwnersSuccess, verifyOwnerFail, verifyOwnerRequest, verifyOwnerSuccess, viewProcessingOwnerFail, viewProcessingOwnerRequest, viewProcessingOwnerSuccess } from '../slices/adminSlice'

export const getProcessingOwners=async(dispatch)=>{
    try {
        dispatch(getProcessingOwnersRequest())
        const{data}=await axios.post(`/SiteSupplyCraft/processing`)
        dispatch(getProcessingOwnersSuccess(data))
    } catch (error) {
        dispatch(getProcessingOwnersFail(error.response.data.message))
    }
}
export const viewProcessingOwner=async(dispatch)=>{
    try {
        dispatch(viewProcessingOwnerRequest())
        const{data}=await axios.post(`/SiteSupplyCraft/processing`)
        dispatch(viewProcessingOwnerSuccess(data))
    } catch (error) {
        dispatch(viewProcessingOwnerFail(error.response.data.message))
    }
}
export const verifyOwner=(id)=>async(dispatch)=>{
    try {
        dispatch(verifyOwnerRequest())
        const{data}=await axios.put(`/SiteSupplyCraft/${id}/verify`)
        dispatch(verifyOwnerSuccess(data))
    } catch (error) {
        dispatch(verifyOwnerFail(error.response.data.message))
    }
}
export const  cancelOwner=(id)=>async(dispatch)=>{
    try {
        dispatch(cancelOwnerRequest())
        const{data}=await axios.put(`/SiteSupplyCraft/${id}/cancel`)
        dispatch(cancelOwnerSuccess(data))
    } catch (error) {
        dispatch(cancelOwnerFail(error.response.data.message))
    }
}
export const getTotals=async(dispatch)=>{
    try {
        dispatch(getTotalsRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/totals`)
        dispatch(getTotalsSuccess(data))
    } catch (error) {
        dispatch(getTotalsFail(error.response.data.message))
    }
}