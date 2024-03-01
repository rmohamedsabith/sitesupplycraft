import { useDispatch, useSelector } from "react-redux"
import Loader from './Loader'
import { Navigate } from "react-router-dom"
import { loadUser } from "../actions/authActions"
import { toast } from "react-toastify"


const ProtectedRoute = ({children,isAdmin,isProductOwner}) => {
    const dispatch =useDispatch()
    const {isAuthenticated,isLoading,user}=useSelector((state)=>state.authState)
    if(!isAuthenticated && !isLoading) {        
            dispatch(loadUser) 
            return  <Navigate to="/login" />
        
    }
    if (!user?.isvalidEmail) {  
        return (
            <Navigate to={`/register/verify/email`} />
        );
    }
    if(isAuthenticated && user?.isvalidEmail){
        if((isAdmin && user?.role!=='Admin') || (isProductOwner && user?.role!=='Product Owner'))return <Navigate to={'/'}/>
        return children
    }
    if(isLoading)
    {
       return <Loader/>
    }
}

export default ProtectedRoute