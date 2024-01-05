import { useSelector } from "react-redux"
import Loader from './Loader'
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}) => {
    const {isAuthenticated,isLoading,user}=useSelector((state)=>state.authState)
    if(!isAuthenticated && !isLoading) {
        return <Navigate to="/login" />
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