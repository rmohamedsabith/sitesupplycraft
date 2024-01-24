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
    
    }
});

const {actions,reducer}=messagesSlice;

export const{
    
    
    clearError,
}=actions

export default reducer