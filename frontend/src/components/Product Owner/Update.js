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
import Loader from '../Loader'
import {updateProduct} from '../../actions/productActions'

const Update = () => {

  const{isLoading,product}= useSelector((state)=>state.productState)
  const {id}=useParams()
  const dispatch=useDispatch()


  useEffect(()=>{
    dispatch(getProduct(id,'product'))
  },[dispatch,id])
 
  const [name,setName] =useState();
  const [price,setPrice] =useState('');
  const [discount,setDiscount] = useState('');
  const [description,setDiscript] = useState('');
  const [category,setCatagory] = useState('');
  const [images,setImages] =useState([]);
  const [previewImages,setPreviewImages]=useState([])
  const [selectedOption,setSelectedOption] =useState('sell');
  const[isRent,setIsRent]=useState(false);
  const[priceType,setPriceType] =useState('');
  const[type , setType] = useState('');
  

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
  
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDiscount(product.discount);
      setDiscript(product.description);
      setCatagory(product.category);
      setSelectedOption(product.isRent ? 'rent' : 'sell');
      setIsRent(product.isRent);
      setPriceType(product.priceType);
      setPreviewImages(product && product.images);
      setImages(product.images)
    }
  }, [product]);

  /* Get Data */

  useEffect(()=>{
    dispatch(updateProduct)
  },[dispatch])

  
  /* ONCHANGE FUNCTIONS */
  const handleNameChange = (event) =>{
    setName(event.target.value);
    console.log(event.target.value)
  };

  

   const handlePriceChange = (event) =>{
    setPrice(event.target.value);
    console.log(event.target.value)
  };

  const handleDiscountChange = (event) =>{
    setDiscount(event.target.value);
    console.log(event.target.value)
  };

  const handleDiscriptChange = (event) =>{
    setDiscript(event.target.value);
    console.log(event.target.value)
  };

  const handleCatagoryChange = (event) =>{
    setCatagory(event.target.value);
    /* console.log(event.target.value); */
  };

  
    /* console.log(event.target.value); */
  

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


 
  const handleUpdate = () => {
    // Prepare updated product data
    const updatedProduct = {
      _id: id,
      name,
      price,
      discount,
      description,
      category,
      isRent,
      priceType,
      images,
    };

    dispatch(updateProduct(updatedProduct));
  };
  
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
            <Form className ='box' noValidate validated={validated} onSubmit={handleSubmit} >

            <div>
              <label>Type:</label>
              <br/>
            
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={isRent} onClick={()=>setIsRent(false)} checked= {selectedOption==='sell'} onChange={() => {
                          setSelectedOption('sell');
                          setIsRent(false);
                        }}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">Sell</label>
              </div>
              <div className="form-check form-check-inline">
                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={isRent} onClick={()=>setIsRent(true)}  checked= {selectedOption==='rent'} onChange={() => {
                          setSelectedOption('rent');
                          setIsRent(true);
                        }} />
                   <label className="form-check-label" htmlFor="inlineRadio2">Rent</label>
              </div>
            
            </div>

            <br/>

            
              <div>
               
                <label>Name: </label>
              <Form.Control type="text" placeholder="Name" className='nameCs' value={name} onChange={handleNameChange} />
              </div>
            <br/>
            {
              isRent?
              <Row>
                <Col>
                <div>
              <label>Price:</label>
            <Form.Control type="text" placeholder="Price" value={price} onChange={handlePriceChange}/>
            </div>
                </Col>
                <Col>
                <div>
              <label>Price Type:</label>
               <Form.Select aria-label="Default select example" value={priceType} onChange={handlePriceTypeonChange} >
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
            <Form.Control type="text"  placeholder="Price" value = {price} onChange={handlePriceChange}/>
            </div>
            }
            

            <br/>

            <div>
              <label>Discount:</label>
            <Form.Control type="text" placeholder="Discount" value = {discount} onChange={handleDiscountChange} />
            </div>

            <br/>

            <div>
              <label>Discription:</label>
            
              <Form.Control
               value={description}
               onChange={handleDiscriptChange}
               as="textarea"
               placeholder="Discritption about the item"
               style={{ height: '100px' }}
             />
            
            </div>

               <br/>

              <div>
              <label>Catagory:</label>
              
               <Form.Select aria-label="Default select example" value={category} onChange={handleCatagoryChange} >
                  <option></option>
                {                 
                 Categories &&  Categories.map(
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
                {previewImages && previewImages.map((image, index) => (
    <Image
        className="image-box"
        key={index}
        src={image}
        alt={`Image Preview `}
        width="55"
        height="52"
    />
))}
</div>
                  

              
                <div className="mb-2">
              <Row >
                  <Col>
               <Link to= {`/Product/${id}`} > <Button variant="primary" size="lg" >
                    Priview
                 </Button>
              </Link>
                 </Col>

                <Col className = "d-flex justify-content-end">
                 <Button variant="primary" size="lg" onClick={handleUpdate}>
                    Update
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

export default Update