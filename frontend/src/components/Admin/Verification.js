import React, { useEffect, useState } from 'react';
import ProfilePicture from '../../images/Untitled-1.png';
import BRegistration from '../../images/BusinessRegistration.jpg';
import EBill from '../../images/electricitybill.jpg';
import './Verification.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOwner, verifyOwner, viewProcessingOwner } from '../../actions/adminActions';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import { clearError } from '../../slices/adminSlice';

const Verification = () => {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const {isLoading,user,error,message}=useSelector((state)=>state.adminState)
  const{id}=useParams();
  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(viewProcessingOwner(id))
  },[id,dispatch])

  useEffect(()=>{
    if(error){
      return toast.error(error,{
        position:'bottom-center',
        onOpen:()=>clearError()
      })
    }
    else if(message){
      navigate('/admin/verifications')
      toast.success(message,{
        position:'bottom-center',
        onOpen:()=>clearError()
      })
    }
    return
  },[dispatch,error,message])

  // Function to toggle fullscreen image
  const toggleFullscreenImage = (image) => {
    setFullscreenImage(image);
  };

  const handleApprove=()=>{
    dispatch(verifyOwner(id))
  }

  const handleCancel=()=>{
    dispatch(cancelOwner(id))
  }

  return (
    <>
    {isLoading?<Loader/>
      :
      <center>
      <hr />
      <h2><u>Account Details</u></h2>
      <div className="Details">
        <hr />
        <div className="row">
          <div className="col-3 ml-3" onClick={() => toggleFullscreenImage(user?.profile)}>
            <img src={user?.profile} alt="Company profile" width="250" height="250" />
          </div>
          <div className="col-3">
            <form>
                  <label style={{marginBottom:'15px'}}  htmlFor="seller_id">Seller ID:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="full_name">Owner/Full Name:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="Shop Registration No">Shop Registration No:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="email">E-mail:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="phone_no">Phone No.:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="address">Address:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="city">City:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="district">District:</label><br/>
                  <label style={{marginBottom:'15px'}} htmlFor="landmark">Postal Code :</label><br/>
                </form>
          </div>
          <div className="col-5">
            <form className='verification'>
                        <input className="verificationInput"  style={{marginBottom:'10px'}} type="text" id="seller_id" name="seller_id" defaultValue={user?._id} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="full_name" name="full_name" defaultValue={user?.firstname+" "+user?.lastname} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="license_no" name="license_no" defaultValue={user?.shopReg_no} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="email" id="email" name="email" defaultValue={user?.email} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="tel" id="phone_no" name="phone_no" defaultValue={user?.phone} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="address" name="address" defaultValue={user?.address.number+" "+user?.address.street} required/> <br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="address" name="city" defaultValue={user?.address.city} required/> <br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="district" name="district" defaultValue={user?.address.district} required/><br/>
                        <input className="verificationInput" style={{marginBottom:'10px'}} type="text" id="landmark" name="landmark" defaultValue={user?.address.postalCode}/><br/>
                  </form>
          </div>
        </div>
        <div className="row">
          <div className="col" onClick={() => toggleFullscreenImage(user?.certificate)}>
            <img src={user?.certificate} alt="Business registration certificate" width="200" height="300" />
          </div>
          <div className="col" onClick={() => toggleFullscreenImage(user?.currentBill)}>
            <img src={user?.currentBill} alt="Current bill" width="250" height="150" />
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
          <button className="verificationBtn" type="submit" name="approve" onClick={handleApprove}>Approve</button>
        </div>
        <div className="col">
          <button className="verificationBtn" type="reset" name="cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </center>
    }
    </>
  );
};

export default Verification;
