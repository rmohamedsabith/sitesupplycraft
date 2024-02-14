import React, { useRef,useEffect, useState } from 'react'
import {clearAuthError, register,  registerUser } from '../../actions/authActions'
import {useDispatch, useSelector } from 'react-redux'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
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
        <PinLocation/>
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
  const [Certificate, setCertificate] = useState(null)
  const [CertificatePreview, setCertificatePreview] = useState(null)

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearAuthError)
      });
    } else {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearAuthError)
      });
    }
  }, [dispatch, error, message]);

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
  const [fileName, setFileName] = useState("No selected file")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    role:role,
    profile : ProfilePhoto,
    firstname:'',
    lastname:'',
    password:'',
    confirmPassword:'',
    email:'',
    phone:'',
    street:'',
    city:'',
    district:'',
    postal:'',
    location:'',
    NIC:'',
    shopno:'',
    certificate:'',
    currentbill:'',
    job:'',
    price:'',
    duration:'',
    description:'',
  });

  

  const [formError, setFormError] = useState({role:role});

  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  
  const handleInput = (e) => {
    setIsLoading(false);
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

  /*if(!formData.job.trim()){
    validationErrors.job = "job is required*"
  }*/

  setFormError(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      
        setFormData({
          firstname:'',
          lastname:'',
          password:'',
          confirmPassword:'',
          email:'',
          phone:'',
          street:'',
          city:'',
          district:'',
          postal:'',
          location:'',
          NIC:'',
          shopno:'',
          certificate:'',
          currentbill:'',
          job:'',
          price:'',
          duration:'',
          description:'',
        });

        const userData = new FormData();
        userData.append('role', formData.role)
        userData.append('profile', ProfilePhoto)
        userData.append('firstname', formData.firstname)
        userData.append('lastname', formData.lastname)
        userData.append('email', formData.email)
        userData.append('password', formData.password)
        userData.append('confirmPassword', formData.confirmPassword)
        userData.append('phone', formData.phone);
        dispatch(register(userData))


        if(isAuthenticated)navigate('verify/email', { state: { email: formData.email }})
    }
  };

  return (
   <>
   {isLoadingAuth?<Loader/>:
     <>
     <div className='register'>
     <MetaData title={'register'}/>
       <div className="frame">
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
                       <FloatingLabel controlId="floatingInput" label="Location" className="mb-3 z-0">
                         <Form.Control type="text" placeholder='location' name='location' value={formData.location} onChange={handleInput} />
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
                         {Certificate ? <img src={CertificatePreview} style={{borderRadius:"100px"}} width={60} height={60}/>:null}
                       </div>
                     </div>
                     </div>
                 </div>

                 <div className="col-md-6">
                     <div className="mb-3">
                     <div className='float'>     
                       <div style={{ paddingLeft: '10px',width:'400px' }}>
                         <FloatingLabel controlId="floatingInput" label="Current Bill" className="mb-3 z-0">
                           <Form.Control type="file" placeholder='currentbill' name='currentbill' value={formData.currentbill} onChange={onChange} />
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
                       <FloatingLabel controlId="floatingInput" label="Location" className="mb-3 z-0">
                         <Form.Control type="text" placeholder='location' name='location' value={formData.location} onChange={handleInput} />
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
                         <FloatingLabel controlId="floatingInput" label="Job" className="mb-3 z-0">
                           <Form.Select aria-label='job' name='job'>
                             <option>Select a Job</option>
                             <option value="1">Electrician</option>
                             <option value="2">Two</option>
                             <option value="3">Three</option>
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
   />
   
   </>
   }
   
   </>
  
  )
  
}

export default Registration