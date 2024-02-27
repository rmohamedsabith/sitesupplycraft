import { createSlice } from "@reduxjs/toolkit";

const productsFilteringSlice=createSlice(
    {
        name:"filter",
        initialState:{
            isLoading:false,
            model:'products'         
        },
        reducers:{
            filteringRequest(state,action)
            {
                return {isLoading:true}
            },
            filteringSuccess(state,action)
            {
                return{
                    isLoading:false,
                    price:action.payload.price,
                    rating:action.payload.rating,
                    city:action.payload.city,
                    district:action.payload.district,
                    category:action.payload.category,
                    model:action.payload.model
                }
            },
            filteringFail(state,action)
            {
                return{
                    ...state,
                    error:action.payload
                }
            },
            clearFilteringError(state,action)
            {
                return{...state}
            }
        }
    }
)

const{actions,reducer}=productsFilteringSlice

export  const{
    filteringRequest,
    filteringSuccess,
    filteringFail,
    clearFilteringError
}=actions


export default reducer