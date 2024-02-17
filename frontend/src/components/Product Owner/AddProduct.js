import React from 'react'
import Payment from './Payment'
import './AddProduct.css'
import { Link } from 'react-router-dom'
import { Col, Form, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import MetaData from '../Layouts/MetaData'

const AddProduct = () => {

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
  const  handlePublishButton = () =>{

    console.log(" publishing item");
}    
  
  return (
    <div>
        AddProduct
        <Payment/>
    </div>
  )
}

export default AddProduct