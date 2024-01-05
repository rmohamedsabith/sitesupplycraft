import './App.css';
import Side from './components/Layouts/Side'
import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import Search from './components/Products/Search'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import ProductList from './components/Products/ProductsList';
import ProductDetails from './components/Products/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import SearchedProducts from './components/Products/SearchedProducts';
import { MDBCol } from 'mdbreact';
import Login from './components/Auth/Login';
import Missing from './components/Missing';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import ResetPassword from './components/Auth/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './components/Auth/Registration'




function App() {
  const[isDistrict,setIsDistrict]=useState(false)
  const[district,setDistrict]=useState('')
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(loadUser)
  },[dispatch])

  return (
    <BrowserRouter>
    
       <div className='App'>
       <HelmetProvider>
         <Header/>         
         <ToastContainer theme='dark'/>

          {/*Products Route*/}
          <Routes>
            <Route path="/*"
              element={
                <div className='row'>
                  <MDBCol>
                    <Side isDistrict={isDistrict} district={district}/>
                  </MDBCol>  
                  <MDBCol md="10">
                  <Search setDistrict={setDistrict} setIsDistrict={setIsDistrict} district={district}/>
                    <Routes>
                      <Route path='/'>
                        <Route index element={<ProductList/>}/>
                        <Route path="search/:keyword" element={<SearchedProducts  district={district}/>}/>
                        <Route path="product/:id" element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>                        
                        <Route path="*" element={<Missing/>}/>                        
                      </Route>
                    </Routes> 
                  </MDBCol>        
                </div>
              }/>
          

          {/*Auth Routes*/}
            <Route path="login" element={<Login/>}/>
            <Route path="password/reset/:token" element={<ResetPassword/>}/>
            <Route path="register/:role" element={<Registration/>}/>
          
              
          </Routes>
         <Footer/>
          
         
         </HelmetProvider>
      </div> 
             
    </BrowserRouter>
 
  );
}

export default App;
