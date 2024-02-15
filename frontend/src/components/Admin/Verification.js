import React, { useState } from 'react';
import ProfilePicture from '../../images/Untitled-1.png';
import BRegistration from '../../images/BusinessRegistration.jpg';
import EBill from '../../images/electricitybill.jpg';
import './Verification.css';

const Verification = () => {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Function to toggle fullscreen image
  const toggleFullscreenImage = (image) => {
    setFullscreenImage(image);
  };

  return (
    <center>
      <hr />
      <h2><u>Account Details</u></h2>
      <div className="Details">
        <hr />
        <div className="row">
          <div className="col" onClick={() => toggleFullscreenImage(ProfilePicture)}>
            <img src={ProfilePicture} alt="Company profile" width="200" height="300" />
          </div>
          <div className="col">
            <form>
                  <label style={{marginBottom:'15px'}}  htmlFor="seller_id">Seller ID:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="full_name">Owner/Full Name:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="license_no">License No.:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="email">E-mail:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="phone_no">Phone No.:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="address">Address:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="address">Address:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="landmark">Landmark (Optional):</label><br/>
                </form>
          </div>
          <div className="col">
            <form className='verification'>
                        <input className="verificationInput"  style={{marginBottom:'10px'}} type="text" id="seller_id" name="seller_id" defaultValue={"S01"} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="full_name" name="full_name" defaultValue={"Mark Wood"} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="license_no" name="license_no" defaultValue={"ID1234567"} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="email" id="email" name="email" defaultValue={"Mark@gmail.com"} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="tel" id="phone_no" name="phone_no" defaultValue={"0763542567"} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="address" name="address" defaultValue={"153/2,Colombo 07"} required/> <br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="district" name="district" defaultValue={"Colombo"} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="landmark" name="landmark" defaultValue={"01"}/><br/>
                  </form>
          </div>
        </div>
        <div className="row">
          <div className="col" onClick={() => toggleFullscreenImage(BRegistration)}>
            <img src={BRegistration} alt="Business registration certificate" width="200" height="300" />
          </div>
          <div className="col" onClick={() => toggleFullscreenImage(EBill)}>
            <img src={EBill} alt="Current bill" width="250" height="150" />
          </div>
        </div>
      </div>
      {/* Display fullscreen image */}
      {fullscreenImage && (
        <div className="fullscreen-image-overlay" onClick={() => setFullscreenImage(null)}>
          <img src={fullscreenImage} alt="Fullscreen" className="fullscreen-image" />
        </div>
      )}
      <div className="row">
        <div className="col">
          <button className="verificationBtn" type="submit" name="approve">Approve</button>
        </div>
        <div className="col">
          <button className="verificationBtn" type="reset" name="cancel">Cancel</button>
        </div>
      </div>
    </center>
  );
};

export default Verification;
