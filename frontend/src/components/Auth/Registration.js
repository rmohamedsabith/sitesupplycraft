import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../../actions/authActions'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import Loader from '../Loader'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Registration = () => {
  const {role}=useParams()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* const registerUser = async (userData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      console.log('User registered:', userData);
  
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };*/

  const [formValue, setFormData] = useState({role
    /*firstname:'',
    lastname:'',
    password:'',
    confirmpassword:'',
    email:'',
    phone:'',
    location:'',
    street1:'',
    street2:'',
    city:'',
    district:'',
    postal:'',*/
  });

  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const handleInput = (e) => {
    setFormData({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistrationError(null);

    try {
      

      setFormData({
        firstname:'',
        lastname:'',
        password:'',
        confirmpassword:'',
        email:'',
        phone:'',
        location:'',
        street1:'',
        street2:'',
        city:'',
        district:'',
        postal:'',
      });
    } catch (error) {
      setRegistrationError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <div className='registration'>
        <MetaData title={'register'}/>
          <div className="frame">
          <div className='card p-3 mx-0 inside'>
          <div className="row" style={{margin:'20px'}}>
            <div className="col-md-12">
            <h2 style={{color:'#053B50'}} >Create an Account</h2>
            <p className="text-success"> {  } </p>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='First Name' name='firstname' value={formValue.firstname} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='Last Name' name='lastname' value={formValue.lastname} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="E-mail Address" className="mb-3 z-0">
                              <Form.Control type="email" placeholder='email' name='email' value={formValue.email} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='+94771234567' name='phone' value={formValue.phone} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 z-0">
                              <Form.Control type="password" placeholder='Password' name='password' value={formValue.password} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3 z-0">
                              <Form.Control type="password" placeholder='Confirm Password' name='confirmpassword' value={formValue.confirmpassword} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Location" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='Location' name='location' value={formValue.location} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Address" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='Street1' name='street1' value={formValue.street1} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label='Street line 2' className="mb-3 z-0">
                              <Form.Control type="text" placeholder='Street2' name='street2' value={formValue.street2} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="City" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='City' name='city' value={formValue.city} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="District" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='District' name='district' value={formValue.district} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Postal Code" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='Postal' name='postal' value={formValue.postal} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>             

                </div>
                
                {role==="Product Owner" ?
            <form onSubmit={handleSubmit}>
                <div className="row">                 
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="NIC" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='National Identity Card Number' name='NIC' value={formValue.NIC} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    

                    <div className="col-md-6">
                        
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Shop Registration No" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='Shop No' name='shopno' value={formValue.shopno} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Certificate" className="mb-3 z-0">
                              <Form.Control type="file" placeholder='certificate' name='certificate' value={formValue.certificate} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Current Bill" className="mb-3 z-0">
                              <Form.Control type="file" placeholder='currentbill' name='currentbill' value={formValue.currentbill} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                </div>
            </form>
            :null}

                {role==="Job Seeker" ?
            <form onSubmit={handleSubmit}>
                <div className="row">                   
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="NIC" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='National Identity Card Number' name='NIC' value={formValue.NIC} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                    </div>
                    
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Job" className="mb-3 z-0">
                              <Form.Select aria-label='job'>
                                <option>Select a Job</option>
                                <option value="1">Electrician</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </Form.Select>
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Price" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='price' name='price' />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Duration" className="mb-3 z-0">
                              <Form.Select aria-label='duration'>
                                <option>Select the payment type</option>
                                <option value="1">Per Hour</option>
                                <option value="2">Per Day</option>
                                <option value="3">Per Week</option>
                                <option value="4">Per Month</option>
                              </Form.Select>
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '65px',width:'400px' }}>
                            <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3 z-0">
                              <Form.Control as="textarea" placeholder='description' name='description' style={{height:'100px', width:'600px'}}/>
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>
                </div>
            </form>
            :null}

                <button className='btnstyle' type='submit' style={{marginTop:'20px', align:'center'}} disabled={isLoading} onClick={handleShow}>
          {isLoading ? 'Registering...' : 'Sign up'}</button>
            </form>
            {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
            </div>
        </div>
                  
          </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  
  )
  
}

export default Registration