import axios from 'axios'
import { getMessagesFail, getMessagesFromAdminFail, getMessagesFromAdminRequest, getMessagesFromAdminSuccess, getMessagesListFail, getMessagesListRequest, getMessagesListSuccess, getMessagesRequest, getMessagesSuccess, getUnreadMessagesFail, getUnreadMessagesRequest, getUnreadMessagesSuccess, sendMessageFail, sendMessageRequest, sendMessageSuccess } from "../slices/messagesSlice"

export const sendMessage=(message)=>async(dispatch)=>{
    try {
        dispatch(sendMessageRequest())
        let DATA;
       /*  if(role==='Product Owner')
        {
            DATA=(await axios.post(`/SiteSupplyCraft/message/send`,{content})).data
            dispatch(sendMessageSuccess(DATA))
             //dispatch(getMessages) 
        }
        else{ */
            DATA=(await axios.post(`/SiteSupplyCraft/message/send`,message)).data
            dispatch(sendMessageSuccess(DATA))
            /* dispatch(getMessagesFromAdmin(receiver)) */
        //}
       
    } catch (error) {
        dispatch(sendMessageFail(error.response.data.message))
    }
}
export const getMessages=async(dispatch)=>{
    try {
        dispatch(getMessagesRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/messages`)
        dispatch(getMessagesSuccess(data))
        //dispatch(getUnreadMessages)
    } catch (error) {
        dispatch(getMessagesFail(error.response.data.message))
    }
}
export const getUnreadMessages=async(dispatch)=>{
    try {
        dispatch(getUnreadMessagesRequest())
        const{data}=await axios.get(`/SiteSupplyCraft/unread_messages`)
        dispatch(getUnreadMessagesSuccess(data))
    } catch (error) {
        dispatch(getUnreadMessagesFail(error.response.data.message))
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