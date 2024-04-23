import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Offcanvas, Row } from 'react-bootstrap';
import { deleteAll, deleteOne } from '../../actions/usersActions';
import { loadUser } from '../../actions/authActions';
import { toast } from 'react-toastify';
import { clearData, clearError } from '../../slices/usersSlice';
import { getProduct } from '../../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { filter } from '../../actions/productsFilteringActions';

const Favourites = () => {
    const {error,isDeleted}=useSelector((state)=>state.usersState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector((state)=>state.authState)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (error) {
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: () => { dispatch(clearError()) }
        });
    }
    if (isDeleted) {
        toast.success('Successfully deleted from the favourite', {
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearData())
        });
    }
}, [error, dispatch, isDeleted]);


  const handleDeleteAll=async()=>{
     await dispatch(deleteAll)
     dispatch(loadUser)
  }

  const handleDeleteOne=async(model,id)=>{
    await dispatch(deleteOne(model,id))
    dispatch(loadUser)
  }

  const handleClick=async(just,id)=>{  
    let type
    if(just!=='laborers')type='product'
    else type='laborer'
    dispatch(getProduct(id,type))     
    dispatch(filter(null,null,null,null,just))           
    navigate(`/product/${id}`)    
  }
 
  return (
    <>
        <div className='bookmark' onClick={handleShow}>
            <FontAwesomeIcon icon={faBookmark} style={{fontSize: '25px', marginTop:'25px' }} /> 
            <span style={{backgroundColor:'red',borderRadius:'100%',padding:'5px',fontSize:'12px'}}>{user.numOfCarts?user.numOfCarts:0}</span>
        </div>

            <Offcanvas show={show} onHide={handleClose} placement="end" >
              <Offcanvas.Header closeButton style={{backgroundColor:'#176B87',color:'#ffff'}}>
                <Offcanvas.Title>My Favourites</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body> 
                {user.carts?.products?.length>0?<h3>Products</h3>:null}          
                {user.carts?.products?.length>0&&user.carts?.products?.map((cart,index)=>(
                    <div className='bookmarkProduct' key={index} onClick={()=>handleClick('products',cart._id)}>
                    <Row>
                        <Col xs={3}>
                            
                             <img src={cart.images?.[0]?.image} alt='pic'/>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                <span style={{color:'green',fontSize:'10px'}}>{cart.owner?.shopName}</span>
                                </Col>
                                <Col xs={3}>
                                <span style={{color:'#FF8B04',fontSize:'10px'}}>{cart.type}</span>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                <strong style={{paddingLeft:'10px'}}>{cart.name}</strong><br/>
                                <strong style={{color:'#FF8B04',fontSize:'20px'}}>Rs.{cart.price}</strong>
                                {cart.type==='rent'?<span style={{color:'gray',fontSize:'10px'}}>{cart.priceType}</span>:null} 
                                </Col>  
                                <Col xs={3}>
                                    <br/>
                                <FontAwesomeIcon icon={faTrashCan} onClick={()=>handleDeleteOne('products',cart._id)} style={{cursor:'pointer'}}/>
                                </Col>                            
                            </Row>
                        </Col>
                    </Row>
                    </div>
                ))}
                {user.carts?.laborers?.length>0?<h3>Laborers</h3>:null}          
                {user.carts?.laborers?.length>0&&user.carts?.laborers?.map((cart,index)=>(
                    <div className='bookmarkProduct' key={index} onClick={()=>handleClick('laborers',cart._id)}>
                    <Row>
                        <Col xs={3}>
                             <img src={cart.profile} alt='pic'/>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                <span style={{color:'green',fontSize:'10px'}}>{cart.job}</span>
                                </Col>                              
                            </Row>
                            <Row>
                                <Col>
                                <strong style={{paddingLeft:'10px'}}>{cart.firstname+' '+cart.lastname}</strong><br/>
                                <strong style={{color:'#FF8B04',fontSize:'20px'}}>Rs.{cart.price}</strong>
                                <span style={{color:'gray',fontSize:'10px'}}>{cart.priceType}</span>
                                </Col>  
                                <Col xs={3}>
                                    <br/>
                                <FontAwesomeIcon icon={faTrashCan} onClick={()=>handleDeleteOne('laborers',cart._id)} style={{cursor:'pointer'}}/>
                                </Col>                            
                            </Row>
                        </Col>
                    </Row>
                    </div>
                ))}

                {(user.carts?.products?.length>0||user.carts?.laborers?.length>0)?
                <div className='location d-block' onClick={()=>handleDeleteAll()}> Delete All</div>
                :
                <center style={{color:'red',position:'relative',top:'50%'}}>There is no product in the favourite</center>
                }                
              </Offcanvas.Body>
            </Offcanvas>
        
    </> 
  )
}

export default Favourites