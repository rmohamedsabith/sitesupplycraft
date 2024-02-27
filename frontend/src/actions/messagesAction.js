import axios from 'axios'
import { getMessagesFail, getMessagesFromAdminFail, getMessagesFromAdminRequest, getMessagesFromAdminSuccess, getMessagesListFail, getMessagesListRequest, getMessagesListSuccess, getMessagesRequest, getMessagesSuccess, sendMessageFail, sendMessageRequest, sendMessageSuccess } from "../slices/messagesSlice"

export const sendMessage=(receiver,role,content)=>async(dispatch)=>{
    try {
        dispatch(sendMessageRequest())
        let DATA;
        if(role==='Product Owner')
        {
            DATA=(await axios.post(`/SiteSupplyCraft/message/send`,{content})).data
        }
        else{
            DATA=(await axios.post(`/SiteSupplyCraft/message/send`,{receiver,content})).data
        }
        dispatch(sendMessageSuccess(DATA))
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
        const{data}=await axios.get(`/SiteSupplyCraft/admin/messagesList`)
        dispatch(getMessagesListSuccess(data))
    } catch (error) {
        dispatch(getMessagesListFail(error.response.data.message))
    }
}