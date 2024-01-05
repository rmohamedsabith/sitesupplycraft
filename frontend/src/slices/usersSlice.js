import { createSlice } from "@reduxjs/toolkit";

const usersSlice=createSlice({
    name:"userss",
    initialState:{
        isLoading:false
    },
    reducers:{
        laborersRequest(state,action){
            return {isLoading:true}
        },
        laborersSuccess(state,action){
            return{
                isLoading:false,
                laborers:action.payload.laborers,
                count:action.payload.count,
                totalCount:action.payload.Total_count,
                resPerPage:action.payload.resPerPage
            }
        },
        laborersFail(state,action){
            return {
                isLoading:false,
                error:action.payload.error
            }
        },
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        }
    }
});

const {actions,reducer}=usersSlice;

export const{
    laborersRequest,
    laborersSuccess,
    laborersFail,
    clearError
}=actions

export default reducer