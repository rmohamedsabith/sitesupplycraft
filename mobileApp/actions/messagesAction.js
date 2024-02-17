import axios from 'axios'
import { getMessagesFail, getMessagesFromAdminFail, getMessagesFromAdminRequest, getMessagesFromAdminSuccess, getMessagesListFail, getMessagesListRequest, getMessagesListSuccess, getMessagesRequest, getMessagesSuccess, sendMessageFail, sendMessageRequest, sendMessageSuccess } from "../slices/messagesSlice"

export const sendMessage=(receiver,content)=>async(dispatch)=>{
    try {
        dispatch(sendMessageRequest())
        const{data}=await axios.post(`/SiteSupplyCraft/message/send`,{receiver,content})
        dispatch(sendMessageSuccess(data))
    } catch (error) {
        dispatch(sendMessageFail(error.response.data.message))
    }
}
export const getMessages=async(dispatch)=>{
    try {
        dispatch(getMessagesRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/messages`)
        dispatch(getMessagesSuccess(data))
    } catch (error) {
        dispatch(getMessagesFail(error.response.data.message))
    }
}
export const  getMessagesFromAdmin=(id)=>async(dispatch)=>{
    try {
        dispatch(getMessagesFromAdminRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/messages/${id}`)
        dispatch(getMessagesFromAdminSuccess(data))
    } catch (error) {
        dispatch(getMessagesFromAdminFail(error.response.data.message))
    }
}
export const getMessagesList=async(dispatch)=>{
    try {
        dispatch(getMessagesListRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/messagesList`)
        dispatch(getMessagesListSuccess(data))
    } catch (error) {
        dispatch(getMessagesListFail(error.response.data.message))
    }
}