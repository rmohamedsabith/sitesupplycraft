import axios from "axios"
import { addFavouriteFail, addFavouriteRequest, addFavouriteSuccess, cancelAccountFail, cancelAccountRequest, cancelAccountSuccess, deleteAllFail, deleteAllRequest, deleteAllSuccess, deleteOneFail, deleteOneRequest, deleteOneSuccess, getProcessingFail, getProcessingRequest, getProcessingSuccess, verifyAccountFail, verifyAccountRequest, verifyAccountSuccess, viewProcessingFail, viewProcessingRequest, viewProcessingSuccess } from "../slices/usersSlice"

export const addFavourite=(model,id)=>async(dispatch)=>{
    try {
        dispatch(addFavouriteRequest())
        const {data}=await axios.post(`/SiteSupplyCraft/mycart/add/${model}/${id}`)
        dispatch(addFavouriteSuccess(data))
    } catch (error) {
        dispatch(addFavouriteFail(error.response.data.message))
    }

}
export const deleteOne=(model,id)=>async(dispatch)=>{
    try {
        dispatch(deleteOneRequest())
        const {data}=await axios.put(`/SiteSupplyCraft/mycart/delete/${model}/${id}`)
        dispatch(deleteOneSuccess(data))
    } catch (error) {
        dispatch(deleteOneFail(error.response.data.message))
    }

}
export const deleteAll=async(dispatch)=>{
    try {
        dispatch(deleteAllRequest())
        const {data}=await axios.delete(`/SiteSupplyCraft/mycart/deleteAll`)
        dispatch(deleteAllSuccess(data))
    } catch (error) {
        dispatch(deleteAllFail(error.response.data.message))
    }

}
export const getProcessing=async(dispatch)=>{
    try {
        dispatch(getProcessingRequest())
        const {data}=await axios.get(`/SiteSupplyCraft/processing`)
        dispatch(getProcessingSuccess(data))
    } catch (error) {
        dispatch(getProcessingFail(error.response.data.message))
    }

}
export const cancelAccount=id=>async(dispatch)=>{
    try {
        dispatch(cancelAccountRequest())
        const {data}=await axios.delete(`/SiteSupplyCraft/processing/${id}/cancel`)
        dispatch(cancelAccountSuccess(data))
    } catch (error) {
        dispatch(cancelAccountFail(error.response.data.message))
    }

}
export const viewProcessing=id=>async(dispatch)=>{
    try {
        dispatch(viewProcessingRequest())
        const {data}=await axios.get(`/SiteSupplyCraft/processing/${id}`)
        dispatch(viewProcessingSuccess(data))
    } catch (error) {
        dispatch(viewProcessingFail(error.response.data.message))
    }

}
export const verifyAccount=id=>async(dispatch)=>{
    try {
        dispatch(verifyAccountRequest())
        const {data}=await axios.put(`/SiteSupplyCraft/processing/${id}/verify`)
        dispatch(verifyAccountSuccess(data))
    } catch (error) {
        dispatch(verifyAccountFail(error.response.data.message))
    }

}


