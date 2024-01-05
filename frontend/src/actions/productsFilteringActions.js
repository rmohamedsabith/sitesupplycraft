import { filteringFail, filteringRequest, filteringSuccess } from "../slices/productsFilteringSlice"
import { clearProducts } from "../slices/productsSlice"


export const filter=(price,rating,category,city,model)=>(dispatch)=>{
    try {
        dispatch(filteringRequest())

        const data={price,rating,category,city,model}

        dispatch(filteringSuccess(data))
        dispatch(clearProducts())
        
    } catch (error) {
        dispatch(filteringFail(error))
    }
}