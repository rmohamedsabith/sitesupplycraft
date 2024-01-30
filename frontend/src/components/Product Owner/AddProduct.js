import React from 'react'
import Payment from './Payment'
import './AddProduct.css'
import { Link } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'

const AddProduct = () => {


  /* USESTATE HOOKS */

  const [name,setName] =useState('');
  const [price,setPrice] =useState('');
  const [discount,setDiscount] = useState('');
  const [discript,setDiscript] = useState('');
  const [catagory,setCatagory] = useState('');
  const [images,setImages] =useState([]);
  const [selectedOption,setSelectedOption] =useState('sell');
  const[isRent,setIsRent]=useState(false);
  const[priceType,setPriceType] =useState('');


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

  const handleImageChange = (event) =>{
    setImages(event.target.files[0]);
    console.log(event.target.value);
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
  const  handlePublishButton = () =>{

    console.log(" publishing item");
}    
  
  return (

    <Row>
      <Col xs={2} className='sideb'>
      <div className='p-3'>
        <button className='btn1'>DashBoard</button>
        <button className='btn1'>Add Product</button>
        <Link to='../../ProductOwner/Messages'><button className='btn1'>Message</button></Link>
      </div>
      </Col>
      <Col className="addProduct">
      <div className='block'>
          <h1 className='styled-heading'>Product Adverticement</h1>
          <br/>
        
 
                                    {/*FORM ELEMENTS*/}
        

          <div>
            <Form className ='box'>

            <div>
              <label>Type:</label>
              <br/>
            
              <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="sell" onClick={()=>setIsRent(false)} checked= {selectedOption==='sell'} onChange ={handleRadioChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">Sell</label>
              </div>
              <div className="form-check form-check-inline">
                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="rent" onClick={()=>setIsRent(true)}  checked= {selectedOption==='rent'} onChange ={handleRadioChange} />
                   <label className="form-check-label" htmlFor="inlineRadio2">Rent</label>
              </div>
            
            </div>

            <br/>

              <div>
                <label>Name: </label>
              <Form.Control type="text" placeholder="Name" className='nameCs' value={name} onChange={handleNameChange } />
              </div>
            <br/>
            {
              isRent?
              <Row>
                <Col>
                <div>
              <label>Price:</label>
            <Form.Control type="number" placeholder="Price" value={price} onChange={handlePriceChange}/>
            </div>
                </Col>
                <Col>
                <div>
              <label>Price Type:</label>
               <Form.Select aria-label="Default select example" value={priceType} onChange={handlePriceTypeonChange} >
                  <option></option>
                  <option value="one">One</option>
                  <option value="two">Two</option>
                  <option value="three">Three</option>
                </Form.Select>
              </div>
                </Col>
              </Row>
              :
              <div>
              <label>Price:</label>
            <Form.Control type="number" placeholder="Price" value={price} onChange={handlePriceChange}/>
            </div>
            }
            

            <br/>

            <div>
              <label>Discount:</label>
            <Form.Control type="number" placeholder="Discount" value={discount} onChange={handleDiscountChange} />
            </div>

            <br/>

            <div>
              <label>Discription:</label>
            
              <Form.Control
               value={discript}
               onChange={handleDiscriptChange}
               as="textarea"
               placeholder="Discritption about the item"
               style={{ height: '100px' }}
             />
            
            </div>

               <br/>

              <div>
              <label>Catagory:</label>
               <Form.Select aria-label="Default select example" value={catagory} onChange={handleCatagoryChange} >
                  <option></option>
                  <option value="one">One</option>
                  <option value="two">Two</option>
                  <option value="three">Three</option>
                </Form.Select>
              </div>

                <br/>

                <div>
                <label>Photos:</label>

                <Form.Group controlId="formFileLg" className="mb-3">
                 {/* <Form.Label>Large file input example</Form.Label> */}
                 <Form.Control type="file" size="lg"   accept="image/*"  value={images} onChange={handleImageChange} />
                </Form.Group>
                </div>

                <br/>
              
                <div className="mb-2">
              <Row >
                  <Col>
                 <Button variant="primary" size="lg" onClick={handlePrivewButton}>
                    Priview
                 </Button>{' '}
                 </Col>

                <Col className = "d-flex justify-content-end">
                 <Button variant="primary" size="lg" onClick ={handlePublishButton}>
                    Publish
                 </Button>{' '}
                </Col>
              </Row>
                </div>
              

            
            </Form>
          </div>
          <Payment/>
        </div>
      </Col>
        
    </Row>
  )
}

export default AddProduct