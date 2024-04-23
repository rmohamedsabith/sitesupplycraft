import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react';
import{useDispatch, useSelector} from 'react-redux'
import { Line } from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler,ArcElement} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { getOwnerProducts, getTotal_per_month } from '../../actions/productsActions'
import Loader from '../Loader'
import './DashBoard.css'
import { changeStatus, getProduct } from '../../actions/productActions';
import {deleteProduct} from '../../actions/productActions'

import MetaData from '../Layouts/MetaData'
import { Alert, Col, Image, Row } from 'react-bootstrap'
import { getMessages } from '../../actions/messagesAction';


ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler,ArcElement
)


const DashBoard = () => {
  
  const{isLoading,products,ActiveProducts,DeactiveProducts,count,error,data:DATA} = useSelector((state)=> state.productsState)
  const {products:addProducts}=useSelector(state=>state.productState)
  const {user}=useSelector((state)=>state.authState)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [keyword,setKeyword]=useState('')
  const [status, setStatus] = useState(false);

  useEffect(()=>{
    dispatch(getTotal_per_month)
  },[dispatch])
  


  useEffect(()=>{
        dispatch(getOwnerProducts(keyword))
  },[dispatch,status,addProducts,keyword])

 



    const data = {
      labels:DATA? Object.entries(DATA).map(([key, value]) => key):[],
      datasets: [
        {
          label: "Posted Product",
          data: DATA? Object.entries(DATA).map(([key, value]) => value):[],
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
          
          borderWidth: 2,
          fill: true,
        },
        
        
      ],
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

      

  

    const toggleEyeOpen = (id) => {
    setStatus(!status);
    dispatch(changeStatus(id,'Active'))
    
    };
    const toggleEyeClose= (id) => {
    setStatus(!status);
    dispatch(changeStatus(id,'Deactive'))
    
    };
    const handleEdit=(id)=>{
      dispatch(getProduct(id,'product')).then(()=>navigate(`/ProductOwner/${id}/edit`))
    }

    const handleClick=()=>{
      dispatch(getOwnerProducts(keyword))
    }

    const handledelete =async(id)=>{

      if(window.confirm("Do you Want to delete Product?")){
      await dispatch(deleteProduct(id));
      dispatch(getOwnerProducts(keyword))
    }
    }

    const handleMessage=()=>{
      dispatch(getMessages).then(()=>navigate('/ProductOwner/Messages'))
    }
    const handleNonVerifiedUser=()=>{
      window.alert('User is not verified yet')
    }

  
  
  return (
    <>
    <MetaData title={'DashBoard'}/>
    
    <div className='page '>
  
    <Row>
      
      <Col xs={2}  style={{backgroundColor:'#176B87',minHeight:'90vh'}}>     
      <div className='p-3'>
        <Link to={'/ProductOwner/DashBoard'}><button className='btn1'>DashBoard</button></Link>
        {user.status==='verified'?<Link to={'/ProductOwner/addProduct'}><button className='btn1'>Add Product</button></Link>:<button className='btn1' onClick={handleNonVerifiedUser}>Add Product</button>}
        <button className='btn1' onClick={handleMessage}>Message</button>
      </div> 
      </Col>

      
     
      <Col className='con' >
      <div className='bodyDashboard'> 
        <h1>Summary of My Products</h1>      
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
        
          <div className='table d-flex flex-column'>
            <h1>My Products</h1><br></br>
            
            <div className='textsearch'>
              Search Name: <input type="text"
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
              ></input>
              <button className='btn2' onClick={handleClick}  >Search</button>
            </div>

            {!error?
              isLoading?<Loader/>:
                  <div className='table'>
                  <table id="dtBasicExample" className="productownretable"  cellSpacing="0" width="100%" height = "100%">
              <thead>
                <tr>
                  <th className ='th-sm' >Photos
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
                      <td><Image src={item.images[0].image}alter='pic' className='imp'/></td>
                      <td>{item._id}</td>
                      <td >{item.name}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td style={{color:'green'}}>{statuscolor(item.status)}</td>
                      <td>
                    <button className='btn'  onClick={()=>handleEdit(item._id)}>Edit</button>
                    <button className='btn' onClick={()=>handledelete(item._id)}>Delete</button>
                    
                    {item.status==='Active' ?
                      <button onClick={()=>toggleEyeClose(item._id)} className='btnicon' ><FontAwesomeIcon icon= {faEye} className='iconeye' /></button>
                      :
                      <button onClick={()=>toggleEyeOpen(item._id)} className='btnicon' ><FontAwesomeIcon icon={faEyeSlash} className='iconeye' /></button>
                    }
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
              :
                <div className='con'>
                  <h3><center style={{color:'red'}}>{error}</center></h3>
                </div>         
              }        
          </div>
           
    
      </div>   
   
      </Col>
     
    </Row>
    </div>
 

    </>
    
  )
}

export default DashBoard