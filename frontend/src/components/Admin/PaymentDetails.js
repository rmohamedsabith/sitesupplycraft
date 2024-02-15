import React from "react";
import './PaymentDetails.css'

function PaymentDetails() {
  return (
    <div className="container">
      <div className="wrap">
        <div className="slot">
          <h3>Payment Id : </h3>
          <p>127676432</p>
        </div>

        <div className="slot">
          <h3>Date : </h3>
          <p>127676432</p>
        </div>

        <h1>Product Owner Details</h1>

        <div className="slot">
          <h3>ID : </h3>
          <p>A03</p>
        </div>

        <div className="slot">
          <h3>Name : </h3>
          <p>Sarath</p>
        </div>

        <div className="slot">
          <h3>Address : </h3>
          <p>No.70, Hindahenna, Rathnapura</p>
        </div>

        <h1>Product Details</h1>
        <div className="slot">
          <div className="image">
            <img src="https://foodbeverageasia.com/wp-content/uploads/2022/03/resized_Sugar-Bag.jpg" />
          </div>

          <div>
            <div className="slot">
              <h3>Name :</h3>
              <p>Puffled Sea Sand</p>
            </div>
            <div className="slot">
              <h3>Price :</h3>
              <p>Rs.1400</p>
            </div>

            <div className="slot">
              <h3>ID :</h3>
              <p>004</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
