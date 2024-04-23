import React, { useEffect, useState } from 'react'
import AddReview from '../Reviews/AddReview'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Carousel from 'react-bootstrap/Carousel'
import Figure from 'react-bootstrap/Figure'
import Loader from '../Loader'
import { Col,Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ProductReviews from './ProductReviews'
import { clearError,clearReviewSubmitted } from '../../slices/productSlice'
import { Link, useParams } from 'react-router-dom'
import MetaData from '../Layouts/MetaData'
import { reviews } from '../../actions/productActions'
import { addFavourite, deleteOne} from '../../actions/usersActions'
import {clearData} from '../../slices/usersSlice'
import { loadUser } from '../../actions/authActions'
import { faHeart as heart,faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faHeart} from '@fortawesome/free-regular-svg-icons'

const ProductDetails = () => {
  const {user}=useSelector((state)=>state.authState)
  const{isLoading:userLoading,success}=useSelector((state)=>state.usersState)
  const{isLoading:ProductLoading,product,error:productError,isReviewSubmitted}=useSelector((state)=>state.productState)
  const {model,isLoading}=useSelector((state)=>state.productsFilteringState)
  const dispatch=useDispatch()
  const {id}=useParams() 
  const[isClicked,setIsClicked]=useState(false)
  const[selectedImage,setSelectedImage]=useState(null)

  const HandleClick=(image)=>{
      setIsClicked(true)
      setSelectedImage(image)
  }
  const handleCarouselSelect = (selectedIndex, e) => {
    if (!isClicked) {
      const selectedImage = product.images[selectedIndex].image;
      setSelectedImage(selectedImage);
    }
  };
  useEffect(()=>{

  },[model])
  useEffect(()=>{
    if(success) {      
        toast.success('Successfully added to favourite',{
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearData())
        }) }


  },[dispatch,success])

  useEffect(()=>{     
    if(isReviewSubmitted) {
      
      toast('Review Submitted successfully',{
          type: 'success',
          position: toast.POSITION.BOTTOM_CENTER,
          onOpen: () => dispatch(clearReviewSubmitted())
      })      
    }    
    
    if(productError) {
      toast.error(productError,{
          position: toast.POSITION.BOTTOM_CENTER,
          onOpen: ()=> { dispatch(clearError()) }
      })}
    
    let type
    if(model!=='laborers')type='product'
              else type='laborer'
      dispatch(reviews(id,type))  

                   
  },[dispatch,isReviewSubmitted,id,model,productError])

  const handleCart=async()=>{
    await dispatch(addFavourite(model,id))
    dispatch(loadUser)
   
  }
  const handleDeleteOne=async()=>{
    await dispatch(deleteOne(model,id))
    dispatch(loadUser)
  }
  return (
    <div className='d-flex justify-content-center align-item-center'>
      <MetaData title={'Product'}/>
      {ProductLoading||userLoading||isLoading?<Loader/>:    
      <div className='card productFrame' onDoubleClick={()=>setIsClicked(false)} >
            <Row>
              {model!=='laborers'?
              <>
              <Col>               
                  <Carousel data-bs-theme="dark" style={{width:'90%',height:'50vh',zIndex:'0'}}onSelect={handleCarouselSelect}>
                    {!isClicked?
                      (product.images&&product.images?.map((image)=>(
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
                <Row>
                  <Col>
                    <h1>{product.name}</h1>
                  </Col>
                  <Col xs={3}>
                    <Row>
                      <Col>
                        {user.carts?.products.length>0&&user.carts?.products.some((cart)=>{return cart._id===id})?
                        <FontAwesomeIcon icon={heart} style={{fontSize:'25px',color:'red',cursor:'pointer'}} onClick={handleDeleteOne}/>:
                        <FontAwesomeIcon icon={faHeart} style={{fontSize:'25px',cursor:'pointer'}} onClick={handleCart}/>
                        }
                      </Col>
                      <Col>
                      <FontAwesomeIcon icon={faShareNodes} style={{fontSize:'25px'}}/>
                      </Col>
                    </Row>
                  </Col>
                </Row>
               
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner" style={{width:`${product.ratings/ 5 * 100}%`}}></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
              </div>  
              <h3 style={{color:'red',display:'inline'}}>Rs.{product.price}</h3> 
              <h5 style={{textDecoration:'line-through',display:'inline',margin:'30px'}}>Rs.{product.discount}</h5>
              {product.type==='rent'?<p style={{paddingLeft:'5px',color:'grey',display:'inline'}}>per Day</p>:null}

              <br/><h6 style={{color:'#1A9406'}}>{product.owner?.shopName}</h6>
              <span style={{paddingLeft:'10px'}}>{product.owner?.address.number}, {product.owner?.address.street}, {product.owner?.address.city}</span><br/>
              <span style={{paddingLeft:'12px'}}>{product.owner?.address.district}-{product.owner?.address.postalCode}</span><br/>                
              <span><a href={`mailto:${product.owner?.email}`} style={{paddingLeft:'10px',color:'#053B50'}}>{product.owner?.email}</a></span>
              <p style={{paddingLeft:'10px',color:'red'}}>{product.owner?.phone}</p><br/>
              <Row>
               <Col>
              {/* <div style={{backgroundColor:'#1A9406', padding:'10px 20px',borderRadius:'20px',display:'inline-block'}}>
                 <FontAwesomeIcon icon={faWhatsapp} style={{ color: '#ffff', fontSize: '20px', paddingRight:'10px' }} />
                 <span style={{color:'#ffff'}}>Whatsapp</span>
              </div> */}
              </Col> 
              <Col xl='3'>
              <AddReview/>
              </Col>
              
              </Row> 
              <Row>
              {/* <div style={{backgroundColor:'goldenrod', cursor:'pointer'}}  className='location'>
                Add to Card
              </div>  */}
              <Link to={`/product/${id}/location`} className='location'>
                <div>Find Location</div>
              </Link>
                
              </Row>
              </Col>
              </>
              :
              <>
              <Col>               
                  <Carousel data-bs-theme="dark" style={{width:'100%',height:'50vh',zIndex:'0'}}>
                       <Carousel.Item>
                          <img  
                            width={400}
                            height={400}
                            className="d-block w-100 carouselImage"
                            src={product.profile}
                            alt="First slide"
                          />
                        </Carousel.Item>
                  </Carousel>
    
                    <Figure.Image
                      className='smallImage'
                      style={{border:'3px solid #fa9c23'}}
                      alt="171x180"
                      src={product.profile}
                    />         
                
              </Col>
              <Col style={{margin:'30px'}}>
              <Row>
                  <Col>
                  <h1>{product.firstname} {product.lastname}</h1>
                  </Col>
                  <Col xs={3}>
                    <Row>
                      <Col>
                        {user.carts?.laborers.length>0&&user.carts?.laborers.some((cart)=>{return cart._id===id})?
                        <FontAwesomeIcon icon={heart} style={{fontSize:'25px',color:'red',cursor:'pointer'}} onClick={handleDeleteOne}/>:
                        <FontAwesomeIcon icon={faHeart} style={{fontSize:'25px',cursor:'pointer'}} onClick={handleCart}/>
                        }
                      </Col>
                      <Col>
                      <FontAwesomeIcon icon={faShareNodes} style={{fontSize:'25px'}}/>
                      </Col>
                    </Row>
                  </Col>
                </Row> 
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${product.ratings/ 5 * 100}%`}}></div>
                  </div>
                  <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                </div>  
                <h3 style={{color:'red',display:'inline'}}>Rs.{product.price}</h3> 
                <h5 style={{color:'red',display:'inline'}}>{product.priceType}</h5><br/>
                <span style={{paddingLeft:'10px'}}>{product.address.number}, {product.address.street}, {product.address.city}</span><br/>
                <span style={{paddingLeft:'12px'}}>{product.address.district}-{product.address.postalCode}</span><br/>                
                <span><a href={`mailto:${product.email}`} style={{paddingLeft:'10px',color:'#053B50'}}>{product.email}</a></span>
                <p style={{paddingLeft:'10px',color:'red'}}>{product.phone}</p><br/>
                <Row>
                 <Col>
               {/*  <div style={{backgroundColor:'#1A9406', padding:'10px 20px',borderRadius:'20px',display:'inline-block'}}>
                   <FontAwesomeIcon icon={faWhatsapp} style={{ color: '#ffff', fontSize: '20px', paddingRight:'10px' }} />
                   <span style={{color:'#ffff'}}>Whatsapp</span>
                </div> */}
                </Col> 
                <Col xl={3}>
                <AddReview/>
                </Col>
                
                </Row> 
                <Row>
                
                {/* <div style={{backgroundColor:'goldenrod', cursor:'pointer'}}  className='location'>
                Add to Card
              </div> */} 
      
                <Link to={`/product/${id}/location`} className='location'>
                  <div>Find Location</div>
                </Link>
                  
                </Row>
              </Col>
              </>

              }
              
            </Row>
                 
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