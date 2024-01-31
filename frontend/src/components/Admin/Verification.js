import React from 'react'
import ProfilePicture from '../../images/Untitled-1.png'
import BRegistration from '../../images/BusinessRegistration.jpg'
import EBill from '../../images/electricitybill.jpg'
import './Verification.css'

const Verification = () => {
  
  return (
    <center>
      <hr/>
      <h2><u>Account Details</u></h2>
      <div className="Details">
      <hr/>
          <div className="container">
            <div className="row">
              <div className="col">
                <img src={ProfilePicture} alt="Company profile" width="200" height="300"/>
      
              </div>
              
                
                <div className="col">
                <form>
                  <label htmlFor="seller_id">Seller ID:</label><br/>
                  <label htmlFor="full_name">Owner/Full Name:</label><br/>
                  <label htmlFor="license_no">License No.:</label><br/>
                  <label htmlFor="email">E-mail:</label><br/>
                  <label htmlFor="phone_no">Phone No.:</label><br/>
                  <label htmlFor="address">Address:</label><br/>
                  <label htmlFor="address">Address:</label><br/>
                  <label htmlFor="landmark">Landmark (Optional):</label><br/>
                </form>
                </div>
                        
                <div className="col">   
                <form>
                        <input type="text" id="seller_id" name="seller_id" defaultValue={"S01"} required/><br/>
                        <input type="text" id="full_name" name="full_name" defaultValue={"Mark Wood"} required/><br/>
                        <input type="text" id="license_no" name="license_no" defaultValue={"ID1234567"} required/><br/>
                        <input type="email" id="email" name="email" defaultValue={"Mark@gmail.com"} required/><br/>
                        <input type="tel" id="phone_no" name="phone_no" defaultValue={"0763542567"} required/><br/>
                        <input type="text" id="address" name="address" defaultValue={"153/2,Colombo 07"} required/> <br/>
                        <input type="text" id="district" name="district" defaultValue={"Colombo"} required/><br/>
                        <input type="text" id="landmark" name="landmark" defaultValue={"01"}/><br/>
                        </form>
                </div>   

                
                
              
            </div>
            <div className="row">
              <div className="col">
              <br/><br/><br/>
                <label htmlFor="business_registration_certificate">Business Registration Certificate:</label><br/><br/>
                <img src={BRegistration} alt="Company profile" width="200" height="300"/>
              </div>
              
              <div className="col">
              <br/><br/><br/>
                <label htmlFor="current_bill">Current Bill:</label><br/><br/>
                <img src={EBill} alt="Company profile" width="250" height="150"/>
              </div>
            
            </div>
          </div>


      </div>
            <div className="row">
              <div className="col">
                  <button type="submit" name="approve">Approve</button>
              </div>
              <div className="col">
                  <button type="reset" name="cancel">Cancel</button> 
              </div>
            </div>
    </center>


  )
}

export default Verification
