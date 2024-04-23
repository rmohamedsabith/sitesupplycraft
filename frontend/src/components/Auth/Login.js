import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearAuthError, forgetPassword, login, register } from '../../actions/authActions'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import Loader from '../Loader'
import {GoogleLoginButton} from 'react-social-login-buttons'
import {LoginSocialGoogle} from 'reactjs-social-login'
import axios from 'axios'
import { getTotals, getTotals_per_month } from '../../actions/adminActions'
import { getUnreadMessages } from '../../actions/messagesAction'
import { ChatState } from '../../chatContex'
const Login = () => {
  const {isLoading,isAuthenticated,user,error,message}=useSelector((state)=>state.authState)
  const {setNotification}=ChatState()
  const{unreadMessages}=useSelector((state)=>state.messagesState) 
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const handleSubmit=(e)=>{
    //navigate('/admin')
     e.preventDefault()
    dispatch(login(email,password))    
  }
  const handleForgetPassword=()=>{
    dispatch(forgetPassword(email))
  }
  
  useEffect(()=>{
    if(isAuthenticated)
    {
      if(user.isvalidEmail)
      {
        if(user && user.role ==='Admin')
        {
          dispatch(getTotals_per_month)
          dispatch(getTotals)
          return navigate('/admin')
        } 
        else if(user && user.role ==='Product Owner')
        {
            dispatch(getUnreadMessages).then(()=>{
            setNotification(unreadMessages)
          })
          return navigate('/ProductOwner/DashBoard')
        } 
        else return navigate('/')
      }
      else{
        return navigate('/register/verify/email')
      }
    }
    if(error)
    {
      toast(error,{
        position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
      })
      return
    }
    else if(message){
      toast(message,{
        position: toast.POSITION.BOTTOM_CENTER,
                type: 'success'
      })
    }
  },[isAuthenticated,dispatch,navigate,error,message,setNotification,unreadMessages,user])

  const handleGoogleLoginSuccess = ({ provider, data }) => {
    const { code } = data; // Obtain the authorization code from the Google Sign-In data

    // Exchange the authorization code for an access token and fetch user's profile
    axios
      .post('https://oauth2.googleapis.com/token', {
        code: code,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code',
      })
      .then((tokenResponse) => {
        const accessToken = tokenResponse.data.access_token;

        // Use access token to fetch user's profile information
        axios
          .get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((profileResponse) => {
            const { email, picture, name } = profileResponse.data;

          /*   console.log('User Email:', email);
            console.log('User Name:', name);
            console.log('User Profile:', picture);
            console.log('Access Token:', accessToken); */

            const formData ={
              name,
              email,
              profile:picture,
              role:'Google User',
              token:accessToken,
            }

            dispatch(register(formData))
          })
          .catch((error) => {
            console.error('Error fetching user profile:', error.message);
          });
      })
      .catch((error) => {
        console.error('Error exchanging code for token:', error.message);
      });
  };

  const handleGoogleLoginFailure = (err) => {
    console.log('Error Message:', err);
    // Handle Google Sign-In failure
  };
  
  return (
    <>
      {isLoading?<Loader/>:
        <div className='parent'>
        <MetaData title={'Login'}/>
          <div className="frame">
              <Row>
              <Col>
              <div className='card p-3 login mb-5'>
                <h1 style={{color:'#053B50'}} >Login</h1>
                 
                <form onSubmit={handleSubmit} style={{textAlign:'right'}}>  
                    <div>  
                    <div className='float'>     
                    <i className="fas fa-envelope prefix fa-lg"></i>
                    <div style={{ paddingLeft: '10px',width:'400px' }}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3 z-0"
                    >
                      <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </FloatingLabel>
                    </div>
                    
                    </div>      
                    <div className='float'>                   
                    <i className="fas fa-lock prefix fa-lg"></i>
                    <div style={{ paddingLeft:'10px',width:'400px' }}>
                    <FloatingLabel controlId="floatingPassword" label="Password" className='z-0'>
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </FloatingLabel>
                    </div>
                    
                    
                    </div>
                    </div>
                    <span className='marginOff' style={{fontSize:'13px',color:'maroon',cursor:'pointer'}} onClick={handleForgetPassword}>forgot password?</span>
                    <br/>
                    <button className='btnstyle marginOff' type='submit' style={{marginTop:'20px'}}  disabled={isLoading}>Log in</button>
 
                </form>
                    <div style={{margin: 'auto', borderTop:'2px solid black',minwidth:'50%'}}> 
                      <p style={{color:'goldenrod',fontSize:'13px'}}>***** Only Consumers allow to Sign in with Google *****</p>               
                        <LoginSocialGoogle 
                          client_id="80050429848-q3g9m08m6b7haih8qqdj12318bo618ek.apps.googleusercontent.com"
                          scope="openid profile email"
                          discoveryDocs="claims_supported"
                          access_type="offline"
                          onResolve={handleGoogleLoginSuccess}
                          onReject={handleGoogleLoginFailure}
                        >
                          <center><GoogleLoginButton iconSize='30px' text='Sign in With Google' align='center' style={{padding:'20px 10px', fontSize:'15px'}}/></center>
                        </LoginSocialGoogle>
                    </div> 
                
              </div>
              </Col>
              <Col>
                <div className='card p-3 mx-0 signup'>
                  <div className='signup-content'>
                    <h1 style={{color:'#053B50'}} >New User</h1>                
                    <Link to='/register/Customer'><center><div className='location'  style={{backgroundColor:'#053B50'}} disabled={isLoading}>Sign Up</div></center></Link>
                  </div>                
                </div>
              </Col>
              </Row>
  
          </div>
      </div>
      
      
      }
    </>
    
  )
}

export default Login