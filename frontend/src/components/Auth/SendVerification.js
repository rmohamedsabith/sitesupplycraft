import React from 'react'
import { Button } from 'react-bootstrap';
import { ImMail4 } from "react-icons/im";
import email from '../../images/logo.jpeg';

const SendVerification = () => {
  return (
    <div className='container'>
      <div className='frame'>
        <img src={email} className='round-image'/>
        <h1>Verify your email address</h1>
        <p>We have sent a verification link to </p>
        <p>Click on the link to complete the verification process.</p>
        <p>You mighht need to check your spam folder</p>
        <Button className='btnstyle' style={{margin:'35px'}}>Resend email</Button>
        <Button className='btnstyle'>Change email address</Button>
      </div>
    </div>
    
  )
}

export default SendVerification