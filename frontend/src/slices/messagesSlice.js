import { createSlice } from "@reduxjs/toolkit";

const messagesSlice=createSlice({
    name:"messages",
    initialState:{
        isLoading:false,
        unreadMessages:[],
    },
    reducers:{
        
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },
        sendMessageRequest(state,action)
        {
            return{
                ...state,
                /* isLoading:true */
            }
        },
        sendMessageSuccess(state,action)
        {
            return{
                ...state,
                isLoading:false,
                message:action.payload.Message,
                messages:action.payload.Messages,
            }
        },
        sendMessageFail(state,action)
        {
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        },
        getMessagesRequest(state,action)
        {
            return{
                ...state,
                isLoading:true}
        },
        getMessagesSuccess(state,action)
        {
            return{
                ...state,
                isLoading:false,
                count:action.payload.count,
                messages:action.payload.Messages,
                unreadMessages:[]
            }
        },
        getMessagesFail(state,action)
        {
            return{
                isLoading:false,
                error:action.payload
            }
        },
        
        getMessagesListRequest(state,action)
        {
            return{
                ...state,
                isLoading:true
            }
        },
        getMessagesListSuccess(state,action)
        {
            return{
                ...state,
                isLoading:false,
                count:action.payload.count,
                datas:action.payload.messages,
                unread:action.payload.unreadMsg,
                messages:null,
            }
        },
        getMessagesListFail(state,action)
        {
            return{
                isLoading:false,
                error:action.payload
            }
        },
        getMessagesFromAdminRequest(state,action)
        {
            return{
                ...state,
                isLoading:true,
            }
        },
        getMessagesFromAdminSuccess(state,action)
        {
            return{
                ...state,
                isLoading:false,
                count:action.payload.count,
                messages:action.payload.Messages,
            }
        },
        getMessagesFromAdminFail(state,action)
        {
            return{
                isLoading:false,
                error:action.payload
            }
        },
        getUnreadMessagesRequest(state,action)
        {
            return{
                ...state,
                isLoading:true
            }
        },
        getUnreadMessagesSuccess(state,action)
        {
            return{
                ...state,
                isLoading:false,
                unreadMessages:action.payload.Messages,
            }
        },
        getUnreadMessagesFail(state,action)
        {
            return{
                isLoading:false,
                error:action.payload
            }
        },

    
    }
});

const {actions,reducer}=messagesSlice;

export const{
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFail,
    getUnreadMessagesRequest,
    getUnreadMessagesSuccess,
    getUnreadMessagesFail,
    getMessagesRequest,
    getMessagesSuccess,
    getMessagesFail,
    getMessagesFromAdminRequest,
    getMessagesFromAdminSuccess,
    getMessagesFromAdminFail,
    getMessagesListRequest,
    getMessagesListSuccess,
    getMessagesListFail,
    clearError,
}=actions

export default reducer