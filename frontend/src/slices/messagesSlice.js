import { createSlice } from "@reduxjs/toolkit";

const messagesSlice=createSlice({
    name:"messages",
    initialState:{
        isLoading:false,
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
            return{isLoading:true}
        },
        sendMessageSuccess(state,action)
        {
            return{
                isLoading:false,
                message:action.payload.Message,
            }
        },
        sendMessageFail(state,action)
        {
            return{
                isLoading:false,
                error:action.payload
            }
        },
        getMessagesRequest(state,action)
        {
            return{isLoading:true}
        },
        getMessagesSuccess(state,action)
        {
            return{
                isLoading:false,
                count:action.payload.count,
                messages:action.payload.Messages,
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
            return{isLoading:true}
        },
        getMessagesListSuccess(state,action)
        {
            return{
                isLoading:false,
                count:action.payload.count,
                messages:action.payload.Messages,
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
            return{isLoading:true}
        },
        getMessagesFromAdminSuccess(state,action)
        {
            return{
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

    
    }
});

const {actions,reducer}=messagesSlice;

export const{
    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFail,
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