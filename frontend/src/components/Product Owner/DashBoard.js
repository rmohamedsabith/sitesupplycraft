import React from 'react'
import Products from './Products'
import images1 from '../../images/images1.jpg'
import {Link} from 'react-router-dom'
import image1 from '../../images/image1.png'
import image2 from '../../images/image2.png'
import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler,ArcElement} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler,ArcElement
)


const DashBoard = () => {
  
    const data = {
      labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Posted Product",
          data: [10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
          backgroundColor: '#176B87',
          borderColor: '#053B50',
          tension: 0.4,
          fill: true,
          pointStyle: 'rect',
          pointBorderColor: 'blue',
          pointBackgroundColor: '#fff',
          showLine: true
        }
      ]
    };
    const data1={

      labels: ['Actvated product', 'Deactivated Product' ],
    datasets: [
      {
        label: 'pie Chart Data',
        data: [12, 19],
        borderColor: '#053B50',
        borderWidth: 2,
        fill: false,
      }
    ]

    };
  
  return (
    <>
    
    <div className='page'>
      <div className='sideb'>
        <button className='btn1'>DashBoard</button>
        <button className='btn1'>Add Product</button>
        <Link to='../../ProductOwner/Messages'><button className='btn1'>Message</button></Link>

      </div>
      <div className='con'> <h1>Summary Of My Products</h1>
      
      <div className="linechart">
      <Line data={data}/>
      <div className='phara1'>
          <h2>Posted Product</h2>
      </div>

    </div>

      <div className='piechart'>
        <Pie data={data1}/>
        <div className='phara2'>
          <h2>Activation</h2>
      </div>
      </div>

      
    
      <div className='table'>
        <h1>My Products</h1><br></br>
        
        <div className='textsearch'>
        Search Name: <input type='text'></input></div>


<table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
  <thead>
    <tr>
    <th className ='th-sm'>Photos
      </th>
      <th className ='th-sm'>Product Id
      </th>
      <th className='th-sm'>Product Name
      </th>
      <th className ='th-sm'>Date
      </th>
      <th className ='th-sm'>Status
      </th>
      <th className='th-sm'>Option
      </th>
      
      
     
    </tr>
  </thead>
  <tbody>
   
   
    <tr>
    <td><img src = {images1} className='im1'></img></td>
      <td>P01</td>
      <td>Hammer</td>
      <td>2024/01/01</td>
      <td>Activate
      

      </td>
      <td>
        <button className='btn'>Edit</button>
        <button className='btn'>Delete</button>
        {/* <img src = {image1} className='im2'></img> */}
        <FontAwesomeIcon icon={faEye}  />
      </td>
      </tr>
      
      <tr>
    <td><img src = {images1} className='im1'></img></td>
      <td>P02</td>
      <td>Hammer</td>
      <td>2024/02/01</td>
      <td>Deactivate</td>
      <td>
        <button className='btn'>Edit</button>
        <button className='btn'>Delete</button>
        {/* <img src = {image1} className='im2'></img> */}
        <FontAwesomeIcon icon={faEyeSlash} />
      </td>
      </tr>

      <tr>
    <td><img src = {images1} className='im1'></img></td>
      <td>P03</td>
      <td>Hammer</td>
      <td>2024/01/20</td>
      <td>Activate</td>
      <td>
        <button className='btn'>Edit</button>
        <button className='btn'>Delete</button>
        {/* <img src = {image1} className='im2'></img> */}
        <FontAwesomeIcon icon={faEye}  />
      </td>
      </tr>

      <tr>
    <td><img src = {images1} className='im1'></img></td>
      <td>P04</td>
      <td>Hammer</td>
      <td>2024/01/28</td>
      <td>Activate</td>
      <td>
        <button className='btn'>Edit</button>
        <button className='btn'>Delete</button>
        {/* <img src = {image1} className='im2'></img> */}
        <FontAwesomeIcon icon={faEye}  />
      </td>
      </tr>
    
    
    
  </tbody>
  <tfoot>
    <tr>
      <th>Photos
      </th>
      <th>Product Id
      </th>
      <th>Product Name</th>
      <th>Date
      </th>
      <th>Status
      </th>
      <th>Option
        </th>
      

      
    </tr>
  </tfoot>
</table>
  </div>   
      
      </div>
      
    </div>
    </>
    
  )
}

export default DashBoard