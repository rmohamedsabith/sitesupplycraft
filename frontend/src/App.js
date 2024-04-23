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
import AdminDashboard from './components/Admin/Dashboard';
import Chat from './components/Admin/message/Chat'
import Verifications from './components/Admin/Verifications'; 
import Payment from './components/Product Owner/Payment';
import Verification from './components/Admin/Verification';
import VerifyingEmail from './components/Auth/VerifyingEmail';
import SendVerification from './components/Auth/SendVerification';
import FindLocation from './components/Google maps/FindLocation';
import AdminLayout from './components/Layouts/AdminLayout';
import Payments from './components/Admin/Payments'
import PaymentDetails from './components/Admin/PaymentDetails'
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { getUnreadMessages } from './actions/messagesAction';
import Edit_product from './components/Product Owner/Edit_product';
import Update from './components/Product Owner/Update';




function App() {
  const{isAuthenticated,user}=useSelector((state)=>state.authState)
  const[isDistrict,setIsDistrict]=useState(false)
  const[district,setDistrict]=useState('')
  const[hide,setHide]=useState(false)
  const[isHumClicked,setIsHumClicked]=useState(false)
  const[stripeApi,setStripeApi]=useState('')
  const dispatch=useDispatch()

  const isMobile = useMediaQuery({ maxWidth: 1210 });
  useEffect(()=>{
    dispatch(loadUser).then(()=>dispatch(getUnreadMessages)/* .then(()=>setNotification(unreadMessages)) */)
    
    setHide(isMobile)
  },[isMobile,dispatch])

  useEffect(() => {
    if (isAuthenticated && user?.role === 'Product Owner') {
      async function getStripeAPI() {
        try {
          const { data } = await axios.get('/SiteSupplyCraft/payment/stripeApi');
          setStripeApi(data.stripeApiKey);
        } catch (error) {
          console.error('Error fetching Stripe API:', error);
        }
      }
      getStripeAPI();
    }
  }, [isAuthenticated, user?.role]);

//console.log(loadStripe(stripeApi),stripeApi)
  
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
          <Route path="register/verify/email" element={<SendVerification/>}/>
          <Route path="email/verify/:token" element={<VerifyingEmail/>}/>

          {/* Users Routes */}
          <Route path="myprofile/">
            <Route index element={<ProtectedRoute><UserDeail/></ProtectedRoute>}/>
            <Route path='edit' element={<ProtectedRoute><UpdateUser/></ProtectedRoute>}/>
          </Route>

          {/* ProductOwner */}
              {/* Tharushi */}
          <Route path='ProductOwner/DashBoard' element={<ProtectedRoute isProductOwner={true}><DashBoard/></ProtectedRoute>}/> 
          <Route path='ProductOwner/Messages' element={<ProtectedRoute isProductOwner={true}><Messages/></ProtectedRoute>}/> 
          <Route path='ProductOwner/:id/edit' element={<ProtectedRoute isProductOwner={true}><Update/></ProtectedRoute>}/> 
          
          
          
              {/* Sandeepa */}
          <Route path='ProductOwner/addProduct' element={<ProtectedRoute isProductOwner={true}><AddProduct/></ProtectedRoute>}/>
          <Route path='ProductOwner/addProduct/Preview' element={<ProtectedRoute isProductOwner={true}><PreviewProduct/></ProtectedRoute>}/>
          <Route path='ProductOwner/addProduct/Preview/Edit' element={<ProtectedRoute isProductOwner={true}><Edit_product/></ProtectedRoute>} />       
          {stripeApi&&<Route path='ProductOwner/addProduct/Pay' element={<ProtectedRoute isProductOwner={true}><Elements stripe={loadStripe(stripeApi)}><Payment/></Elements></ProtectedRoute>}/>       
}           
          {/* <Route path='ProductOwner/becomeJobSeeker' element={<BecomeJobSeeker/>}/>  */}

          {/* Admin */}
          {/* Navodi */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<ProtectedRoute isAdmin={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute isAdmin={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="messages" element={<ProtectedRoute isAdmin={true}><Chat /></ProtectedRoute>} />
            <Route path="payments" element={<ProtectedRoute isAdmin={true}><Payments/></ProtectedRoute>} />
            <Route path="payments/details" element={<ProtectedRoute isAdmin={true}><PaymentDetails/></ProtectedRoute>} />
          
            {/* Hiran */}
            <Route path='Verifications' element={<ProtectedRoute isAdmin={true}><Verifications/></ProtectedRoute>}/>
            <Route path='Verification' element={<ProtectedRoute isAdmin={true}><Verification/></ProtectedRoute>}/>
          </Route>
          {/* <Route path="/admin/messages/:id" element={<ProtectedRoute><MessageDetails /></ProtectedRoute>} /> */}
            
              
          


          {/* Missing Routes */}
          <Route path="*" element={<Missing/>}/>              
        </Routes>
        <Footer/>
          
         
      </HelmetProvider>
    </div> 
            
    
 
  );
}

export default App;