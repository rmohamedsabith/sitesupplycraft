import { filteringFail, filteringRequest, filteringSuccess } from "../slices/productsFilteringSlice"


export const filter=(price,rating,category,city,model)=>(dispatch)=>{
    try {
        dispatch(filteringRequest())

        const data={price,rating,category,city,model}

        dispatch(filteringSuccess(data))
        
        
    } catch (error) {
        dispatch(filteringFail(error))
    }
}