import React, { useRef,useEffect, useState } from 'react'
import {changePassword, clearAuthError, resetPassword, updateProfile } from '../../actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { Col, Dropdown, FloatingLabel, Form, Row } from 'react-bootstrap'
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
      <PinLocation currentLocation={props.currentLocation} setCurrentLocation={props.setCurrentLocation}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
      </Modal.Footer>
    </Modal >
  );
}

const UpdateUser = () => {
  const{isLoading:isLoadingAuth, error, user, ispasswordChanged, isUpdated}=useSelector((state)=>state.authState)
  const {role}=user
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const inputRef = useRef(null);
  const [formError, setFormError] = useState({role:role});
  const [registrationError, setRegistrationError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [areas,setAreas]=useState([])
  const [ProfilePhoto, setProfilePhoto] = useState('')
  const [ProfilePhotoPreview, setProfilePhotoPreview] = useState(user.profile)
  const [currentLocation, setCurrentLocation] = useState({lat:user?.location.lat,long:user?.location.long});
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState();
  const [selectedPayment, setSelectedPayment] = useState();

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

    /* if(e.target.name === 'currentBill') {
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
  } */
}
  const [fileName, setFileName] = useState("No selected file")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageClick = () => {
    inputRef.current.click();
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('/districts.json');
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error('Error fetching the file:', error);
      }
    }; 
    if(areas.length===0)fetchData();
  },[areas])

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

  useEffect(()=>{
    setFormData({
      ...formData,
      lat:currentLocation?.lat,
      long:currentLocation?.long,
    })

  },[currentLocation])

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
    nic:user?.nic,
    no:user?.address.number,
    street: user?.address.street,
    city: user?.address.city,
    district: user?.address.district,
    postal: user?.address.postalCode,
    price: user?.price,
    job:user?.job,
    duration:user?.priceType,
    description: user?.description
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
    if(!formData.phone.trim()){
      validationErrors.phone = "phone is required*"
    }
    if(role!=='Customer')
 {
  if(!formData.no.trim()){
    validationErrors.no = "no is required*"
  }
  if(!formData.street.trim()){
    validationErrors.street = "street is required*"
  }
  
  if(!formData.city.trim()){
    validationErrors.city = "city is required*"
  }
  if(!formData.district.trim()){
    validationErrors.district = "district is required*"
  }
  if(!String(formData.postal).trim()){
    validationErrors.postal = "postal code is required*"
  }

  if(!currentLocation?.lat&&!currentLocation?.long){
    validationErrors.location = "location is required*"
  } 

 }
  if(role==='Product Owner')
  {
    if(!String(formData.nic).trim()){
      validationErrors.nic = "nic is required*"
    }
  }

  if(role==='Job Seeker')
  {
    if(!selectedJob.trim()||selectedJob===''){
      validationErrors.job = "job is required*"
    }
  
    if(!String(formData.price).trim()){
      validationErrors.price = "price is required*"
    }
    if(!selectedPayment.trim()||selectedPayment===''){
      validationErrors.duration = "duration is required*"
    }
  
    if(!formData.description.trim()){
      validationErrors.description = "description is required*"
    }
  
  }
    setFormError(validationErrors)
    console.log(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      const userData = new FormData();
      userData.append('role', formData.role)
      if(ProfilePhoto!=='')userData.append('profile', ProfilePhoto)
      userData.append('firstname', formData.firstname)
      userData.append('lastname', formData.lastname)
      userData.append('email', formData.email)
      userData.append('phone', formData.phone);

      if(user?.role!=='Customer')
        {
          userData.append('number', formData.no)
          userData.append('street', formData.street)
          userData.append('city', formData.city)
          userData.append('district', formData.district)
          userData.append('postalCode', formData.postal)
          userData.append('lat', currentLocation.lat)
          userData.append('long', currentLocation.long)
        }
        if(user?.role==='Product Owner')
        {
          userData.append('nic', formData.nic)
        }
        if(user?.role==='Job Seeker')
        {
          console.log(selectedPayment)
          userData.append('job', selectedJob)
          userData.append('price', formData.price)
          userData.append('priceType', selectedPayment)
          userData.append('description', formData.description)
        }

        console.log(userData)
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


  // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
 const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span style={{cursor:'pointer',border:'2px solid #053B50',padding:'10px 30px',borderRadius:'10px',}}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </span>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
            !value || child.props.children.toLowerCase().startsWith(value.toLocaleLowerCase()),
          ).map((filteredChild)=>React.cloneElement(filteredChild))
          }
        </ul>
      </div>
    );
  },
);

const handleDistrictSelect = (district) => {
  setFormData({
    ...formData,
    district: district,
  });
};
const handleCitySelect = (city) => {
  setFormData({
    ...formData,
    city: city,
  });
};
 
  const jobs = [
    { value: "Electrician", label: "Electrician" },
    { value: "Plumber", label: "Plumber" },
    { value: "Meason", label: "Meason" },
    { value: "Painter", label: "Painter" },
    { value: "Tiles", label: "Tiles" },
    { value: "A/C Repair", label: "A/C Repair" },
    { value: "Landscaping", label: "Landscaping" },
    { value: "Engineer", label: "Engineer" },
    { value: "Carpenter", label: "Carpenter" },
    { value: "Curtin", label: "Curtin" },
    { value: "Cleaner", label: "Cleaner" },
    { value: "Concrete Slup", label: "Concrete Slub" },
    { value: "Movers", label: "Movers" },
    { value: "CCTV Technician", label: "CCTV Technician" },
    { value: "Cieling", label: "Ceiling" },
    { value: "Architech", label: "Architech" },
    { value: "Contractor", label: "Contractor" },    
    { value: "Others", label: "Others" },    
  ];

  const payments = [
    { value: "/perHour" , label: "Per Hour"},
    { value: "/perDay" , label: "Per Day"},
    { value: "/perMonth" , label: "Per Month"},
  ];

  

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

  return (
    <>
      {isLoadingAuth?<Loader/>:
      <>
        <div className='register'>
          <MetaData title = {'Update'}/>
          <div className='regframe'>
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
                            {formError.firstname&&formData.firstname<=0 ? <div className='error'>{formError.firstname}</div>:""}                      
                              <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='First Name' name='firstname' value={formData.firstname} onChange={handleInput}/>
                              </FloatingLabel>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                            {formError.lastname&&formData.lastname<=0 ? <div className='error'>{formError.lastname}</div>:""}
                              <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='Last Name' name='lastname' value={formData.lastname} onChange={handleInput} />
                              </FloatingLabel>
                              
                            </div>
                          </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                           <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                            {formError.email&&formData.email<=0 ? <div className='error'>{formError.email}</div>:""}
                              <FloatingLabel controlId="floatingInput" label="E-mail Address" className="mb-3 z-0">
                                <Form.Control type="email" placeholder='email' name='email' value={formData.email} onChange={handleInput} />
                              </FloatingLabel>
                              
                            </div>
                          </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                            {formError.phone&&formData.phone<=0 ? <div className='error'>{formError.phone}</div>:""}
                              <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='+94771234567' name='phone' value={formData.phone} onChange={handleInput} />
                              </FloatingLabel>
                            </div>
                          </div>
                          </div>
                      </div> 
                    </div>  

                    {user.role!=='Customer'?
                      <div className="row">
                        <div className="col-md-6">
                      <div className="mb-3">
                      <div className='float'>     
                        <div style={{ paddingLeft: '10px',width:'400px' }}>
                        {formError.no&&formData.no<=0 ? <div className='error'>{formError.no}</div>:""}
                          <FloatingLabel controlId="floatingInput" label="StreetNo Address" className="mb-3 z-0">
                            <Form.Control type="number" placeholder='no' name='no' value={formData.no} onChange={handleInput} />
                          </FloatingLabel>
                        </div>
                      </div>
                      </div>
                        </div>    
                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className='float'>     
                              <div style={{ paddingLeft: '10px',width:'400px' }}>
                              {formError.street&&formData.street<=0 ? <div className='error'>{formError.street}</div>:""}
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
                              {/* <FloatingLabel controlId="floatingInput" label="District" className="mb-3 z-0">
                                <Form.Control type="text" placeholder='District' name='district' value={formData.district} onChange={handleInput} />
                              </FloatingLabel> */}
                              {formError.district&&formData.district<=0 ? <div className='error'>{formError.district}</div>:""}
                              <Dropdown onSelect={handleDistrictSelect}>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {!formData.district?'Select a District':formData.district}
                                </Dropdown.Toggle>              
                                <Dropdown.Menu as={CustomMenu}>
                                  <Dropdown.Item eventKey="" active={formData.district===''}>Select a District</Dropdown.Item>
                                  {areas.map((District)=>{
                                  return(<Dropdown.Item key={District.district} active={formData.district===District.district} eventKey={District.district}>{District.district}</Dropdown.Item>)
                                  })}        

                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                            <div className='float'>     
                              <div style={{ paddingLeft: '10px',width:'400px' }}>
                                {/* <FloatingLabel controlId="floatingInput" label="City" className="mb-3 z-0">
                                  <Form.Control type="text" placeholder='City' name='city' value={formData.city} onChange={handleInput} />
                                </FloatingLabel> */}
                                {formError.city&&formData.city<=0 ? <div className='error'>{formError.city}</div>:""}
                                {formData.district && (
                                    <Dropdown onSelect={handleCitySelect}>
                                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        {formData.city || 'Select a City'}
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu as={CustomMenu}>
                                        <Dropdown.Item eventKey="">Select a City</Dropdown.Item>
                                        {areas.map((District) => {
                                          if (District.district === formData.district) {
                                            return District.cities.map((city, index) => (
                                              <Dropdown.Item key={index} eventKey={city}>{city}</Dropdown.Item>
                                            ));
                                          }
                                          return null;
                                        })}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  )}

                              </div>
                            </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className='float'>     
                              <div style={{ paddingLeft: '10px',width:'400px' }}>
                              {formError.postal&&formData.postal<=0 ? <div className='error'>{formError.postal}</div>:""}
                                <FloatingLabel controlId="floatingInput" label="Postal Code" className="mb-3 z-0">
                                  <Form.Control type="number" placeholder='Postal' name='postal' value={formData.postal} onChange={handleInput} />
                                </FloatingLabel>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                        <div className="col-md-6">
                        <div className="mb-3">
                          <div className='float'>     
                            <div style={{ paddingLeft: '10px',width:'400px' }}>
                            {formError.location? <div className='error'>{formError.location}</div>:""}
                              <FloatingLabel controlId="floatingInput" label="lat" className="mb-3 z-0">
                                <Form.Control type="text"readOnly={true} placeholder='lat' name='lat' value={currentLocation?.lat} onChange={handleInput} />
                              </FloatingLabel>
                              <FloatingLabel controlId="floatingInput" label="long" className="mb-3 z-0">
                                <Form.Control type="text"readOnly={true} placeholder='long' name='long' value={currentLocation?.long} onChange={handleInput} />
                              </FloatingLabel>
                            </div>
                          </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className='float'>     
                              <div style={{ paddingLeft: '10px',width:'400px' }}>
                                  <Button name='location' value='location' style={{cursor:'pointer'}} onClick={()=>setModalShow(true)}>Location</Button>                         
                              </div>
                            </div>
                          </div>
                        
                        </div>
                        
                      </div>
                      :null
                    }        

                    {user.role==="Product Owner" ?                         
                    <div className='row'>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className='float'>     
                              <div style={{ paddingLeft: '10px',width:'400px' }}>
                              {formError.nic&&formData.nic<=0 ? <div className='error'>{formError.nic}</div>:""}
                                <FloatingLabel controlId="floatingInput" label="NIC" className="mb-3 z-0">
                                  <Form.Control type="text" placeholder='National Identity Card Number' name='nic' value={formData.nic} onChange={handleInput} />
                                </FloatingLabel>
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
                                <FloatingLabel controlId="floatingInput" label="Job" className="mb-3 z-0">
                                  <Form.Select
                                    value={selectedJob}
                                    onChange={(e)=>setSelectedJob(e.target.value)}
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
                              {formError.price&&formData.price<=0 ? <div className='error'>{formError.price}</div>:""}
                                <FloatingLabel controlId="floatingInput" label="Price" className="mb-3 z-0">
                                  <Form.Control type="number" placeholder='price' name='price' value={formData.price} onChange={handleInput}/>
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
                                    onChange={(e)=>setSelectedPayment(e.target.value)}
                                  >
                                    {payments.map(payment => (
                                      <option key={payment.value} value={payment.value}>{payment.label}</option>
                                    ))}
                                  </Form.Select> 
                                </FloatingLabel>
                                {formError.duration? <div className='error'>{formError.duration}</div>:""}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                            <div className='float'>  
                            <div style={{ paddingLeft: '10px',width:'400px' }}>                   
                              {formError.description&&formData.description<=0 ? <div className='error'>{formError.description}</div>:""}
                              <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3 z-0">
                                  <Form.Control as="textarea" placeholder='description' name='description' value={formData.description} style={{height:'100px',width:'100%'}} onChange={handleInput}/>
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
          <div className="regframe">
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

        <MyVerticallyCenteredModal 
          show={modalShow}
          onHide={() => setModalShow(false)}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
      </>
      }
    </>
  ) 
}

export default UpdateUser