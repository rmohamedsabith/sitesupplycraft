import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearAuthError, forgetPassword, login } from '../../actions/authActions'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { FloatingLabel, Form } from 'react-bootstrap'
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
              <div className='card d-inline-block p-3 login'>
                <h1 style={{color:'#053B50'}} >Login</h1>  
                <form onSubmit={handleSubmit}>  
                    <div>  
                    <div className='float'>     
                    <i className="fas fa-envelope prefix fa-lg"></i>
                    <div style={{ paddingLeft: '10px',width:'400px' }}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3"
                    >
                      <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </FloatingLabel>
                    </div>
                    
                    </div>      
                    <div className='float'>                   
                    <i className="fas fa-lock prefix fa-lg"></i>
                    <div style={{ paddingLeft:'10px',width:'400px' }}>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </FloatingLabel>
                    </div>
                    
                    
                    </div>
                    </div>
                    <span style={{position:'relative', left:'450px',fontSize:'small',color:'red',cursor:'pointer',display:'inline-block'}} onClick={handleForgetPassword}>forgot password?</span>
                    <br/>
                    <button className='btnstyle' type='submit' style={{position:'relative', left:'450px',marginTop:'20px'}}  disabled={isLoading}>Log in</button>
                </form> 
                
              </div> 
              <div className='card d-inline-block p-3 signup'>
                <div className='signup-content'>
                  <h1 style={{color:'#053B50'}} >New User</h1>                
                  <Link to='/register/Customer'><button className='btnstyle' type='submit' style={{position:'relative',left:'160px',top:'70px'}} disabled={isLoading}>Sign Up</button></Link>
                </div>

                
              </div>
  
          </div>
      </div>
      
      
      }
    </>
    
  )
}

export default Login