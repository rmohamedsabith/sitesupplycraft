import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row,Form} from 'react-bootstrap';
import MetaData from '../Layouts/MetaData';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addProduct } from '../../actions/productActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { createPayment } from '../../actions/paymentActions';
import { clearProduct } from '../../slices/productSlice';
import { ChatState } from '../../chatContex';


const Payment = () => {
    const{postProducts,setPostProducts}=ChatState()
    const Details = JSON.parse(sessionStorage.getItem("items")) || {}; // get the existing Data from session storage
    const stripe=useStripe()
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user } = useSelector(state => state.authState)
    const {product,isProductAdded,error:addProductErr}=useSelector(state=>state.productState)
    const [postedItems,setPostedItems]=useState(null)
    const [paymentInfo,setPaymentInfo]=useState(null)
    const postItems={
        totalPrice:Object.keys(Details).length>1?Object.keys(Details).length*100:Object.keys(Details).length*200,
        count:Details.length,   
    }

    
    useEffect(() => {
        if(product)
        {
            if(postedItems?.length>0) setPostedItems([...postedItems, product])
            else setPostedItems([product])
            console.log("posted items",postedItems)
        }
    },[product]);
    
    useEffect(() => {
        const createPaymentAndDisplayToast = async () => {
            console.log("welcome", postedItems);
            if (isProductAdded && postedItems?.length === Details.length) {
                // Assuming postItems and paymentInfo are defined elsewhere
                postItems.postedItems = postedItems;
                postItems.paymentInfo = paymentInfo;
                console.log("postitems", postItems);
                await dispatch(createPayment(postItems));
                // After createPayment finishes, display toast and perform other actions
                toast('Product Created Successfully!', {
                    type: 'success',
                    position: toast.POSITION.BOTTOM_CENTER,
                    onOpen: () => dispatch(clearProduct())
                });
                sessionStorage.removeItem("items");
                setPostProducts([]);
                navigate('/ProductOwner/DashBoard');
            }
        };
    
        createPaymentAndDisplayToast();
    }, [isProductAdded, postedItems?.length]);
    



    const paymentData={
        amount:Object.keys(Details).length>1?Object.keys(Details).length*100:Object.keys(Details).length*200
    }
    //console.log(Details,Details.length)
   
    const handlepaymentbutton=async (e)=>{
        e.preventDefault()
        if (
            elements.getElement(CardNumberElement).isEmpty ||
            elements.getElement(CardExpiryElement).isEmpty ||
            elements.getElement(CardCvcElement).isEmpty
        ) {
            toast.error('Please fill all fields', { position: 'bottom-center' });
            return;
        }
        else{
            
            try {
                document.getElementById('pay_btn').disabled=true
                const {data} = await axios.post('/SiteSupplyCraft/payment/process', paymentData)
                console.log(data)
                const clientSecret = data.client_secret
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user.name,
                            email: user.email
                        }
                    }
                })
    
                if(result.error){
                    toast(result.error.message, {
                        type: 'error',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    document.querySelector('#pay_btn').disabled = false;
                }else{
                    if((await result).paymentIntent.status === 'succeeded') {
                        toast('Payment Success!', {
                            type: 'success',
                            position: toast.POSITION.BOTTOM_CENTER
                        })
                        
                        setPaymentInfo( {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status
                        })
                        for( let i=0;i<postProducts.length;i++)
                        {
                            dispatch(addProduct(postProducts[i]))
                        }
                        
                    }else{
                        toast('Please Try again!', {
                            type: 'warning',
                            position: toast.POSITION.BOTTOM_CENTER
                        })
                    }
                }
    
    
            } catch (error) {
                console.error(error)
                document.querySelector('#pay_btn').disabled = false;
            }
        }
        

    }

    const handleBackPage=()=>{
        navigate('/ProductOwner/addProduct/Preview')
    }



  return (
    <div style={{marginLeft:'20px'}}>
        <FontAwesomeIcon icon={faArrowLeft} size="3x" style={{marginTop:'30px'}} onClick={handleBackPage}/>
        <div className='parent'>
        <MetaData title={'Payment'}/>
        <div className="frame-reset">
            <div className='card d-inline-block p-3 reset' >
                    {/*<h1> Payments</h1>
                    <Form.Label htmlFor="Card_Name">Name on Card</Form.Label>
                    <Form.Control
                        value={c_name}
                        type="text"
                        onChange={handleCardName}
                        aria-describedby="passwordHelpBlock"
                        required
                    />

                    <Form.Label htmlFor="Card_Number">Card Number</Form.Label>
                    <Form.Control
                        type="number"
                        onChange={handleCardNumber}
                        value={c_number}
                        aria-describedby="passwordHelpBlock"
                        required
                    />

                    <Row>
                        <Col>
                        <Form.Label htmlFor="date">Valid</Form.Label>
                        <Form.Control
                            onChange={handleCardDate}
                            type="month"
                            value={c_date}
                            //pattern="(0[1-9]|1[0-2])\/(202[2-9]|2030)"
                            placeholder="MM/YYYY"
                            aria-describedby="passwordHelpBlock"
                            required
                        />
                        </Col>
                        <Col>
                        <Form.Label htmlFor="CVC">CVC</Form.Label>
                        <Form.Control
                            type="text"
                            value={c_cvc}
                            onChange={handleCardCVC}
                            maxLength={3}
                            pattern="[0-9]{3}"
                            inputMode="numeric"
                            required
                        />
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-between mt-3'>
                        <h5 style={{color:'red'}}> Total Amount ({Details.length} x 100) = Rs.{Details.length*100}</h5>
                        <Button
                        style={{ border: "none" }}
                        onClick={handlepaymentbutton}
                        disabled={!isFormValid}
                        >
                        Pay
                        </Button>
                    </div> */}
                    <form onSubmit={handlepaymentbutton}>
                        <h1>Card Info</h1>
                        <div className="form-group">
                        <label htmlFor="card_num_field">Card Number</label>
                        <CardNumberElement
                            type="text"
                            id="card_num_field"
                            className="form-control"                       
                        />
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control"                       
                        />
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement
                            type="text"
                            id="card_cvc_field"
                            className="form-control"
                        />
                        </div>       
                    
                        <button
                        id="pay_btn"
                        type="submit"
                        className="btn btn-block py-3" 
                        style={{fontSize:'16px',fontWeight:'bolder',color:'orangered',textTransform:'capitalize'}}                   >
                        Pay - {Object.keys(Details).length>1?`${Object.keys(Details).length}x 100`:`${Object.keys(Details).length}x 200`}  = Rs.{Object.keys(Details).length>1?Object.keys(Details).length*100:Object.keys(Details).length*200}
                        </button>
            
                    </form>
            </div> 

        </div>
        </div>
    </div>
   
   
        
     
  );
};


export default Payment
