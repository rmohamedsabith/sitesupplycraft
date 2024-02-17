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
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/authActions';
import ResetPassword from './components/Auth/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './components/Auth/Registration'
import Home from './components/Home';
import UserDeail from './components/Users/UserDetail'
import UpdateUser from './components/Users/UpdateUser';
import {useMediaQuery} from 'react-responsive'
import DashBoard from './components/Product Owner/DashBoard'
import AddProduct from './components/Product Owner/AddProduct'
import PreviewProduct from './components/Product Owner/PreviewProduct';
import Messages from './components/Product Owner/Messages'
import BecomeJobSeeker from './components/Product Owner/BecomeJobSeeker';
import AdminDashboard from './components/Admin/Dashboard';
import AdminMessages from './components/Admin/Messages'
import Verifications from './components/Admin/Verifications'; 
import Payment from './components/Product Owner/Payment';
import Verification from './components/Admin/Verification';
import Message from './components/Admin/Message';
import VerifyingEmail from './components/Auth/VerifyingEmail';
import SendVerification from './components/Auth/SendVerification';
import FindLocation from './components/Google maps/FindLocation';
import AdminLayout from './components/Layouts/AdminLayout';
import Payments from './components/Admin/Payments'
import PaymentDetails from './components/Admin/PaymentDetails'
import axios from 'axios';
import {Element} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';





function App() {
  

  const[isDistrict,setIsDistrict]=useState(false)
  const[district,setDistrict]=useState('')
  const {count,products,ActiveProducts,DeactiveProducts}=useSelector((state)=>state.productsState)
  const[hide,setHide]=useState(false)
  const[isHumClicked,setIsHumClicked]=useState(false)
  const[stripeApi,setStripeApi]=useState('')
  const dispatch=useDispatch()

  const isMobile = useMediaQuery({ maxWidth: 1100 });
  useEffect(()=>{
    dispatch(loadUser)
    setHide(isMobile)
  },[isMobile])

  useEffect(()=>{
    async function getStripeAPI(){
      const {data}=await axios.get('/SiteSupplyCraft/payment/stripeApi')
      setStripeApi(data.stripeApiKey)
    }
    getStripeAPI();
  },[])


  
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
          <Route path="product/:id/location" element={<ProtectedRoute><FindLocation/></ProtectedRoute>}/>

                                 

          {/*Auth Routes*/}
          <Route path="login" element={<Login/>}/>
          <Route path="password/reset/:token" element={<ResetPassword/>}/>

            {/* Poorni */}
          <Route path="register/:role" element={<Registration/>}/>
          <Route path="register/:role/verify/email" element={<ProtectedRoute><SendVerification/></ProtectedRoute>}/>
          <Route path="register/:role/verify/:token" element={<VerifyingEmail/>}/>

          {/* Users Routes */}
          <Route path="myprofile/">
            <Route index element={<ProtectedRoute><UserDeail/></ProtectedRoute>}/>
            <Route path='edit' element={<ProtectedRoute><UpdateUser/></ProtectedRoute>}/>
          </Route>

          {/* ProductOwner */}
              {/* Tharushi */}
          <Route path='ProductOwner/DashBoard' element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/> 
          <Route path='ProductOwner/Messages' element={<ProtectedRoute><Messages/></ProtectedRoute>}/> 
          
          
              {/* Sandeepa */}
          <Route path='ProductOwner/addProduct' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
          <Route path='ProductOwner/addProduct/Payment' element={<ProtectedRoute><Payment/></ProtectedRoute>}/>   
          <Route path='ProductOwner/addProduct/Preview' element={<ProtectedRoute><PreviewProduct/></ProtectedRoute>}/>       
          {stripeApi&&<Route path='ProductOwner/addProduct/Pay' element={<ProtectedRoute><Element stripe={loadStripe(stripeApi)}><Payment/></Element></ProtectedRoute>}/>       
}           
          {/* <Route path='ProductOwner/becomeJobSeeker' element={<BecomeJobSeeker/>}/>  */}

          {/* Admin */}
          {/* Navodi */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
            <Route path="messages/:id" element={<ProtectedRoute><Message /></ProtectedRoute>} />
            <Route path="payments" element={<ProtectedRoute><Payments/></ProtectedRoute>} />
            <Route path="payments/details" element={<ProtectedRoute><PaymentDetails/></ProtectedRoute>} />
          
            {/* Hiran */}
            <Route path='Verification' element={<ProtectedRoute><Verifications/></ProtectedRoute>}/>
            <Route path='Verification/:id' element={<ProtectedRoute><Verification/></ProtectedRoute>}/>
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
