import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import icon from '../../images/logo.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changeEmail, clearAuthError, resendEmail } from '../../actions/authActions';
import Loader from '../Loader';
import { clearMessage } from '../../slices/authSlice';
import { getTotals, getTotals_per_month } from '../../actions/adminActions';

const SendVerification = () => {
  const {isLoading,error, message,user}=useSelector((state)=>state.authState)
  /* const location = useLocation(); */
  const [show, setShow] = useState(false);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('');

  useEffect(()=>{
    if(user?.isvalidEmail)
    {      
      /* if(user && user.role ==='Admin')
      {
        dispatch(getTotals_per_month)
        dispatch(getTotals)
        return navigate('/admin')
      } 
      else if(user && user.role ==='Product Owner')
      {
        return navigate('/ProductOwner/DashBoard')
      } 
      else */ return navigate('/')
    }
    if(message) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen:dispatch(clearMessage())
      });
    }
    if(error){
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen:()=>dispatch(clearAuthError)
      });
    }
  },[message,error,dispatch])

 

  const handleResendLink = () =>{
    dispatch(resendEmail)
  };
  const handleChangeEmail=()=>{
    dispatch(changeEmail(email))
    setShow(false)
  }

  return (
    <>
     {isLoading? <Loader/>:
      <>
    <center>
    <div className='container'>
      <div className='frame'>
      <img src={icon} className='round-image' style={{position:'relative',right:'80px'}}/>
      <center>        
        <h1>Please Verify Your Email</h1>
        <p>You have submitted your application successfully!</p>
        <p>We have sent a verification link to {email}</p>
        <p>Please click on the link to complete the verification process.</p>
        <p>Please make sure you check your spam folder</p>
        <Button onClick={handleResendLink}>Resend Verification Email</Button>
        <Button onClick={handleShow}>Change Email Address</Button>
        </center>
      </div>
    </div>
    </center>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change your email address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Enter your new Email'
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangeEmail}>
            Upadate Email & Resend Link
          </Button>
        </Modal.Footer>
        
      </Modal>
   </>
    } 
    
    </>
  )
}

export default SendVerification