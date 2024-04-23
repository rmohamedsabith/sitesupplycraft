import axios from 'axios'
import { cancelOwnerFail, cancelOwnerRequest, cancelOwnerSuccess, getProcessingOwnersFail, getProcessingOwnersRequest, getProcessingOwnersSuccess, getTotalsFail, getTotalsRequest, getTotalsSuccess, getTotals_per_monthFail, getTotals_per_monthRequest, getTotals_per_monthSuccess, verifyOwnerFail, verifyOwnerRequest, verifyOwnerSuccess, viewProcessingOwnerFail, viewProcessingOwnerRequest, viewProcessingOwnerSuccess } from '../slices/adminSlice'

export const getProcessingOwners=async(dispatch)=>{
    try {
        dispatch(getProcessingOwnersRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/processing`)
        dispatch(getProcessingOwnersSuccess(data))
    } catch (error) {
        dispatch(getProcessingOwnersFail(error.response.data.message))
    }
}
export const viewProcessingOwner=(id)=>async(dispatch)=>{
    try {
        dispatch(viewProcessingOwnerRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/processing/${id}`)
        dispatch(viewProcessingOwnerSuccess(data))
    } catch (error) {
        dispatch(viewProcessingOwnerFail(error.response.data.message))
    }
}
export const verifyOwner=(id)=>async(dispatch)=>{
    try {
        dispatch(verifyOwnerRequest())
        const{data}=await axios.put(`/SiteSupplyCraft/processing/${id}/verify`)
        dispatch(verifyOwnerSuccess(data))
    } catch (error) {
        dispatch(verifyOwnerFail(error.response.data.message))
    }
}
export const  cancelOwner=(id)=>async(dispatch)=>{
    try {
        dispatch(cancelOwnerRequest())
        const{data}=await axios.delete(`/SiteSupplyCraft/processing/${id}/cancel`)
        dispatch(cancelOwnerSuccess(data))
    } catch (error) {
        dispatch(cancelOwnerFail(error.response.data.message))
    }
}
export const getTotals=async(dispatch)=>{
    try {
        dispatch(getTotalsRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/admin/totals`)
        dispatch(getTotalsSuccess(data))
    } catch (error) {
        dispatch(getTotalsFail(error.response.data.message))
    }
}
export const getTotals_per_month=async(dispatch)=>{
    try {
        dispatch(getTotals_per_monthRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/admin/counts`)
        dispatch(getTotals_per_monthSuccess(data))
    } catch (error) {
        dispatch(getTotals_per_monthFail(error.response.data.message))
    }
}