import axios from "axios"
import { laborersFail, laborersRequest, laborersSuccess } from "../slices/usersSlice"
/* 
export const getlaborers=async(dispatch)=>{
    try {
        dispatch(laborersRequest())
        dispatch(productsRequest())
        let link=`/SiteSupplyCraft/products?page=${currentPage}`

        if(keyword)link+=`&keyword=${keyword}`
        if(category)link+=`&category=${category}`
        if(rating)link+=`&ratings[gte]=${rating}`
        if(district)link+=`&district=${district}`
        if(city)link+=`&city=${city}`
        if(price)link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`

        const {data} = await axios.get(link)
        dispatch(laborersSuccess(data))
        
    } catch (error) {
        dispatch(laborersFail(error))
    }
} */