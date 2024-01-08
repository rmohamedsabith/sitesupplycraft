import React from 'react'
import logo from '../../images/logo.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Dropdown,Image} from 'react-bootstrap'
import { logout } from '../../actions/authActions'
import{filter} from '../../actions/productsFilteringActions'

const Header = ({hide,setIsHumClicked,isHumClicked}) => {
  const {isAuthenticated,user}=useSelector((state)=>state.authState)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const logoutHandler=()=>{
    dispatch(logout)
  }

  return (
    
    <div className='heading'>      
      <div className="headRow">
        
        <div className="logo">
          <Link to='/'><img id="siteimg" src={logo} alt="Logo" /* onClick={dispatch(filter(null,null,null,null,'products'))} */ /></Link>
          <span id="sitesupplycraft">Site Supply Craft</span>
        </div>
        {hide?
          <div className='humburger' onClick={()=>setIsHumClicked(!isHumClicked)} >
            <i className="fa-solid fa-bars fa-lg"></i>
          </div>
          :null}
        
        {isAuthenticated?
        <div className="headRight">          
              <Dropdown className='d-inline' >
                  <Dropdown.Toggle variant='text-white pr-5'  className='no-hover-dropdown' style={{boxShadow:'none',fontWeight:'800'}}>
                    <figure className='avatar avatar-nav'>
                      <Image src={user.profile??'../../images/default_avatar.png'} className='rounded-circle' />
                    </figure>
                    <span>{user.firstname+' '+user.lastname}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu >
                      { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>        
        </div>:
        <div className="headRight">
          <p id='owner'>Become a Product Owner</p>
          <p id='job'>Become a Job Seeker</p>
          <Link to={'/login'} style={{paddingTop:'17px'}}className='btn btnstyle'>Log in</Link>
        </div>
        }
        
      </div>  
    </div>
  
)}

export default Header