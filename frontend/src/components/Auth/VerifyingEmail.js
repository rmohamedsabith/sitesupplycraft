import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import icon from '../../images/Verified.png';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { clearAuthError, verifyEmail } from '../../actions/authActions';
import { Link } from 'react-router-dom';

const VerifyingEmail = () => {
  const {isLoading,error,isAuthenticated,user}=useSelector((state)=>state.authState)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {token}=useParams()
  useEffect(()=>{
    if(error)
    {
      return navigate('/register/verify/email')
    }
    else{
      dispatch(verifyEmail(token))
    }
    
  },[dispatch,navigate,error])

  return (
    <>
    <div className='container'>
      <div className='frame'>
        <img src={icon} className='round-image'/>
        <center>
        <h1>Email Verified</h1>
        <p>Your email address was succesfully verified</p>
        <Link to={'/'} >Back to Home</Link>
        </center>
      </div>
    </div>
    </>
  )
}

export default VerifyingEmail