import React, { useEffect, useState } from 'react'
import AddReview from '../Reviews/AddReview'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, reviews } from '../../actions/productActions'
import { toast } from 'react-toastify'
import Carousel from 'react-bootstrap/Carousel'
import Figure from 'react-bootstrap/Figure'
import Loader from '../Loader'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ProductReviews from './ProductReviews'
import { clearError, clearProduct, clearReviewSubmitted } from '../../slices/productSlice'
import { useParams } from 'react-router-dom'
import MetaData from '../Layouts/MetaData'


const ProductDetails = () => {
  const{isLoading,product,error,isReviewSubmitted}=useSelector((state)=>state.productState)
  const dispatch=useDispatch()
  const {id}=useParams() 
  const[isClicked,setIsClicked]=useState(false)
  const[selectedImage,setSelectedImage]=useState(null)

  const HandleClick=(image)=>{

      setIsClicked(true)
      setSelectedImage(image)
  }
  const handleCarouselSelect = (selectedIndex, e) => {
    if(!isClicked){
    const selectedImage = product.images[selectedIndex].image;
    setSelectedImage(selectedImage);
    }
  };

  useEffect(()=>{   
  
    if(isReviewSubmitted) {
      
      toast('Review Submitted successfully',{
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER,
          onOpen: () => dispatch(clearReviewSubmitted())
      })      
    }
    if(error) {
      return toast.error(error,{
          position: toast.POSITION.BOTTOM_CENTER,
          onOpen: ()=> { dispatch(clearError()) }
      })}
     
      dispatch(reviews(id))  

    return () => {
        dispatch(clearProduct())
    }
    
             
  },[dispatch,error,isReviewSubmitted,id])

  return (
    <div className='d-flex justify-content-center align-item-center'>
      <MetaData title={'Product'}/>
      {isLoading?<Loader/>:    
        <div className='card productFrame' onDoubleClick={()=>setIsClicked(false)} >
          <Container fluid={true}>
            <Row>
              <Col>               
                  <Carousel data-bs-theme="dark" style={{width:'100%',height:'50vh',zIndex:'0'}}onSelect={handleCarouselSelect}>
                    {!isClicked?
                      (product.images&&product.images.map((image)=>(
                        <Carousel.Item interval={2000} key={image.image}>
                        <img
                          width={300}
                          height={400}
                          className="d-block w-100 carouselImage"
                          src={image.image}
                          alt="First slide"
                        />
                        </Carousel.Item>
                      )))
                      :
                       <Carousel.Item>
                          <img  
                            width={400}
                            height={400}
                            className="d-block w-100 carouselImage"
                            src={selectedImage}
                            alt="First slide"
                          />
                        </Carousel.Item>
                    }

                  </Carousel>
                
                  {product.images&&product.images.map((image)=>(

                    <Figure.Image key={image.image}
                      className='smallImage'
                      style={{border:`${selectedImage === image.image ? '3px solid #fa9c23' : '1px solid #053B50'}`}}
                      alt="171x180"
                      src={image.image}
                      onClick={()=>HandleClick(image.image)}
                    />         
                  ))}
                
              </Col>
              <Col style={{margin:'30px'}}>
                <h1>{product.name}</h1> 
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${product.ratings/ 5 * 100}%`}}></div>
                  </div>
                  <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                </div>  
                <h3 style={{color:'red',display:'inline'}}>Rs.{product.price}</h3> 
                <h5 style={{textDecoration:'line-through',display:'inline-block',margin:'30px'}}>Rs.{product.discount}</h5><br/> 
                <h6 style={{color:'#1A9406'}}>{product.owner.shopName}</h6>
                <span style={{paddingLeft:'10px'}}>{product.owner.address.number}, {product.owner.address.street}, {product.owner.address.city}</span><br/>
                <span style={{paddingLeft:'12px'}}>{product.owner.address.district}-{product.owner.address.postalCode}</span><br/>                
                <span><a href={`mailto:${product.owner.email}`} style={{paddingLeft:'10px'}}>{product.owner.email}</a></span>
                <p style={{paddingLeft:'10px',color:'red'}}>{product.owner.phone}</p><br/>
                <Row>
                 <Col>
                <div style={{backgroundColor:'#1A9406', padding:'10px 20px',borderRadius:'20px',display:'inline-block'}}>
                   <FontAwesomeIcon icon={faWhatsapp} style={{ color: '#ffff', fontSize: '20px', paddingRight:'10px' }} />
                   <span style={{color:'#ffff'}}>Whatsapp</span>
                </div>
                </Col> 
                <Col>
                <AddReview/>
                </Col>
                
                </Row>
                <Row>
                  <div className='location'>
                        Find Location
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>         
          <div className='description'>
            <h2 style={{textDecoration:'underline'}}>Description</h2>
            <pre>{product.description}</pre>
          </div>
          <div className='description'>
           
            {
              product.numOfReviews>0?<ProductReviews/>:null
            }
            
          </div>
       
      </div>
      }


    </div>
  )
}

export default ProductDetails