import { useDispatch, useSelector } from "react-redux"
import Loader from './Loader'
import { Navigate } from "react-router-dom"
import { loadUser } from "../actions/authActions"
import { toast } from "react-toastify"


const ProtectedRoute = ({children}) => {
    const dispatch =useDispatch()
    const {isAuthenticated,isLoading,user}=useSelector((state)=>state.authState)
    if(!isAuthenticated && !isLoading) {        
            dispatch(loadUser) 
            return  <Navigate to="/login" />
        
    }
    if (!user?.isValidEmail) {
        toast.warning('You need to verify your email', {
            position: 'bottom-center',
        });
    
        return (
            <Navigate to={`/register/${user?.role}/verify/email`} />
        );
    }
    if(isAuthenticated && user.isvalidEmail){
        return children
    }
    if(isLoading)
    {
       return <Loader/>
    }
}

export default ProtectedRoute