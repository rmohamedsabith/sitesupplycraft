
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Table } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 
import './Verifications.css'
import React, { useState } from 'react';

function handleClick() {
  // Function logic here
}

function Verifications() {  
  
  const [keyword,setKeyword]=useState('')
  const [status, setStatus] = useState(false);


  
  return (  
    <>  
    <div className='textsearch'>
        Search Name: <input type="text"
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
        ></input>
        <button className='btn2' onClick={handleClick}  >Search</button></div>

    <div className='p-5'>  
  <Table striped bordered hover>  
  <thead>  
    <tr>  
      <th><b>Date</b></th>  
      <th><b>Name</b></th>  
      <th><b>Status</b></th>  
      <th><b>Option</b></th>  
    </tr>  
  </thead>  
  <tbody>  
    <tr>  
      <td>2023/12/11</td>  
      <td>John</td>  
      <td>Processing</td>  
      <td><Link to={'1'} className="buttonDark">View</Link></td>  
    </tr>  
    <tr>  
      <td>2023/12/10</td>  
      <td>Nuwan</td>  
      <td>Processing</td>  
      <td><Link to={'1'} className="buttonDark">View</Link></td> 
    </tr>  
    <tr>  
      <td>2023/12/10</td>  
      <td>Nuwan</td>  
      <td>Processing</td>  
      <td><Link to={'1'} className="buttonDark">View</Link></td> 
    </tr>  
    <tr>  
      <td>2023/12/10</td>  
      <td>Nuwan</td>  
      <td>Processing</td>  
      <td><Link to={'1'} className="buttonDark">View</Link></td> 
    </tr>  
    <tr>  
      <td>2023/12/10</td>  
      <td>Nuwan</td>  
      <td>Processing</td>  
      <td><Link to={'1'} className="buttonDark">View</Link></td> 
    </tr>  
   
  </tbody>  
</Table>  
</div>  
    </>  
    
  );  
}  
export default Verifications;  