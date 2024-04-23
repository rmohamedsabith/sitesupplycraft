import React, { useRef,useEffect, useState } from 'react'
import {clearAuthError, register,  registerUser } from '../../actions/authActions'
import {useDispatch, useSelector } from 'react-redux'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { Col, Dropdown, FloatingLabel, Form, Row } from 'react-bootstrap'
import profilePic from '../../images/default_avatar.png'
import { MdLocationOn } from "react-icons/md";
import { Modal, Button } from 'react-bootstrap'
import PinLocation from '../Google maps/PinLocation';
import SendVerification from '../Auth/SendVerification';
import Verified from '../Auth/VerifyingEmail';
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

const Registration = () => {

  const {isLoading:isLoadingAuth,error, message,isAuthenticated}=useSelector((state)=>state.authState)
  const navigate = useNavigate();
  const {role}=useParams()
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const handleImageClick = () => {
    inputRef.current.click();
  }
  const [modalShow, setModalShow] = useState(false);
  const [ProfilePhoto, setProfilePhoto] = useState(null)
  const [ProfilePhotoPreview, setProfilePhotoPreview] = useState(null)
  const [CurrentBill, setCurrentBill] = useState(null)
  const [CurrentBillPreview, setCurrentBillPreview] = useState(null)
  const [areas,setAreas]=useState([])
  const [currentLocation, setCurrentLocation] = useState(null);
  const [district,setDistrict]=useState('')
  const [city,setCity]=useState('')
  const [Certificate, setCertificate] = useState(null)
  const [CertificatePreview, setCertificatePreview] = useState(null)
  const [formError, setFormError] = useState({role:role});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [fileName, setFileName] = useState("No selected file")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearAuthError)
      });
    } 
    if(isAuthenticated)
    {
      setFormData({
        firstname:'',
        lastname:'',
        password:'',
        confirmPassword:'',
        email:'',
        phone:'',
        no:'',
        street:'',
        city:'',
        district:'',
        postal:'',
        lat:'',
        long:'',
        nic:'',
        shopno:'',
        shopName:'',
        certificate:'',
        currentbill:'',
        job:'',
        price:'',
        duration:'',
        description:'',
        
      });
      navigate('/register/verify/email', { state: { email: formData.email }})

    }
  }, [dispatch, error,isAuthenticated]);

  useEffect(()=>{
    setFormData({
      ...formData,
      role:role,
      lat:currentLocation?.lat,
      long:currentLocation?.long,
    })

  },[currentLocation,role])

  const onChange = (e) => {
    setIsLoading(false)
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

    if(e.target.name === 'currentbill') {
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
  
  const [formData, setFormData] = useState({
    role:'',
    profile : ProfilePhoto,
    firstname:'',
    lastname:'',
    password:'',
    confirmPassword:'',
    email:'',
    phone:'',
    no:'',
    street:'',
    city:'',
    district:'',
    postal:'',
    lat:'',
    long:'',
    nic:'',
    shopno:'',
    shopName:'',
    certificate:'',
    currentbill:'',
    job:'',
    price:'',
    duration:'',
    description:'',
  });

  const handleInput = (e) => {
    setIsLoading(false);
   // if(e.target.value==='')setIsLoading(true)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistrationError(null);
    const validationErrors = {}
    if(!ProfilePhoto){
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

  if(!formData.password.trim()) {
      validationErrors.password = "password is required*"
  } else if(formData.password.length < 6){
      validationErrors.password = "password should be at least 6 char*"
  }

  if(formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "password not matched*"
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
  
  if(city===''){
    validationErrors.city = "city is required*"
  }
  if(district===''){
    validationErrors.district = "district is required*"
  }
  if(!formData.postal.trim()){
    validationErrors.postal = "postal code is required*"
  }

 if(!currentLocation?.lat&&!currentLocation?.long){
    validationErrors.location = "location is required*"
  }  
 

 }
  if(role==='Product Owner')
  {
    if(!formData.nic.trim()){
      validationErrors.nic = "nic is required*"
    }
    if(!formData.shopno.trim()){
      validationErrors.shopno = "shopno is required*"
    }
    if(!formData.shopName.trim()){
      validationErrors.shopName = "shopName is required*"
    }
    if(!CurrentBill){
      validationErrors.currentbill = "currentbill is required*"
    }
  
    if(!Certificate){
      validationErrors.certificate = "certificate is required*"
    }
  }

  if(role==='Job Seeker')
  {
    if(!formData.job.trim()||formData.job===''){
      validationErrors.job = "job is required*"
    }
  
    if(!formData.price.trim()){
      validationErrors.price = "price is required*"
    }
    if(!formData.duration.trim()||formData.duration===''){
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
        userData.append('profile', ProfilePhoto)
        userData.append('firstname', formData.firstname)
        userData.append('lastname', formData.lastname)
        userData.append('email', formData.email)
        userData.append('password', formData.password)
        userData.append('confirmPassword', formData.confirmPassword)
        userData.append('phone', formData.phone);

        if(role!=='Customer')
        {
          userData.append('address.number', formData.no)
          userData.append('address.street', formData.street)
          userData.append('address.city', city)
          userData.append('address.district', district)
          userData.append('address.postalCode', formData.postal)
          userData.append('location.lat', currentLocation.lat)
          userData.append('location.long', currentLocation.long)
        }
        if(role==='Product Owner')
        {
          userData.append('nic', formData.nic)
          userData.append('shopReg_no', formData.shopno)
          userData.append('shopName', formData.shopName)
          userData.append('currentBill', CurrentBill)
          userData.append('certificate', Certificate) 
        }
        if(role==='Job Seeker')
        {
          userData.append('job', formData.job)
          userData.append('price', formData.price)
          userData.append('priceType', formData.duration)
          userData.append('description', formData.description)
        }
        console.log(userData)
        dispatch(register(userData))
        console.log(formData)
    }
  };
  
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
    setCity('')
  },[areas,district])

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
  setIsLoading(false)
  setDistrict(district)
  setFormData({
    ...formData,
    [formData.district]: district,
  });
};
const handleCitySelect = (city) => {
  setIsLoading(false)
  setCity(city)
  setFormData({
    ...formData,
    [formData.city]: city,
  });
};


const jobs=[
  'Electrician',
  'Plumber',
  'Meason',
  'Painter',
  'Tiles',
  'A/C Repair',
  'LandScaping',
  'Engineer',
  'Carpenter',
  'Curtin',
  'Cleaner',
  'Concrete Slup',
  'Movers',
  'CCTV Technician',
  'Cieling',
  'Architech',
  'Contractor',
  'Others'
]
  return (
   <>
   {isLoadingAuth?<Loader/>:
     <>
     <div className='register'>
     <MetaData title={'Register'}/>
       <div className="regframe">
       <div className='card p-3 mx-0 inside'>
       <div className="row" style={{margin:'20px'}}>
         <div className="col-md-12">
         <h2 style={{color:'#053B50'}} >Create an Account</h2>
         <p className="text-success"> {  } </p>

         <form onSubmit={handleSubmit}>
             <div onClick={handleImageClick}>
               <center>
             {formError.profile&&formData.profile<=0 ? <div className='error'>{formError.profile}</div>:""}
             {ProfilePhoto ? <img src={ProfilePhotoPreview} className='profilePic-after'/>:<img src={profilePic} className='profilePic-before'/>}
               <input type='file' ref={inputRef} onChange={onChange} name='profile' style={{display:'none'}}/>
               </center>
             </div>
             <div className="row">
                 <div className="col-md-6">
                   <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>    
                         {formError.firstname&&formData.firstname<=0 ? <div className='error'>{formError.firstname}</div>:""}                        
                         <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3 z-0">
                           <Form.Control type="text" placeholder='First Name' name='firstname' value={formData.firstname} onChange={handleInput} />
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
                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                         {formError.password && formData.password<=0 ? <div className='error'>{formError.password}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 z-0">
                           <Form.Control type="password" placeholder='Password' name='password' value={formData.password} onChange={handleInput} />
                         </FloatingLabel>                            
                       </div>
                     </div>
                     </div>
                 </div>
                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                         {formError.confirmPassword ? <div className='error'>{formError.confirmPassword}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3 z-0">
                           <Form.Control type="password" placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={handleInput} />
                         </FloatingLabel>                            
                       </div>
                     </div>
                     </div>
                 </div>
               </div>

             {role==="Product Owner" ?
             <div className="row">       

             <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.no&&formData.no<=0 ? <div className='error'>{formError.no}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="StreetNo Address" className="mb-3 z-0">
                           <Form.Control type="text" placeholder='no' name='no' value={formData.no} onChange={handleInput} />
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
                         <FloatingLabel controlId="floatingInput" label="StreetName Address" className="mb-3 z-0">
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
                           {district===''?'Select a District':district}
                          </Dropdown.Toggle>              
                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item eventKey="" active={district===''}>Select a District</Dropdown.Item>
                            {areas.map((District)=>{
                             return(<Dropdown.Item key={District.district} active={district===District.district} eventKey={District.district}>{District.district}</Dropdown.Item>)
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
                         {district && (
                            <Dropdown onSelect={handleCitySelect}>
                              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {city || 'Select a City'}
                              </Dropdown.Toggle>
                              <Dropdown.Menu as={CustomMenu}>
                                <Dropdown.Item eventKey="">Select a City</Dropdown.Item>
                                {areas.map((District) => {
                                  if (District.district === district) {
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
                     {formError.location&&formData.lat<=0&&formData.long<=0 ? <div className='error'>{formError.location}</div>:""}
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

                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.nic&&formData.nic<=0 ? <div className='error'>{formError.nic}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="nic" className="mb-3 z-0">
                           <Form.Control type="text" placeholder='National Identity Card Number' name='nic' value={formData.nic} onChange={handleInput} />
                         </FloatingLabel>
                       </div>
                     </div>
                     </div>
                 </div>

                  {/* for Product Owner */}
                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.shopName&&formData.shopName<=0 ? <div className='error'>{formError.shopName}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Shop Name" className="mb-3 z-0">
                           <Form.Control type="text" placeholder='Shop Name' name='shopName' value={formData.shopName} onChange={handleInput} />
                         </FloatingLabel>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.shopno&&formData.shopno<=0 ? <div className='error'>{formError.shopno}</div>:""}
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
                       {formError.certificate&&formData.certificate<=0 ? <div className='error'>{formError.certificate}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Certificate" className="mb-3 z-0">
                           <Form.Control type="file" placeholder='certificate' name='certificate'/*  value={formData.certificate} */ onChange={onChange} />
                         </FloatingLabel>
                         {Certificate ? <img src={CertificatePreview} style={{borderRadius:"100px"}} width={60} height={60}/>:null}
                       </div>
                     </div>
                     </div>
                 </div>

                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.currentbill&&formData.currentbill<=0 ? <div className='error'>{formError.currentbill}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Current Bill" className="mb-3 z-0">
                           <Form.Control type="file" placeholder='currentbill' name='currentbill' /* value={formData.currentbill} */ onChange={onChange} />
                         </FloatingLabel>
                         {CurrentBill ? <img src={CurrentBillPreview} style={{borderRadius:"100px"}} width={60} height={60}/>:null}
                       </div>
                     </div>
                     </div>
                 </div>

             </div>
             
         :null}

             {role==="Job Seeker" ?
             <div className="row">    
            <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.no&&formData.no<=0 ? <div className='error'>{formError.no}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="StreetNo Address" className="mb-3 z-0">
                           <Form.Control type="text" placeholder='no' name='no' value={formData.no} onChange={handleInput} />
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
                         <FloatingLabel controlId="floatingInput" label="StreetName Address" className="mb-3 z-0">
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
                           {district===''?'Select a District':district}
                          </Dropdown.Toggle>              
                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item eventKey="" active={district===''}>Select a District</Dropdown.Item>
                            {areas.map((District)=>{
                             return(<Dropdown.Item key={District.district} active={district===District.district} eventKey={District.district}>{District.district}</Dropdown.Item>)
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
                         {district && (
                            <Dropdown onSelect={handleCitySelect}>
                              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {city || 'Select a City'}
                              </Dropdown.Toggle>
                              <Dropdown.Menu as={CustomMenu}>
                                <Dropdown.Item eventKey="">Select a City</Dropdown.Item>
                                {areas.map((District) => {
                                  if (District.district === district) {
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
                   {formError.location /* &&formData.lat<=0&&formData.long<=0  */? <div className='error'>{formError.location}</div>:""}    
                         <Button name='location' value='location' style={{cursor:'pointer'}} onClick={()=>setModalShow(true)}>Location</Button>                         
                     </div>
                   </div>
                 </div>
               </div>

                 {/* <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.nic&&formData.nic<=0 ? <div className='error'>{formError.nic}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="nic" className="mb-3 z-0">
                           <Form.Control type="text" placeholder='National Identity Card Number' name='nic' value={formData.nic} onChange={handleInput} />
                         </FloatingLabel>
                       </div>
                     </div>
                     </div>
                 </div> */}
                 
                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.job&&formData.job<=0 ? <div className='error'>{formError.job}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Job" className="mb-3 z-0">
                           <Form.Select aria-label='job' name='job' value={formData.job} onChange={handleInput}>
                             <option value={''}>Select a Job</option>
                             {
                              jobs.map((job,index)=>(
                                <option value={job} key={index}>{job}</option>
                              ))
                             }                             
                           </Form.Select>
                         </FloatingLabel>
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
                           <Form.Control type="text" placeholder='price' value={formData.price} name='price' onChange={handleInput} />
                         </FloatingLabel>
                       </div>
                     </div>
                     </div>
                 </div>

                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                       {formError.duration&&formData.duration<=0 ? <div className='error'>{formError.duration}</div>:""}
                         <FloatingLabel controlId="floatingInput" label="Duration" className="mb-3 z-0">
                           <Form.Select aria-label='duration' name='duration' value={formData.duration}  onChange={handleInput}>
                             <option value={''}>Select the payment type</option>
                             <option value="/perHour">Per Hour</option>  
                             <option value="/perDay">Per Day</option>
                             <option value="/perMonth">Per Month</option>
                           </Form.Select>
                         </FloatingLabel>
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

             <button className='btnstyle' type='submit' style={{marginTop:'20px', align:'center'}} disabled={isLoading} onClick={handleSubmit}>{isLoading? "Registering...":"Sign Up"}</button>
         </form>
         {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
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

export default Registration