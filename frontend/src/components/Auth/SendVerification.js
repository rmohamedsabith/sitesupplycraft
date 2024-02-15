import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import icon from '../../images/logo.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAuthError } from '../../actions/authActions';
import Loader from '../Loader';

const SendVerification = () => {
  const {isLoading,error, message}=useSelector((state)=>state.authState)
  /* const location = useLocation(); */
  const [show, setShow] = useState(false);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('');

  useEffect(()=>{
    if(message) {
      return toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },[message])

 

  const changeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleResendLink = async () =>{
    dispatch()
  };

  return (
    <>
     {/*  {isLoading? <Loader/>:
      <> */}
    <div className='container'>
      <div className='frame'>
        <img src={icon} className='round-image'/>
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
                onChange={changeEmail}
                placeholder={email}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={verifyEmail}>
            Send Verification Email
          </Button>
        </Modal.Footer>
        
      </Modal>
  {/*   </>
    } */}
    
    </>
  )
}

export default SendVerification