import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, resetPassword } from '../../actions/authActions'
import { useNavigate, useParams } from 'react-router-dom'
import { FloatingLabel, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import MetaData from '../Layouts/MetaData'

const ResetPassword = () => {
    const {isLoading,error,isAuthenticated}=useSelector((state)=>state.authState)
    const [password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {token}=useParams()
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(resetPassword(token,password,confirmPassword))
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
        
      },[isAuthenticated,dispatch,navigate,error])

  return (
    <>
    {isLoading?<Loader/>:
      <div className='parent'>
      <MetaData title={'Reset Password'}/>
        <div className="frame-reset">
            <div className='card d-inline-block p-3 reset'>
              <h1 style={{color:'#053B50'}} >Reset Password</h1>  
              <div>           
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password "
                    className="mb-3 z-0"
                  >
                    <Form.Control type="password"value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingConfirmPassword" label="ConfirmPassword" className='z-0'>
                    <Form.Control type="password"  value={confirmPassword} placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} />
                  </FloatingLabel>
              <div className="d-flex align-items-center justify-content-center">
                 <form onSubmit={handleSubmit}>
                    <br/>
                     <button className='btnstyle' type='submit' disabled={isLoading}>Submit</button>
                    </form>
                </div> 
              </div>
            </div> 

        </div>
    </div>   
    }
  </>
  )
}

export default ResetPassword