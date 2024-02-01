import React, { useCallback } from 'react'
import logo from '../../images/logo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Dropdown,Image} from 'react-bootstrap'
import { logout } from '../../actions/authActions'
import{filter} from '../../actions/productsFilteringActions'
import { clearProducts } from '../../slices/productsSlice'
import Favourites from '../Users/Favourites'



const Header = ({hide,setIsHumClicked,isHumClicked,setDistrict,setIsDistrict}) => {
  
  const {isAuthenticated,user}=useSelector((state)=>state.authState)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const logoutHandler=()=>{
    navigate('/')
    dispatch(logout)
  }
  const handleReferesh=useCallback(async()=>{
    setDistrict('')  
    setIsDistrict(false)
    await dispatch(clearProducts())
    dispatch(filter(null,null,null,null,'products'))  
    navigate('/')     
  },[setDistrict,setIsDistrict,dispatch,navigate])

  return (
    
    <div className='heading'>      
      <div className="headRow">
        
        <div className="logo">
          <Link to={'./Side.js'}><img id="siteimg" src={logo} alt="Logo" onClick={()=>handleReferesh()}/></Link>
          <span id="sitesupplycraft">Site Supply Craft</span>
        </div>
        {hide?
          <div className='humburger' onClick={()=>setIsHumClicked(!isHumClicked)} >
            <i className="fa-solid fa-bars fa-lg"></i>
          </div>
          :null}
        
        {isAuthenticated? 
        <div className="headRight">
            <Favourites/>
                       
              <Dropdown>
                  <Dropdown.Toggle variant='text-white pr-5'  className='no-hover-dropdown' style={{boxShadow:'none',fontWeight:'800', border:'none'}}>
                    <figure className='avatar avatar-nav'>
                      <Image src={user.profile?user.profile:'../../images/default_avatar.png'} className='rounded-circle' />
                    </figure>
                    <span>{user.role!=='Google User'?user.firstname+' '+user.lastname:user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu >
                      { user.role === 'Admin' && <Dropdown.Item onClick={() => {navigate('Admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      { user.role === 'Product Owner' && <Dropdown.Item onClick={() => {navigate('ProductOwner/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      {user.role!=='Google User'&&user.role!=='Admin'?<Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>:user.role==='Google User'?null:<Dropdown.Item className='text-dark'>Change Password</Dropdown.Item>}
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
  
)}

export default Header