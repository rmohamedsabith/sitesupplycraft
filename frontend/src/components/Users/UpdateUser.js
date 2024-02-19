import React, { useRef,useEffect, useState } from 'react'
import {changePassword, clearAuthError, resetPassword, updateProfile } from '../../actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import profilePic from '../../images/default_avatar.png'
import { Modal, Button } from 'react-bootstrap'
import PinLocation from '../Google maps/PinLocation';
import Loader from '../Loader'

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
  const{isLoading:isLoadingAuth, error, user, ispasswordChanged, isUpdated}=useSelector((state)=>state.authState)
  const {role}=useParams()
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const inputRef = useRef(null);
  const [formError, setFormError] = useState({role:role});
  const [registrationError, setRegistrationError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [ProfilePhoto, setProfilePhoto] = useState('')
  const [ProfilePhotoPreview, setProfilePhotoPreview] = useState(user.profile)
  const [CurrentBill, setCurrentBill] = useState(null)
  const [CurrentBillPreview, setCurrentBillPreview] = useState(null)
  const [Certificate, setCertificate] = useState(null)
  const [CertificatePreview, setCertificatePreview] = useState(null)
  const navigate = useNavigate();

  const onChange = (e) => {
    if(e.target.name === 'profile') {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setProfilePhotoPreview(reader.result);
                setProfilePhoto(e.target.files[0])
            }
        }
        
        reader.readAsDataURL(e.target.files[0])
    }else{
        setFormData({...formData, [e.target.name]:e.target.value })
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
      setFormData({...formData, [e.target.name]:e.target.value })
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
    setFormData({...formData, [e.target.name]:e.target.value })
  }
}
  const [fileName, setFileName] = useState("No selected file")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageClick = () => {
    inputRef.current.click();
  }

  useEffect(() => {
  if(isUpdated)
    {
      toast.success(`successfully Data was updated`, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearAuthError)
      });
      navigate('/myprofile')
    }
    if(ispasswordChanged)navigate('/myprofile')
  },[dispatch,error, ispasswordChanged, isUpdated]);

  const [formData, setFormData] = useState({
    role: user.role,
    profile: user.profile,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    password : '',
    confirmPassword: '',
    oldPassword: '',
    /*nic:user?.nic,
    street: user?.address.street,
    city: user?.address.city,
    district: user?.address.district,
    postal: user?.address.postalCode,
    price: user?.price,
    description: user?.description*/
  });

  
  const handleInput = (e) => {
    setIsLoadingPassword(false);
    setIsLoadingUpdate(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoadingUpdate(true);
    setRegistrationError(null);
    console.log(formData);

    const validationErrors = {}
    if(!formData.profile){
      validationErrors.profile = "Please Select a Photo*"
    }

    if(!formData.firstname.trim()){
      validationErrors.firstname = "firstname is required*"
    }

    if(!formData.lastname.trim()){
      validationErrors.lastname = "lastname is required*"
    }

    if(!formData.email.trim()) {
      validationErrors.email = "email is required*"
    } else if(!/\S+@\S+\.\S+/.test(formData.email)){
        validationErrors.email = "email is not valid*"
    }

    /*if(!formData.job.trim()){
      validationErrors.job = "job is required*"
    }*/

    setFormError(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      const userData = new FormData();
      userData.append('role', formData.role)
      if(ProfilePhoto!=='')userData.append('profile', ProfilePhoto)
      userData.append('firstname', formData.firstname)
      userData.append('lastname', formData.lastname)
      userData.append('email', formData.email)
      //userData.append('password', formData.password)
      //userData.append('confirmPassword', formData.confirmPassword)
      userData.append('phone', formData.phone);

      dispatch(updateProfile(userData))
    }
  };
  
  const handlePassword = async (e) => {
    e.preventDefault();
    setIsLoadingPassword(true);
    const validationErrors = {}

    if(!formData.password.trim()) {
      validationErrors.password = "password is required*"
    } else if(formData.password.length < 6){
      validationErrors.password = "password should be at least 6 char*"
    } else if(formData.password === user.password){
      validationErrors.password = "you can't use previous password"
    }

    if(formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "password not matched*"
    }

    setFormError(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      const userData = new FormData();
      userData.append('oldPassword', formData.oldPassword)
      userData.append('password', formData.password)
      userData.append('confirmPassword', formData.confirmPassword)

      console.log(user.password)
      dispatch(changePassword(userData))
      console.log(formData)
    }
  };

  const jobs = [
    { value: "Electrician", label: "Electrician" },
    { value: "Plumber", label: "Plumber" },
    { value: "Painter", label: "Painter" },
    { value: "Tiles", label: "Tiles" },
    { value: "A/C Reapair", label: "A/C Reapair" },
    { value: "Landscaping", label: "Landscaping" },
    { value: "Engineer", label: "Engineer" },
    { value: "Capenders", label: "Carpenters" },
    { value: "Curtain", label: "Curtain" },
    { value: "Cleaner", label: "Cleaner" },
    { value: "Concrete Slap", label: "Concrete Slab" },
    { value: "Interior Designer", label: "Interior Designer" },
    { value: "Movers", label: "Movers" },
    { value: "CCTV Technician", label: "CCTV Technician" },
    { value: "Cieling", label: "Ceiling" },
    { value: "Architect", label: "Architect" },
    { value: "Contractor", label: "Contractor" },    
  ];

  const payments = [
    { value: "/perHour" , label: "Per Hour"},
    { value: "/perDay" , label: "Per Day"},
    { value: "/perMonth" , label: "Per Month"},
  ];

  const [selectedJob, setSelectedJob] = useState("Electrician");
  const [selectedPayment, setSelectedPayment] = useState("Per Hour");

  useEffect(() => {
    for (let i = 0; i < jobs.length; i++) {
        if (user.job === jobs[i].value) {
            setSelectedJob(jobs[i].value);
            break; 
        }
    }

    for (let i = 0; i < payments.length; i++) {
      if (user.priceType === payments[i].value) {
          setSelectedPayment(payments[i].value);
          break; 
      }
    }
  }, []);

  const handleSelectChange = (event) => {
    setSelectedJob(event.target.value);
    setSelectedPayment(event.target.value);
  };

  return (
    <>
      {isLoadingAuth?<Loader/>:
      <>
        <div className='register'>
          <MetaData title = {'register'}/>
          <div className='frame'>
            <div className='card p-3 mx-0 inside'>
              <div className='row' style={{margin:'20px'}}>
                <div className='col-md-12'>
                  <h2 style={{color:'#053B50'}} >Update Details</h2>
                  <form onSubmit={handleUpdate}>
                    <center>
                      <div onClick={handleImageClick}>
                        {ProfilePhotoPreview ? <img src={ProfilePhotoPreview} className='profilePic-after'/>:<img src={profilePic} className='profilePic-before'/>}
                        <input type='file' ref={inputRef} onChange={onChange} name='profile' style={{display:'none'}}/>
                      </div>
                    </center>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>                            
                              <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='First Name' name='firstname' value={formData.firstname} onChange={handleInput}/>
                              </FloatingLabel>
                              {formError.firstname&&formData.firstname<=0 ? <div className='error'>{formError.firstname}</div>:""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='Last Name' name='lastname' value={formData.lastname} onChange={handleInput} />
                              </FloatingLabel>
                              {formError.lastname&&formData.lastname<=0 ? <div className='error'>{formError.lastname}</div>:""}
                            </div>
                          </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                           <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="E-mail Address" className="mb-3 z-0">
                                <Form.Control type="email" placeholder='email' name='email' value={formData.email} onChange={handleInput} />
                              </FloatingLabel>
                              {formError.email&&formData.email<=0 ? <div className='error'>{formError.email}</div>:""}
                            </div>
                          </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                              <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='+94771234567' name='phone' value={formData.phone} onChange={handleInput} />
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
                                <FloatingLabel controlId="floatingInput" label="Street Address" className="mb-3 z-0">
                                  <Form.Control type="text" placeholder='Street' name='street' value={formData.street} onChange={handleInput} />
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
                                  <Form.Control type="text" placeholder='City' name='city' value={formData.city} onChange={handleInput} />
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
                                  <Form.Control type="text" placeholder='District' name='district' value={formData.district} onChange={handleInput} />
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
                                  <Form.Control type="text" placeholder='Postal' name='postal' value={formData.postal} onChange={handleInput} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>   

                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className='float'>     
                              <div style={{ paddingLeft: '10px',width:'400px' }}>
                                <FloatingLabel controlId="floatingInput" label="NIC" className="mb-3 z-0">
                                  <Form.Control type="text" placeholder='National Identity Card Number' name='NIC' value={formData.NIC} onChange={handleInput} />
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
                                  <Form.Control type="text" placeholder='Shop No' name='shopno' value={formData.shopno} onChange={handleInput} />
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
                                  <Form.Control type="file" placeholder='certificate' name='certificate' value={formData.certificate} onChange={onChange} />
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
                                  <Form.Control type="file" placeholder='currentbill' name='currentBill' value={formData.currentbill} onChange={onChange} />
                                </FloatingLabel>
                                {CurrentBill ? <img src={CurrentBillPreview} width={50} height={50}/>:null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    :null}

                    {user.role==="Job Seeker" ?
                      <div className="row">    
                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className='float'>     
                              <div style={{ paddingLeft: '10px',width:'400px' }}>
                                <FloatingLabel controlId="floatingInput" label="Street Address" className="mb-3 z-0">
                                  <Form.Control type="text" placeholder='Street' name='street' value={formData.street} onChange={handleInput} />
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
                                  <Form.Control type="text" placeholder='City' name='city' value={formData.city} onChange={handleInput} />
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
                                  <Form.Control type="text" placeholder='District' name='district' value={formData.district} onChange={handleInput} />
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
                                  <Form.Control type="text" placeholder='Postal' name='postal' value={formData.postal} onChange={handleInput} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>  

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
                                    value={selectedJob}
                                    onChange={handleSelectChange}
                                  >
                                    {jobs.map(job => (
                                      <option key={job.value} value={job.value}>{job.label}</option>
                                    ))}
                                  </Form.Select>                     
                                </FloatingLabel>
                                {formError.job&&formData.job<=0 ? <div className='error'>{formError.job}</div>:""}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className='float'>     
                              <div style={{ paddingLeft: '10px',width:'400px' }}>
                                <FloatingLabel controlId="floatingInput" label="Price" className="mb-3 z-0">
                                  <Form.Control type="text" placeholder='price' name='price' value={formData.price} />
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
                                <Form.Select
                                    value={selectedPayment}
                                    onChange={handleSelectChange}
                                  >
                                    {payments.map(payment => (
                                      <option key={payment.value} value={payment.value}>{payment.label}</option>
                                    ))}
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
                                  <Form.Control as="textarea" placeholder='description' value={formData.description} name='description' style={{height:'100px', width:'600px'}}/>
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    :null}
                    <button className='btnstyle' type='submit' style={{marginTop:'5px'}} disabled={isLoadingUpdate} onClick={handleUpdate}>{isLoadingUpdate ? 'Updating...' : 'Update'}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='register'>
          <MetaData title={'register'}/>
          <div className="frame">
            <div className='card p-3 mx-0 inside'>
              <div className="row" style={{margin:'20px'}}>
                <div className="col-md-12">
                  <p className="text-success"> {  } </p>
                  <h4 style={{marginTop:'20px'}}>If you want to change your password</h4>
            
                  <form onSubmit={handlePassword}>
                    <div className='float'>     
                      <div style={{ paddingLeft: '10px',width:'400px' }}>
                        <FloatingLabel controlId="floatingInput" label="Old Password" className="mb-3 z-0">
                          <Form.Control type="password" placeholder='oldPassword' name='oldPassword' value={formData.oldPassword} onChange={handleInput} />
                        </FloatingLabel>
                        {formError.password ? <div className='error'>{formError.password}</div>:""}
                      </div>
                    </div>
                
                    <div className='float'>     
                      <div style={{ paddingLeft: '10px',width:'400px' }}>
                        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 z-0">
                          <Form.Control type="password" placeholder='Password' name='password' value={formData.password} onChange={handleInput} />
                        </FloatingLabel>
                        {formError.password ? <div className='error'>{formError.password}</div>:""}
                      </div>
                    </div>
                
                    <div className='float'>     
                      <div style={{ paddingLeft: '10px',width:'400px' }}>
                        <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3 z-0">
                          <Form.Control type="password" placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={handleInput} />
                        </FloatingLabel>
                        {formError.confirmPassword ? <div className='error'>{formError.confirmPassword}</div>:""}
                      </div>
                    </div>  
                    
                    <button className='btnstyle' type='submit' style={{marginTop:'20px', align:'center'}} disabled={isLoadingPassword} onClick={handlePassword}>{isLoadingPassword ? 'Updating...' : 'Change'}</button>
                  </form>
                </div>
              </div>     
            </div>
          </div>
        </div>

        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
      </>
      }
    </>
  ) 
}

export default UpdateUser