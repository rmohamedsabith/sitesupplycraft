import React from 'react';
import Button from 'react-bootstrap/Button';
import icon from '../../images/Verified.png';

const VerifyingEmail = () => {

  return (
    <>
    <div className='container'>
      <div className='frame'>
        <img src={icon} className='round-image'/>
        <center>
        <h1>Email Verified</h1>
        <p>Your email address was succesfully verified</p>
        <Button>Back to Home</Button>
        </center>
      </div>
    </div>
    </>
  )
}

export default VerifyingEmail