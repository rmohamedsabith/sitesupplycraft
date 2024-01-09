import './App.css';
import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import {Route,Routes} from 'react-router-dom'
import ProductDetails from './components/Products/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import Missing from './components/Missing';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import ResetPassword from './components/Auth/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './components/Auth/Registration'
import Home from './components/Home';
import UserDeail from './components/Users/UserDetail'
import UpdateUser from './components/Users/UpdateUser';
import {useMediaQuery} from 'react-responsive'




function App() {
  const[isDistrict,setIsDistrict]=useState(false)
  const[district,setDistrict]=useState('')
  const[hide,setHide]=useState(false)
  const[isHumClicked,setIsHumClicked]=useState(false)
  const dispatch=useDispatch()

  const isMobile = useMediaQuery({ maxWidth: 1100 });
  useEffect(()=>{
    dispatch(loadUser)
    setHide(isMobile)
  },[dispatch,isMobile])

  return (    
    <div className='App'>
      <HelmetProvider>
        <Header hide={hide} setIsHumClicked={setIsHumClicked} isHumClicked={isHumClicked} setDistrict={setDistrict} setIsDistrict={setIsDistrict}/>         
        <ToastContainer theme='dark'/>               
        <Routes>
          {/*Products Routes*/} 
          <Route path='/' element={<Home isDistrict={isDistrict} setIsDistrict={setIsDistrict} district={district} setDistrict={setDistrict} hide={hide} isHumClicked={isHumClicked} setIsHumClicked={setIsHumClicked}/>}/>
          <Route path="search/:keyword" element={<Home isDistrict={isDistrict} setIsDistrict={setIsDistrict} district={district} setDistrict={setDistrict} hide={hide} isHumClicked={isHumClicked} setIsHumClicked={setIsHumClicked}/>}/>
          <Route path="product/:id" element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>                        
                                 

          {/*Auth Routes*/}
          <Route path="login" element={<Login/>}/>
          <Route path="password/reset/:token" element={<ResetPassword/>}/>
          <Route path="register/:role" element={<Registration/>}/>

          {/* Users Routes */}
          <Route path="myprofile/">
            <Route index element={<ProtectedRoute><UserDeail/></ProtectedRoute>}/>
            <Route path='edit' element={<ProtectedRoute><UpdateUser/></ProtectedRoute>}/>
          </Route> 

          {/* Missing Routes */}
          <Route path="*" element={<Missing/>}/>              
        </Routes>
        <Footer/>
          
         
      </HelmetProvider>
    </div> 
             
    
 
  );
}

export default App;
