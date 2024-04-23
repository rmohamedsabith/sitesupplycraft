import React, { useCallback, useEffect, useState } from 'react'
import logo from '../../images/logo.jpeg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Dropdown,FloatingLabel,Form,Image, Modal} from 'react-bootstrap'
import { changePassword, clearAuthError, logout } from '../../actions/authActions'
import{filter} from '../../actions/productsFilteringActions'
import { clearProducts } from '../../slices/productsSlice'
import Favourites from '../Users/Favourites'
import { toast } from 'react-toastify'
import Loader from '../Loader'
import { getTotals, getTotals_per_month } from '../../actions/adminActions'
import defaultProfile from '../../images/default_avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import {ChatState} from '../../chatContex'
import { Effect } from 'react-notification-badge'
import NotificationBadge from 'react-notification-badge'
import { getMessages, getUnreadMessages } from '../../actions/messagesAction'
import { io } from 'socket.io-client'
import { getProducts } from '../../actions/productsActions'

var socket=io(process.env.REACT_APP_BACKEND_URL)


function MyVerticallyCenteredModal(props) {
  const dispatch=useDispatch()
  const [oldPassword,setOldPassword]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfrimPassword]=useState('')
  const [formError, setFormError] = useState({});
  const{isLoading,error,ispasswordChanged}=useSelector((state)=>state.authState)


  useEffect(()=>{
    setConfrimPassword('')
    setOldPassword('')
    setPassword('')
    if(error)
    {
      toast.error(error,{
        position:'bottom-center',
        onOpen:()=>dispatch(clearAuthError)
      })
    }
    else if(ispasswordChanged)
    {
      props.onHide();
      toast.success('successfully password was changed',{
        position:'bottom-center',
        onOpen:()=>dispatch(clearAuthError),
      })
      
    }
  },[ispasswordChanged,error,dispatch])

  const handleUpdate=()=>{
    const validationErrors = {}
    if(!oldPassword.trim()) {
        validationErrors.oldPassword = "old password is required*"
    } 
    if(!password.trim()) {
        validationErrors.password = "password is required*"
    } else if(password.length < 6){
        validationErrors.password = "password should be at least 6 char*"
    }

    if(confirmPassword !== password) {
        validationErrors.confirmPassword = "password not matched*"
    }

    setFormError(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
        const userData = new FormData();
        userData.append('password', password)
        userData.append('confirmPassword',confirmPassword)
        userData.append('oldPassword', oldPassword);
       
        dispatch(changePassword(userData))
    }
  }

  const handleClose=()=>{
    setConfrimPassword('')
    setOldPassword('')
    setPassword('')
    props.onHide()
  }
  return (
    <>
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <center>
      <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                         {formError.oldPassword && oldPassword<=0 ? <div className='error' style={{color:'red',textAlign:'right'}}>{formError.oldPassword}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="oldPassword" className="mb-3 z-0">
                           <Form.Control type="password" placeholder='Old Password' name='oldPassword' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                         </FloatingLabel>                            
                       </div>
                     </div>
                     </div>
                 </div>
      <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                         {formError.password || password<=0 ? <div className='error' style={{color:'red',textAlign:'right'}}>{formError.password}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 z-0">
                           <Form.Control type="password" placeholder='Password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                         </FloatingLabel>                            
                       </div>
                     </div>
                     </div>
                 </div>
                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                         {formError.confirmPassword ? <div className='error' style={{color:'red',textAlign:'right'}}>{formError.confirmPassword}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3 z-0">
                           <Form.Control type="password" placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfrimPassword(e.target.value)} />
                         </FloatingLabel>                            
                       </div>
                     </div>
                     </div>
                 </div>
      </center>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleUpdate}disabled={isLoading}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
    </>
    
  );
}



const Header = ({hide,setIsHumClicked,isHumClicked,setDistrict,setIsDistrict}) => { 
  const{unreadMessages}=useSelector((state)=>state.messagesState) 
  const [modalShow, setModalShow] = useState(false);
  const {isAuthenticated,user}=useSelector((state)=>state.authState)
  const{price,category,rating,model}=useSelector((state)=>state.productsFilteringState)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const location=useLocation()

  const{notification,setNotification}=ChatState()

  useEffect(()=>{
    setNotification(unreadMessages)
  },[unreadMessages])
   
 useEffect(()=>{
  if(user?.role==='Product Owner')
  {
    socket.emit("setup",user)
    socket.on('message_recieved', (data) => {
    setNotification((prevCount) => [...prevCount,data])})
    /* console.log("sabith") */
  }
  

  return () => {
    socket.off('new_message');
  };
 },[user])

  const logoutHandler=()=>{
    navigate('/')
    sessionStorage.removeItem('items')
    dispatch(logout)
  }
  const handleReferesh=useCallback(async()=>{
    setDistrict('')  
    /* setNotification(unreadMessages) */
    dispatch(getUnreadMessages)
    setIsDistrict(false)
    await dispatch(clearProducts())
    dispatch(filter(null,null,null,null,'products'))
    dispatch(getProducts(null, price, category, rating,null,null, 1,model))
    if(user?.isvalidEmail||!isAuthenticated) return navigate('/') 
   else{       
      return navigate('/register/verify/email')
    }
        
  },[setDistrict,setIsDistrict,dispatch,navigate])

  const handleAdminDashboard=async()=>{
    await dispatch(getTotals_per_month)
    await dispatch(getTotals)
    navigate('Admin/dashboard')
  }
  const handleMessage=()=>{
    setNotification([])
    dispatch(getMessages).then(()=>{
      navigate('/ProductOwner/Messages')
      
    }) 
    
      
  }
  //console.log(notification)

  return (
    <>
    <div className='heading'>      
      <div className="headRow">
        
        <div className="logo">
          {/* <Link to={'./Side.js'}> */}<img id="siteimg" src={logo} alt="Logo" onClick={()=>handleReferesh()}/>{/* </Link> */}
          <span id="sitesupplycraft">Site Supply Craft</span>
        </div>
        {hide?
          <div className='humburger' onClick={()=>setIsHumClicked(!isHumClicked)} >
            <i className="fa-solid fa-bars fa-lg"></i>
          </div>
          :null}
        
        {isAuthenticated? 
        <div className="headRight">

          {
            user.role === 'Product Owner' && location.pathname !== '/ProductOwner/Messages'?
            <div onClick={handleMessage}>
              <div>
                <NotificationBadge
                count={notification?.length}
                effect={Effect.SCALE}
                style={{marginRight:'25px',marginTop:'10px'}}
                />
              </div>
              <FontAwesomeIcon icon={faMessage} style={{fontSize: '25px',marginTop:'25px',marginRight:'30px'}} />
              
              
            </div>
            :null
          }
            <Favourites/>
                       
              <Dropdown>
                  <Dropdown.Toggle variant='text-white pr-5'  className='no-hover-dropdown' style={{boxShadow:'none',fontWeight:'800', border:'none'}}>
                    <figure className='avatar avatar-nav'>
                      <Image src={user.profile?user.profile:defaultProfile} className='rounded-circle' />
                    </figure>
                    <span>{user.role!=='Google User'?user.firstname+' '+user.lastname:user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu >
                      { user.role === 'Admin' && <Dropdown.Item onClick={handleAdminDashboard} className='text-dark'>Dashboard</Dropdown.Item> }
                      { user.role === 'Product Owner' && <Dropdown.Item onClick={() => {navigate('ProductOwner/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      {user.role!=='Google User'&&user.role!=='Admin'?<Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>:user.role==='Google User'?null:<Dropdown.Item className='text-dark'onClick={() => setModalShow(true)}>Change Password</Dropdown.Item>}
                      <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>        
        </div>:
        <div className="headRight">
          <Link to={'register/Product Owner'} id='owner'>Become a Product Owner</Link>
          <Link to={'/register/Job Seeker'} id='job'>Become a Job Seeker</Link>
          <Link to={'/login'} style={{paddingTop:'17px'}}className='btn btnstyle'>Log in</Link>
        </div>
        }
        
      </div>  
    </div>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
    
  
)}

export default Header