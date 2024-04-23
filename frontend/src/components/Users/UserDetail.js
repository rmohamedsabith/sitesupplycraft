import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import { Col, Container, Row } from 'react-bootstrap'
import MetaData from '../Layouts/MetaData'
import image from '../../images/default_avatar.png'
import { Link } from 'react-router-dom'

const UserDetail = () => {
  const{isLoading,user}=useSelector((state)=>state.authState)
  return (
    <div className='mt-5'>
      <center><h2 style={{color:'#1A9406',textDecoration:'underline'}}>My Profile</h2></center>
      <div className='d-flex justify-content-center align-item-center'>
        <MetaData title={'My Profile'}/>
       {isLoading?<Loader/>:    
        <div className='card profileFrame'>
          <Container fluid={true}>
            <Row>
              <Col>
              <center>              
                <img
                 src={user.profile?user.profile:image}
                  alt="my profile"
                  className='m-3 rounded-5'
                  width={300}
                  height={300}
                />
                </center> 
                {user.role==='Job Seeker'?
                <>
                <h4 style={{textDecoration:'underline'}}>Description</h4>
                <pre>{user.description}</pre>
                </>
                :null}
                <Row className='mx-3'>
                <Link to='/myprofile/edit' className='location' style={{backgroundColor:'#1A9406'}}>
                  <div  style={{color:'#ffff'}}>
                
                        Edit My Profile
                
                </div>
                </Link>
                </Row>
                 
              </Col>
              <Col style={{margin:'30px'}}>
                <table className='myprofile' cellPadding={10}>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>First Name:</td>
                      <td>{user.firstname}</td>
                    </tr>
                    <tr>
                      <td>Last Name:</td>
                      <td>{user.lastname}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td>Phone No:</td>
                      <td>{user.phone}</td>
                    </tr>
                    {user.role!=='Customer'?
                      <>                 
                      <tr >
                        <td>Place No:</td>
                        <td>{user.address.number}</td>
                      </tr>
                      <tr >
                        <td>Street:</td>
                        <td>{user.address.street}</td>
                      </tr>
                      <tr >
                        <td>City:</td>
                        <td>{user.address.city}</td>
                      </tr>
                      <tr >
                        <td>District:</td>
                        <td>{user.address.district}</td>
                      </tr>
                      {/* <tr >
                        <td>Province:</td>
                        <td>{user.address.province}</td>
                      </tr> */}
                      <tr >
                        <td>Postal Code:</td>
                        <td>{user.address.postalCode}</td>
                      </tr>
                    </>
                      :null
                    }
                   {user.role==='Job Seeker'?
                    <>
                    <tr>
                      <td>Job:</td>
                      <td>{user.job}</td>
                    </tr>
                    <tr>
                      <td>Price:</td>
                      <td>{user.price}{user.priceType}</td>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td style={{color:user.status==='Active'?'#1A9406':'red'}}>{user.status}</td>
                    </tr>                  
                   </>:null
                   }
                   {user.role==='Product Owner'?
                    <>
                    <tr>
                      <td>Nic:</td>
                      <td>{user.nic}</td>
                    </tr>
                    <tr>
                      <td>Shop Regno:</td>
                      <td>{user.shopReg_no}</td>
                    </tr>
                    <tr>
                      <td>Shop Name:</td>
                      <td>{user.shopName}</td>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td style={{color:user.status==='verified'?'#FF5F14':user.status==='processing'?'#1A9406':user.status==='cancelled'?'red':null}}>{user.status}</td>
                    </tr>                  
                   </>:null
                   }
                  </tbody>
                </table>
              </Col>
            </Row>
          </Container>         
         
           
          </div>}
      </div> 
        
    </div>
  )
}

export default UserDetail