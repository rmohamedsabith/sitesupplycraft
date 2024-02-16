import React, { useEffect } from 'react'
import Payment from './Payment'
import './update.css'
import { Link, useParams } from 'react-router-dom'
import { Col, Form, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import MetaData from '../Layouts/MetaData'
import{useDispatch, useSelector} from 'react-redux'
import {getProduct} from '../../actions/productActions'
import { getOwnerProducts } from '../../actions/productsActions'
import Loader from '../Loader'

const AddProduct = () => {

  const{isLoading,product}= useSelector((state)=>state.productState)
  const [keyword,setKeyword]=useState('')
  const {id}=useParams()
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getProduct(id,'product'))
  },[dispatch])



  /* USESTATE HOOKS */

  const [name,setName] =useState('');
  const [price,setPrice] =useState('');
  const [discount,setDiscount] = useState('');
  const [discript,setDiscript] = useState('');
  const [catagory,setCatagory] = useState('');
  const [images,setImages] =useState([]);
  const [previewImages,setPreviewImages]=useState([])
  const [selectedOption,setSelectedOption] =useState('sell');
  const[isRent,setIsRent]=useState(false);
  const[priceType,setPriceType] =useState('');

  const Categories=[
    'Masonry',
    'Metal',
    'Wood',
    'Plastics',
    'Glass',
    'Electrical',
    'Paints',
    'Tiles',
    'Machines',
    'Tools',
    'Plumbing'
  ]
  const[model,setmodel] = useState('')

  /* Get Data */

  

  useEffect(()=>{ 
    dispatch(getProduct)
  },[dispatch])
  
  useEffect(()=>{
       
    dispatch(getOwnerProducts(keyword))


  },[dispatch])

  

  /* ONCHANGE FUNCTIONS */
   const handleNameChange = (event) =>{
        setName(event.target.value);
   };

   const handlePriceChange = (event) =>{
    setPrice(event.target.value);
  };

  const handleDiscountChange = (event) =>{
    setDiscount(event.target.value);
  };

  const handleDiscriptChange = (event) =>{
    setDiscript(event.target.value);
  };

  const handleCatagoryChange = (event) =>{
    setCatagory(event.target.value);
    /* console.log(event.target.value); */
  };

  const handleRadioChange = (event) =>{
    setSelectedOption(event.target.value);
    /* console.log(event.target.value); */
  };

  const handleImageChange = (e) =>{
  
    const files = Array.from(e.target.files);
    files.forEach(file => {
        
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2 ) {
                setPreviewImages(oldArray => [...oldArray, reader.result])
                setImages(oldArray => [...oldArray, file])
            }
        }

        reader.readAsDataURL(file)
      })
  };

  const handlePriceTypeonChange = (event) =>{
    setPriceType(event.target.value);
    /* console.log(event.target.value); */
  };


          /* functions for buttons */
          /* privew button */
  
  const  handlePrivewButton = () =>{

      console.log("previwing the publishing item");
  }    
  
  
  return (
    <>
    <MetaData title={'Add Product'}/>
      <Row>
      <Col xs={2} style={{backgroundColor:'#176B87'}}>
      <div className='p-3'>
        <Link to={'/ProductOwner/DashBoard'}><button className='btn1'>DashBoard</button></Link>
        <Link to={'/ProductOwner/addProduct'}><button className='btn1'>Add Product</button></Link>
        <Link to='/ProductOwner/Messages'><button className='btn1'>Message</button></Link>
      </div>
      </Col>
      <Col className="addProduct">
      <div className='block'>
          <h1 className='styled-heading'>Edit Product Adverticement</h1>
          <br/>
        
 
                                    {/*FORM ELEMENTS*/}
           {isLoading?<Loader/>:
          <div>
            <Form className ='box'>

            <div>
              <label>Type:</label>
              <br/>
            
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={product.isRent} onClick={()=>setIsRent(false)} checked= {selectedOption==='sell'} onChange ={handleRadioChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">Sell</label>
              </div>
              <div className="form-check form-check-inline">
                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={product.isRent} onClick={()=>setIsRent(true)}  checked= {selectedOption==='rent'} onChange ={handleRadioChange} />
                   <label className="form-check-label" htmlFor="inlineRadio2">Rent</label>
              </div>
            
            </div>

            <br/>

            
              <div>
               
                <label>Name: </label>
              <Form.Control type="text" placeholder="Name" className='nameCs' value={product.name} onChange={handleNameChange } />
              </div>
            <br/>
            {
              isRent?
              <Row>
                <Col>
                <div>
              <label>Price:</label>
            <Form.Control type="text" placeholder="Price" value={product.price} onChange={handlePriceChange}/>
            </div>
                </Col>
                <Col>
                <div>
              <label>Price Type:</label>
               <Form.Select aria-label="Default select example" value={product.priceType} onChange={handlePriceTypeonChange} >
                  <option></option>
                  <option value='/perDay'>perDay</option>
                  <option value='/perMonth'>perMonth</option>
                  <option value='/perHour'>perHour</option>
                </Form.Select>
              </div>
                </Col>
              </Row>
              :
              <div>
              <label>Price:</label>
            <Form.Control type="text"  placeholder="Price" value = {product.price} onChange={handlePriceChange}/>
            </div>
            }
            

            <br/>

            <div>
              <label>Discount:</label>
            <Form.Control type="text" placeholder="Discount" value = {product.discount} onChange={handleDiscountChange} />
            </div>

            <br/>

            <div>
              <label>Discription:</label>
            
              <Form.Control
               value={product.description}
               onChange={handleDiscriptChange}
               as="textarea"
               placeholder="Discritption about the item"
               style={{ height: '100px' }}
             />
            
            </div>

               <br/>

              <div>
              <label>Catagory:</label>
              
               <Form.Select aria-label="Default select example" value={product.catagory} onChange={handleCatagoryChange} >
                  <option></option>
                {                 
                  Categories.map(
                    (cat,index)=>(            
                      <option key={index} value={cat}>{cat}</option>                
                    ))
                }
                </Form.Select>
              </div>

                <br/>

                <div>
                <label>Photos:</label>

                <Form.Group controlId="formFileLg" className="mb-3">
                 {/* <Form.Label>Large file input example</Form.Label> */}
                 <Form.Control type="file" size="lg" multiple={true} accept="image/*" onChange={handleImageChange} />
                </Form.Group>
                </div>
                  {previewImages.map(image=>(
                    <Image
                    className=" mb-3 mr-2 previewImg"
                    key={image}
                    src={image}
                    alt={`Image Preview`}
                    width="55"
                    height="52"
                  
                    />
                  ))}

              
                <div className="mb-2">
              <Row >
                  <Col>
                 <Button variant="primary" size="lg" onClick={handlePrivewButton}>
                    Priview
                 </Button>
                 </Col>

                <Col className = "d-flex justify-content-end">
                 <Button variant="primary" size="lg" >
                    Save
                 </Button>
                </Col>
              </Row>
                </div>
              

            
            </Form>
          </div>
}
        </div>
      </Col>
        
    </Row>
  
    </>
  )
}

export default AddProduct