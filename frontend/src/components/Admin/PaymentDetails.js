import React from "react";
import './PaymentDetails.css'
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { Col, Row } from "react-bootstrap";

function PaymentDetails() {
  const{paymentDetail,isLoading}=useSelector(state=>state.paymentState)

  return (
    <>
    {
      isLoading?<Loader/>
      :
      
      <div className="container">
      <div className="wrap">
      <h1>Payment Details</h1>
        <div className="slot">
          <h3>Payment Id : </h3>
          <p>{paymentDetail.paymentInfo.id}</p>
        </div>

        <div className="slot">
          <h3>Date : </h3>
          <p>{paymentDetail.paidAt.split("T")[0].replace(/-/g, "/")}</p>
        </div>
        <div className="slot">
          <h3>Time : </h3>
          <p>{paymentDetail.paidAt.split("T")[1].split(".")[0]}</p>
        </div>
        <div className="slot">
          <h3>Status : </h3>
          <p style={{color:'green'}}>{paymentDetail.paymentInfo.status}</p>
        </div>
        <div className="slot">
          <h3>Amount : </h3>
          <p>{`Rs.${paymentDetail.totalPrice}/= (Count-${paymentDetail.count})`}</p>
        </div>

        <h1>Product Owner Details</h1>
        <div className="d-flex justify-content-between">
        <div>
        <div className="slot">
          <h3>ID : </h3>
          <p>{paymentDetail.user._id}</p>
        </div>

        <div className="slot">
          <h3>Name : </h3>
          <p>{`${paymentDetail.user.firstname} ${paymentDetail.user.lastname}`}</p>
        </div>

        <div className="slot">
          <h3>Address : </h3>
          <p>{paymentDetail.user.address.number}, {paymentDetail.user.address.street}, {paymentDetail.user.address.city}, 
          {paymentDetail.user.address.district}-{paymentDetail.user.address.postalCode}</p>
        </div>
        </div>
        <div>
          <div className="rounded-circle">
            <img src={paymentDetail.user.profile} alt="Profile" height={100} width={100}/>
          </div>
        </div>
        </div>
       

        <h1>Product Details</h1>
        {
          paymentDetail.postedItems.map(product=>(
            <div className="slot" style={{borderBottom:'2px solid black',marginBottom:'20px', paddingBottom:'20px'}}>
              {console.log(product.images)}
          <div  style={{paddingRight:'20px'}}>
            <img src={product.images[0].image} width={100} height={100} />
          </div>

          <div>
            <div className="slot">
              <h3>Name :</h3>
              <p>{product.name}</p>
            </div>
            <div className="slot">
              <h3>Price :</h3>
              <p>Rs.{product.price}</p>
            </div>

            <div className="slot">
              <h3>ID :</h3>
              <p>{product._id}</p>
            </div>
          </div>
        </div>
          ))
        }
      </div>
    </div>
      
    }
    </>
  );
}

export default PaymentDetails;
