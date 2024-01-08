import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearAuthError, forgetPassword, login } from '../../actions/authActions'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import Loader from '../Loader'

const Login = () => {

  const {isLoading,isAuthenticated,error,message}=useSelector((state)=>state.authState)


  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(login(email,password))    
  }
  const handleForgetPassword=()=>{
    dispatch(forgetPassword(email))
  }
  useEffect(()=>{
    if(isAuthenticated)
    {
      return navigate('/')
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
  },[isAuthenticated,dispatch,navigate,error,message])
  
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
                    <span className='marginOff' style={{fontSize:'small',color:'red',cursor:'pointer'}} onClick={handleForgetPassword}>forgot password?</span>
                    <br/>
                    <button className='btnstyle marginOff' type='submit' style={{marginTop:'20px'}}  disabled={isLoading}>Log in</button>
                </form> 
                
              </div> 
              </Col>
              <Col>
              <div className='card p-3 mx-0 signup'>
                <div className='signup-content'>
                <h1 style={{color:'#053B50'}} >New User</h1>                
                  <Link to='/register/Customer'><center><button className='btnstyle' type='submit' style={{}} disabled={isLoading}>Sign Up</button></center></Link>
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