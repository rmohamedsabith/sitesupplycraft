import React from 'react'
import Verification from './Verification'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


const Verifications = () => {
  return (
<div>
<div class="w3-sidebar w3-bar-block" style={{width:'25%'}}>
  <a href="#" class="w3-bar-item w3-button">DashBoard</a>
  <a href="#" class="w3-bar-item w3-button">Add Product</a>
  <a href="#" class="w3-bar-item w3-button">Message</a>
</div>


<div style={{marginLeft:'25%'}}>


    <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Name</th>
      <th scope="col">Status</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">2023/12/20</th>
      <td>jayantha</td>
      <td>Processing</td>
      <td><button type="button" class="btn btn-outline-dark">Dark</button></td>
    </tr>
  </tbody>
</table>

</div>
</div>
  )
}

export default Verifications


