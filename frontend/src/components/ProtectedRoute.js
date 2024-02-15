import { useDispatch, useSelector } from "react-redux"
import Loader from './Loader'
import { Navigate } from "react-router-dom"
import { loadUser } from "../actions/authActions"


const ProtectedRoute = ({children}) => {
    const dispatch =useDispatch()
    const {isAuthenticated,isLoading}=useSelector((state)=>state.authState)
    if(!isAuthenticated && !isLoading) {        
            dispatch(loadUser) 
            return  <Navigate to="/login" />
        
    }
    if(isAuthenticated){
        return children
    }
    if(isLoading)
    {
       return <Loader/>
    }
}

export default ProtectedRoute