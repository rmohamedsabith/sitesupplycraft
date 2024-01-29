import React, { useEffect } from 'react'
import images1 from '../../images/images1.jpg'
import {Link} from 'react-router-dom'
import {useState} from 'react';
import{useDispatch, useSelector} from 'react-redux'
import { Line } from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler,ArcElement} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { getOwnerProducts } from '../../actions/productsActions'
import Loader from '../Loader'
import './DashBoard.css'

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler,ArcElement
)


const DashBoard = () => {

  const{isLoading,products,ActiveProducts,DeactiveProducts} = useSelector((state)=> state.productsState)
  const dispatch=useDispatch()
  const [keyword,setKeyword]=useState('')

  useEffect(()=>{
       
    dispatch(getOwnerProducts(keyword))

  },[])



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
    const data1 = {
      labels: ['Activated Product', 'Deactivated Product'],
      
      datasets: [
        {
          label: ['Activated Products','DeActivate Products'],
          data: [ActiveProducts,DeactiveProducts],
          backgroundColor: [
            "#12AD2B",
            "#E41B17",
          ],
          borderColor: '#053B50',
          borderWidth: 2,
          fill: true,
        },
        
        
      ],
    };


    
      
      const monthdata = (timestamp) => {
        const dateObject = new Date(timestamp);
        const month = dateObject.getMonth() + 1;
      
        return `${month}`;
      };
  
    const formatDate = (timestamp) => {
      const dateObject = new Date(timestamp);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
    
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };
    
    const statuscolor = (status) => {
      if (status === 'Deactive') {
        return <p className='statusde'>Deactive</p>;
      }
    else{
      return <p className='statusa'>Active</p>
    }};

      const imagesize = (image)=>{
        return <img src = 'image' className='imp'/>
      };

      

      const searchPro = (name) => {
        if (products) {
          return products.map((item) => {
            if (item.name === name) {
              return (
                <div key={item.id}>
                  {item.name}
                </div>
              );
            } else {
              return null;
            }
          });
        } else {
          return null;
        }
      };

      const handleSearchInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const [status, setStatus] = useState('');
    const [isEyeOpen, setIsEyeOpen] = useState('');

    const toggleEye = () => {
      setIsEyeOpen(!isEyeOpen);
      setStatus();
    
    };


    const toggleeye2 = (isEyeOpen) => {
      if (isEyeOpen) {
        return <p className='statusde'>Active</p>;
      } else {
        return <p className='statusde'>Deactive</p>;
      }
    };
    const handleClick=()=>{
      dispatch(getOwnerProducts(keyword))
    }
  
  
  return (
    <>
    {isLoading? <Loader/>: 
    <div className='page'>
      <div className='sideb'>
        <button className='btn1'>DashBoard</button>
       <Link to = '../../ProductOwner/addProduct'> <button className='btn1'>Add Product</button></Link>
        <Link to='../../ProductOwner/Messages'><button className='btn1'>Message</button></Link>

      </div>
      <div className='con'> <h1>Summary of My Products</h1>
      
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
        Search Name: <input type="text"
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
        ></input>
        <button className='btn2' onClick={handleClick}  >Search</button></div>

        


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
      {products && products.map((item) => (
        <tr key={item._id}>
          <td><img src={item.images[0].image}alter='pic' className='imp'/></td>
          <td>{item._id}</td>
          <td >{item.name}</td>
          <td>{formatDate(item.createdAt)}</td>
          <td>{statuscolor(item.status)}</td>
          <td>
          <Link to = '..\..\ProductOwner/addProduct/Preview'><button className='btn'>Preview</button></Link>
        <button className='btn'>Delete</button>
        {/* <img src = {image1} className='im2'></img> */}
        <button onClick={toggleEye} className='btnicon' ><FontAwesomeIcon icon={isEyeOpen ? faEye : faEyeSlash} className='iconeye' /></button>
      </td>
        </tr>))
      
    }
   
    
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
}
    </>
    
  )
}

export default DashBoard