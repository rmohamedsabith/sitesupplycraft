import axios from "axios"
import { addFavouriteFail, addFavouriteRequest, addFavouriteSuccess, deleteAllFail, deleteAllRequest, deleteAllSuccess, deleteOneFail, deleteOneRequest, deleteOneSuccess } from "../slices/usersSlice"

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
