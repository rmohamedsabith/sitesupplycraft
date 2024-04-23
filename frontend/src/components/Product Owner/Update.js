import React, { useEffect } from 'react'
import './update.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Col, Form, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import MetaData from '../Layouts/MetaData'
import{useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'
import {updateProduct} from '../../actions/productActions'
import { toast } from 'react-toastify'
import { clearError } from '../../slices/productSlice';
import { getMessages } from '../../actions/messagesAction';

const Update = () => { 
  const{isLoading,product:ProductDetails,error,isProductUpdated}= useSelector((state)=>state.productState)
  const navigate = useNavigate();
  const {id}=useParams()
  const dispatch=useDispatch()
 
  const [name,setName] =useState(ProductDetails ? ProductDetails.name : "");
  const [price,setPrice] =useState(ProductDetails ? ProductDetails.price : "");
  const [discount,setDiscount] = useState(ProductDetails ? ProductDetails.discount : "");
  const [description,setDiscript] = useState( ProductDetails ? ProductDetails.description : "");
  const [category,setCatagory] = useState(ProductDetails ? ProductDetails.category:"");
  const [images,setImages] =useState(/* ProductDetails ? ProductDetails.images :  */[]);
  const [previewImages,setPreviewImages]=useState(/* ProductDetails ? ProductDetails.images :  */[])
  const [selectedOption,setSelectedOption] =useState( ProductDetails ? ProductDetails.type : "sell");
  const[isRent,setIsRent]=useState(ProductDetails ? ProductDetails.type === "rent" : false);
  const[priceType,setPriceType] =useState(ProductDetails ? ProductDetails.priceType : "");
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
 

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
    'Plumbing',
    'Others'
  ]

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [discriptionError, setDiscriptError] = useState("");
  const [catagoryError, setCatagoryError] = useState("");
  const [selectedOptionError, setSelectedOptionError] = useState("");
  const [priceTypeError, setPriceTypeError] = useState("");
  
  const [validated, setValidated] = useState(false);

  useEffect(()=>{
    if(isProductUpdated) 
    {
      toast.success('Successfully updated',{
        position:'bottom-center',
        onOpen:dispatch(clearError())
      })
      navigate('/ProductOwner/DashBoard')
    }
    else if(error)
    {
      toast.error(error,{
        position:'bottom-center',
        onOpen:dispatch(clearError())
      })
    }
  },[error,isProductUpdated,dispatch,navigate])

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };


  
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
  

    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      const remainingSlots = 5 - previewImages.length;
      const selectedImages = files.slice(0, remainingSlots); // ensure there are only 5 images
    
      if (files.length > 5 || files.length > remainingSlots) {
        alert("Only 5 images can be added");
      }
    
      selectedImages.forEach((file) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages((prevImages) => [...prevImages, file]);
            setPreviewImages((prevImages) => [...prevImages, reader.result]);
            
          }
        };
    
        reader.readAsDataURL(file);
      });
    };
    
  

  const handlePriceTypeonChange = (event) =>{
    setPriceType(event.target.value);
    /* console.log(event.target.value); */
  };


 
  const handleUpdate = () => {
    
    if (validateFields()) {
      /* if (!Array.isArray(ProductDetails)) {
        // Handle the case when product is not an array (e.g., not initialized yet)
        console.error("Product is not available or is not an array.");
        return;
      } */
      /* const updatedDetails = [...product];
      updatedDetails[activeTabIndex] = {
        name : name,
        price: price,
        discount: discount,
        description: description,
        category: category,
        images: previewImages,
        type: selectedOption,
        isRent: isRent,
        priceType: priceType,
        
      }; */
      //dispatch(updateProduct(updatedDetails));

      const formData=new FormData()
      name!==ProductDetails.name && formData.append('name' , name);
      formData.append('price' , price);
      formData.append('discount' , discount);
      formData.append('description' , description);
      formData.append('type' , selectedOption);
      formData.append('category' , category);
      images.length>0 && images.forEach (image => {
          formData.append('images', image)
      })
      if(selectedOption==='rent')
      {
        formData.append('priceType' , priceType);
      }
      console.log(formData)
      dispatch(updateProduct(id,formData))
    }    
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);

    const updatedFiles = [...images];
    updatedFiles.splice(index, 1);
    setImages(updatedFiles);
  };


  const handleImageClick = (index) => {
    setClickedImageIndex(index === clickedImageIndex ? null : index);

    console.log(clickedImageIndex);
  };
  const validateFields = () => {
    
    let isValid = true;

    if (name === "") {
      setNameError("***name is required***");
      isValid = false;
    } else {
      setNameError("");
    }
    if (!discount || isNaN(parseInt(discount))) {
      setDiscountError("***Discount is required***");
      isValid = false;
    } else {
      setDiscountError("");
    }
    

    if (description.trim() === "") {
      setDiscriptError("***Discription is required***");
      isValid = false;
    } else {
      setDiscriptError("");
    }

    if (category.trim() === "") {
      setCatagoryError("***catagory is required***");
      isValid = false;
    } else {
      setCatagoryError("");
    }

    /* if (previewImages.length === 0) {
      setPreviewImagesError("***images is required***");
      isValid = false;
    } else {
      setPreviewImagesError("");
    } */

    if (selectedOption.trim() === "") {
      setSelectedOptionError("***this feild is requird***");
      isValid = false;
    } else {
      setSelectedOptionError("");
    }

    if (!price || isNaN(parseInt(price))) {
      setPriceError("***this feild is requird***");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (selectedOption === "rent") {
      if (priceType.trim() === "") {
        setPriceTypeError("***price type  is required***");
        isValid = false;
      } else {
        setPriceTypeError("");
      }
    }

    return isValid;
  };

  const handleMessage=()=>{
    dispatch(getMessages).then(()=>navigate('/ProductOwner/Messages'))
  }

  
  return (
    <>
    <MetaData title={'Add Product'}/>
      <Row>
      <Col xs={2}  style={{backgroundColor:'#176B87',minHeight:'90vh'}}>     
      <div className='p-3'>
        <Link to={'/ProductOwner/DashBoard'}><button className='btn1'>DashBoard</button></Link>
        <Link to={'/ProductOwner/addProduct'}><button className='btn1'>Add Product</button></Link>
        <button className='btn1' onClick={handleMessage}>Message</button>
      </div> 
      </Col>
      <Col className="addProduct">
      <div className='block'>
          <h1 className='styled-heading'>Edit Product Adverticement</h1>
          <br/>
        
 
                                    {/*FORM ELEMENTS*/}
           {isLoading?<Loader/>:
          <div>
            <Form className ='box'  validated={validated} onSubmit={handleSubmit} >

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
            {selectedOptionError && (
                  <span className="error">{selectedOptionError}</span>
                )}
                <br />

            <br/>

            
              <div>
               
                <label>Name: </label>
              <Form.Control type="text" placeholder="Name" className='nameCs' value={name} onChange={handleNameChange} />
              </div>
             
              {nameError && <span className="error">{nameError}</span>}
            <br/>
            {
              isRent?
              <Row>
                <Col>
                <div>
              <label>Price:</label>
            <Form.Control type="text" placeholder="Price" value={price} onChange={handlePriceChange}/>
            
            </div>
            {priceError && (
                        <span className="error">{priceError}</span>
                      )}
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
                {priceTypeError && (
                        <span className="error">{priceTypeError}</span>
                      )}
              </div>
              
                </Col>
              </Row>
              :
              <div>
              <label>Price:</label>
            <Form.Control type="text"  placeholder="Price" value = {price} onChange={handlePriceChange}/>
            
            </div>
           
            }
            {priceError && (
                        <span className="error">{priceError}</span>
                      )}
            
            

            <br/>

            <div>
              <label>Discount:</label>
            <Form.Control type="text" placeholder="Discount" value = {discount} onChange={handleDiscountChange} />
            {discountError && (
                    <span className="error">{discountError}</span>
                  )}
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
            {discriptionError && (
                    <span className="error">{discriptionError}</span>
                  )}
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
                {catagoryError && (
                    <span className="error">{catagoryError}</span>
                  )}
              </div>

                <br/>

                <div>
                <label>Photos:</label>

                <Form.Group controlId="formFileLg" className="mb-3">
                 {/* <Form.Label>Large file input example</Form.Label> */}
                 <Form.Control type="file" size="lg" multiple={true} accept="image/*" onChange={handleImageChange} />
                </Form.Group>
                   <div className='d-flex'>
                  {previewImages.map((image, index) => (
                    <div key={index}>
                      <Image
                        className=" mb-3 mr-2 previewImg"
                        key={image}
                        src={image}
                        alt={`Image Preview`}
                        width="55"
                        height="52"
                        onClick={() => handleImageClick(index)}
                      />
                      {clickedImageIndex === index && (
                        <Button
                          style={{ border: "none" }}
                          variant="primary"
                          size="sm"
                          onClick={() => handleRemoveImage(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                 </div>               
                <div className="mb-2">
                  <Row >
                      <Col>
                  <Link to= {`/ProductOwner/DashBoard`} > <Button variant="primary" size="lg" >
                        cancel
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