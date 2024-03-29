import React, { useRef,useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import MetaData from '../Layouts/MetaData'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import profile from '../../images/default_avatar.png'
import { Modal, Button } from 'react-bootstrap'
import PinLocation from '../Google maps/PinLocation';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PinLocation/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
      </Modal.Footer>
    </Modal >
  );
}

const UpdateUser = () => {
  const{isLoading,user}=useSelector((state)=>state.authState)
    const {role}=useParams()
    const [show, setShow] = useState(false);
    
    const inputRef = useRef(null);
    const handleImageClick = () => {
      inputRef.current.click();
    }
    const [modalShow, setModalShow] = useState(false);
    const [ProfilePhoto, setProfilePhoto] = useState(null)
    const [ProfilePhotoPreview, setProfilePhotoPreview] = useState(null)
    const [CurrentBill, setCurrentBill] = useState(null)
    const [CurrentBillPreview, setCurrentBillPreview] = useState(null)
    const [Certificate, setCertificate] = useState(null)
    const [CertificatePreview, setCertificatePreview] = useState(null)

    const onChange = (e) => {
      if(e.target.name === 'profilePhoto') {
         const reader = new FileReader();
         reader.onload = () => {
              if(reader.readyState === 2) {
                  setProfilePhotoPreview(reader.result);
                  setProfilePhoto(e.target.files[0])
              }
         }
         reader.readAsDataURL(e.target.files[0])
      }else{
          setFormData({...formValue, [e.target.name]:e.target.value })
      }
  
      if(e.target.name === 'currentBill') {
        const reader = new FileReader();
        reader.onload = () => {
             if(reader.readyState === 2) {
                 setCurrentBillPreview(reader.result);
                 setCurrentBill(e.target.files[0])
             }
        }
  
  
        reader.readAsDataURL(e.target.files[0])
     }else{
        setFormData({...formValue, [e.target.name]:e.target.value })
     }
  
     if(e.target.name === 'certificate') {
      const reader = new FileReader();
      reader.onload = () => {
           if(reader.readyState === 2) {
               setCertificatePreview(reader.result);
               setCertificate(e.target.files[0])
           }
      }
  
  
      reader.readAsDataURL(e.target.files[0])
   }else{
      setFormData({...formValue, [e.target.name]:e.target.value })
   }
  }
    const [fileName, setFileName] = useState("No selected file")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [formValue, setFormData] = useState({
      role:role,
      firstname:'',
      lastname:'',
      password:'',
      confirmPassword:'',
      email:'',
      phone:'',
      NIC:'',
    });
  
    const [formError, setFormError] = useState({role:role});
    const [registrationError, setRegistrationError] = useState(null);
    
    const handleInput = (e) => {
      setFormData({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //setIsLoading(true);
      setRegistrationError(null);
      console.log(formValue);
  
      const validationErrors = {}
      if(!formValue.firstname.trim()){
        validationErrors.firstname = "firstname is required*"
      }
  
      if(!formValue.lastname.trim()){
        validationErrors.lastname = "lastname is required*"
      }
  
      if(!formValue.email.trim()) {
        validationErrors.email = "email is required*"
    } else if(!/\S+@\S+\.\S+/.test(formValue.email)){
        validationErrors.email = "email is not valid*"
    }
  
    if(!formValue.password.trim()) {
        validationErrors.password = "password is required*"
    } else if(formValue.password.length < 6){
        validationErrors.password = "password should be at least 6 char*"
    }
  
    if(formValue.confirmPassword !== formValue.password) {
        validationErrors.confirmPassword = "password not matched*"
    }
  
    /*if(!formValue.job.trim()){
      validationErrors.job = "job is required*"
    }*/
  
    setFormError(validationErrors)
  
      if(Object.keys(validationErrors).length === 0) {
          
      }
  
      try {
        
      } catch (error) {
        setRegistrationError('Registration failed. Please try again.');
      } finally {
        //setIsLoading(false);
      }
    };
  
    const options = [
    /*'Plumber',
    'Painter',
    'Tiles',
    'A/C Repair',
    'LandScaping',
    'Engineer',
    'Capenders',
    'Curtain',
    'Cleaner',
    'Concerete Slap',
    'Interior Designer',
    'Movers',
    'CCTV Technician',
    'Cieling',
    'Architect',
    'Contractors'*/
      { value: "Electrician", label: "Electrician" },
      { value: "JAVA", label: "JAVA" },
      { value: "Javascript", label: "Javascript" },
      { value: "Python", label: "Python" },
      { value: "Swift", label: "Swift" },
    ];

    const [selectedOption, setSelectedOption] = useState(user.job);

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    return (
      <>
          <div className='register'>
          <MetaData title={'register'}/>
            <div className="frame">
            <div className='card p-3 mx-0 inside'>
            <div className="row" style={{margin:'20px'}}>
              <div className="col-md-12">
              <h2 style={{color:'#053B50'}} >Update Details</h2>
              <p className="text-success"> {  } </p>
  
              <form onSubmit={handleSubmit}>
                <center>
                  <div onClick={handleImageClick}>
                  {ProfilePhoto ? <img src={ProfilePhotoPreview} className='profilePic-after'/>:<img src={user.profile?user.profile:profile} className='profilePic-before'/>}
                    <input type='file' ref={inputRef} onChange={onChange} name='profilePhoto' style={{display:'none'}}/>
                  </div>
                  </center>
                  <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>                            
                              <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='First Name' name='firstname' value={user.firstname} onChange={handleInput}/>
                              </FloatingLabel>
                              {formError.firstname&&formValue.firstname<=0 ? <div className='error'>{formError.firstname}</div>:""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='Last Name' name='lastname' value={user.lastname} onChange={handleInput} />
                              </FloatingLabel>
                              {formError.lastname&&formValue.lastname<=0 ? <div className='error'>{formError.lastname}</div>:""}
                            </div>
                          </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="E-mail Address" className="mb-3 z-0">
                                <Form.Control type="email" placeholder='email' name='email' value={user.email} onChange={handleInput} />
                              </FloatingLabel>
                              {formError.email&&formValue.email<=0 ? <div className='error'>{formError.email}</div>:""}
                            </div>
                          </div>
                          </div>
                      </div>

                      <div className="col-md-6">
                          <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='+94771234567' name='phone' value={user.phone} onChange={handleInput} />
                              </FloatingLabel>
                            </div>
                          </div>
                          </div>
                      </div>
                    
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Street Address" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='Street' name='street' value={user.address.number} onChange={handleInput} />
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
                              <Form.Control type="text" placeholder='City' name='city' value={user.address.city} onChange={handleInput} />
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
                              <Form.Control type="text" placeholder='District' name='district' value={user.address.district} onChange={handleInput} />
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
                              <Form.Control type="text" placeholder='Postal' name='postal' value={user.address.postalCode} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>   
                    </div>          

                {user.role==="Product Owner" ?
            
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
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Certificate" className="mb-3 z-0">
                              <Form.Control type="file" placeholder='certificate' name='certificate' value={formValue.certificate} onChange={onChange} />
                            </FloatingLabel>
                            {Certificate ? <img src={CertificatePreview} width={50} height={50}/>:null}
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Current Bill" className="mb-3 z-0">
                              <Form.Control type="file" placeholder='currentbill' name='currentBill' value={formValue.currentbill} onChange={onChange} />
                            </FloatingLabel>
                            {CurrentBill ? <img src={CurrentBillPreview} width={50} height={50}/>:null}
                          </div>
                        </div>
                        </div>
                    </div>

                </div>

            :null}
                {user.role==="Job Seeker" ?
            <form onSubmit={handleSubmit}>
                <div className="row">    
                
                      <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="NIC" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='National Identity Card Number' name='NIC' value={user.nic} onChange={handleInput} />
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Job" className="mb-3 z-0">
                              <Form.Select
                                value={selectedOption}
                                onChange={handleSelectChange}
                              >
                                {options.map(option => (
                                  <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                              </Form.Select>                     
                            </FloatingLabel>
                            {formError.job&&formValue.job<=0 ? <div className='error'>{formError.job}</div>:""}
                          </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                        <div className='float'>     
                          <div style={{ paddingLeft: '10px',width:'400px' }}>
                            <FloatingLabel controlId="floatingInput" label="Price" className="mb-3 z-0">
                              <Form.Control type="text" placeholder='price' name='price' value={user.price} />
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
                              <Form.Control as="textarea" placeholder='description' value={user.description} name='description' style={{height:'100px', width:'600px'}}/>
                            </FloatingLabel>
                          </div>
                        </div>
                        </div>
                    </div>
                </div>
            </form>
            :null}
                      <button className='btnstyle' type='submit' style={{marginTop:'5px'}} disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Updating...' : 'Update'}</button>
                    </form>

                      <h4 style={{marginTop:'20px'}}>If you want to change your password</h4>
                      <form onSubmit={handleSubmit}>
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="Old Password" className="mb-3 z-0">
                                <Form.Control type="password" placeholder='oldPassword' name='oldPassword' value={formValue.password} onChange={handleInput} />
                              </FloatingLabel>
                              {formError.password ? <div className='error'>{formError.password}</div>:""}
                            </div>
                          </div>
                          

                    
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 z-0">
                                <Form.Control type="password" placeholder='Password' name='password' value={formValue.password} onChange={handleInput} />
                              </FloatingLabel>
                              {formError.password ? <div className='error'>{formError.password}</div>:""}
                            </div>
                          </div>
                          

                      
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3 z-0">
                                <Form.Control type="password" placeholder='Confirm Password' name='confirmPassword' value={formValue.confirmPassword} onChange={handleInput} />
                              </FloatingLabel>
                              {formError.confirmPassword ? <div className='error'>{formError.confirmPassword}</div>:""}
                            </div>
                          </div>  
                      
                  <button className='btnstyle' type='submit' style={{marginTop:'20px', align:'center'}} disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Updating...' : 'Change'}</button>
              </form>
              </div>
          </div>
                    
            </div>
            </div>
          </div>
          <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        </>
    
    )
    
  }

export default UpdateUser