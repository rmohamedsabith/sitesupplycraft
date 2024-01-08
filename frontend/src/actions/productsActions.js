
import {clearError, productsFail, productsRequest, productsSuccess } from "../slices/productsSlice"
import axios from 'axios'

export const getProducts=(keyword, price, category, rating,city,district, currentPage,model)=>async(dispatch)=>{
    
    try {
        dispatch(productsRequest())
        let link=`/SiteSupplyCraft/${model}?page=${currentPage}`

        if(keyword)link+=`&keyword=${keyword}`
        if(category)link+=`&${model==='products'||model==='products/sell'||model==='products/rent'?'category':'job'}=${category}`
        if(rating)link+=`&ratings[gte]=${rating}`
        if(district)link+=`&district=${district}`
        if(city)link+=`&city=${city}`
        if(price)link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`

        const {data} = await axios.get(link)
        dispatch(productsSuccess(data))
        
    } catch (error) {
        dispatch(productsFail(error.response.data.message))
    }

}

export const clearProductsError=(dispatch)=>{
    dispatch(clearError())
}



