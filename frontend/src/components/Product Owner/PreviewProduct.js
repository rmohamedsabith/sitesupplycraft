import React, { useEffect, useState } from "react";
import AddReview from "../Reviews/AddReview";
import { toast } from "react-toastify";
import Carousel from "react-bootstrap/Carousel";
import Figure from "react-bootstrap/Figure";
import Loader from "../Loader";
import { Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import "./Previw.css";
import { Navigate } from "react-router-dom";
import { faArrowLeft, faSquarePlus} from '@fortawesome/free-solid-svg-icons';
import Payment from "./Payment";
import { ChatState } from "../../chatContex";



const PreviewProduct = () => {
  // handling the item array
  const{postProducts,setPostProducts}=ChatState()
  const [activeTab, setActiveTab] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(null);

  const navigate = useNavigate();

  console.log(postProducts)
  //edit button handler

  const onClickEditHandler = () => {
    const activeTabIndex = activeTab;
    navigate("/productOwner/addProduct/Preview/Edit", {
      state: activeTabIndex,
    });
    console.log(activeTab);
  };

  //edit button ends

  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  //const [modalShow, setModalShow] = React.useState(false);

  // Get product details Add Product page
  const Details = JSON.parse(sessionStorage.getItem("items")) || []; // get the existing Data from session storage

  //handling the state object rendering from session storage
  if (!Details || !Details.length) {
    return null;
  }

  const HandleClick = (image) => {
    setIsClicked(true);
    setSelectedImage(image);
  };
  const handleCarouselSelect = (selectedIndex, e) => {
    if (!isClicked && currentProduct) {
      const selectedImage = currentProduct.images[selectedIndex].image;
      setSelectedImage(selectedImage);
    }
  };
  const handleAddMorebutton = () => {
    navigate("/productOwner/addProduct");
  };
  const handleBackPage = () => {
    navigate("/ProductOwner/addProduct");
  };
  const handlePay = () => {
    if(Object.keys(Details).length>0)navigate('/ProductOwner/addProduct/Pay')
  };


   // ***paymet model popup ***

   /* const PaymentAlert = (props) => {
    const [c_name, setCName] = useState("");
    const [c_number, setCNumber] = useState("");
    const [c_date, setCDate] = useState("");
    const [c_cvc, setCCVC] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
      if (c_name && c_number && c_date && c_cvc) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }, [c_name, c_number, c_date, c_cvc]);

    //functions to handle useStates

    const handleCardName = (event) => {
      setCName(event.target.value);
    };

    const handleCardNumber = (event) => {
      setCNumber(event.target.value);
    };

    const handleCardDate = (event) => {
      setCDate(event.target.value);
    };

    const handleCardCVC = (event) => {
      setCCVC(event.target.value);
    };
    const handlepaymentbutton = () => {
      if (isFormValid) {
        alert("payment successful");
          //asigning values to a variable
        const payDetails ={
          p_name : c_name,
          p_number: c_number,
          p_date:c_date,
          p_cvc:c_cvc
        };
        //console.log(payDetails);

        props.onHide();
      } else {
        alert("fill all the required filds");
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "green", alignContent: "center" }}
        >
          <h1> Payments</h1>
        </Modal.Header>
        <Modal.Body>
          <>
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
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ border: "none" }}
            onClick={handlepaymentbutton}
            disabled={!isFormValid}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }; */

  //  ***payment model end ***
  return (
    <div className="d-flex justify-content-center align-item-center">
      <MetaData title={"Preview"} />
      <div style={{ marginLeft: "3px", marginTop: "3px" }}>
      <FontAwesomeIcon icon={faArrowLeft} size="3x" style={{marginTop:'30px'}} onClick={handleBackPage}/>
      </div>
      <div
        className="card productFrame"
        onDoubleClick={() => setIsClicked(false)}
      >
        
        <Tabs
          activeKey={activeTab}
          onSelect={(index) => setActiveTab(index)}
          id="controlled-tab-example"
          className="mb-3"
          fill
          justify
        >
          {Details.map((product, index) => (
            <Tab
              key={index}
              eventKey={index}
              title={
                <div>
                  <a
                    href="#"
                    style={{ backgroundColor: activeTab === index ? "" : "" }}
                  >
                    {product.name}
                  </a>
                </div>
              }
            >
              <Row>
                <>
                  <Col>
                    <Carousel
                      data-bs-theme="dark"
                      style={{ width: "90%", height: "50vh", zIndex: "0" }}
                      onSelect={handleCarouselSelect}
                    >
                      {!isClicked ? (
                        product.images &&
                        product.images?.map((image, index) => (
                          <Carousel.Item interval={2000} key={index}>
                            <img
                              width={300}
                              height={400}
                              className="d-block w-100 carouselImage"
                              src={image}
                              alt="First slide" 
                            />
                          </Carousel.Item>
                        ))
                      ) : (
                        <Carousel.Item>
                          <img
                            width={400}
                            height={400}
                            className="d-block w-100 carouselImage"
                            src={selectedImage}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      )}
                    </Carousel>

                    {product.images &&
                      product.images.map((image, index) => (
                        <Figure.Image
                          key={index}
                          className="smallImage"
                          style={{
                            border: `${
                              selectedImage === image.image
                                ? "3px solid #fa9c23"
                                : "1px solid #053B50"
                            }`,
                          }}
                          alt="171x180"
                          src={image}
                          onClick={() => HandleClick(image.image)}
                        />
                      ))}
                  </Col>
                  <Col style={{ margin: "30px" }}>
                    <Row>
                      <Col>
                        <h1>{product.name}</h1>
                      </Col>
                      <Col xs={3}>
                        <Row>
                          <Col className="previewPriceType" >{product.type}</Col>
                        </Row>
                      </Col>
                    </Row>

                    <h3 style={{ color: "red", display: "inline" }}>
                      Rs.{product.price}
                    </h3>
                    <h5
                      style={{
                        textDecoration: "line-through",
                        display: "inline",
                        margin: "30px",
                      }}
                    >
                      Rs.{product.discount}
                    </h5>
                    {product.type === "rent" ? (
                      <p
                        style={{
                          paddingLeft: "5px",
                          color: "black",
                          display: "inline",
                          
                        }}
                      >
                        {product.priceType}
                      </p>
                    ) : null}
                    <br />

                    <br />
                    <h6 style={{ color: "#1A9406" }}>
                      {product.owner?.shopName}
                    </h6>
                    <span style={{ paddingLeft: "10px" }}>
                      {product.owner?.address.number},{" "}
                      {product.owner?.address.street},{" "}
                      {product.owner?.address.city}
                    </span>
                    <br />
                    <span style={{ paddingLeft: "12px" }}>
                      {product.owner?.address.district}-
                      {product.owner?.address.postalCode}
                    </span>
                    <br />
                    <span>
                      <a
                        href={`mailto:${product.owner?.email}`}
                        style={{ paddingLeft: "10px", color: "#053B50" }}
                      >
                        {product.owner?.email}
                      </a>
                    </span>
                    <p style={{ paddingLeft: "10px", color: "red" }}>
                      {product.owner?.phone}
                    </p>
                    <br />              
                  </Col>
                </>
              </Row>

              <div className="description">
                <h2 style={{ textDecoration: "underline" }}>Description</h2>
                <pre>{product.description}</pre>
              </div>
              <div
                className="buttons"
                style={{
                  marginTop: "10px",
                  marginRight: "0px",
                  textAlign: "right",
                }}
              >
                <Button
                  className="Preview-buttons"
                  onClick={onClickEditHandler}
                  variant="primary"
                  style={{
                    width: "150px",
                    height: "50px",
                    border: "none",
                    marginBottom: "20px",
                    marginRight: "20px",
                    backgroundColor: "green",
                  }}
                >
                  {" "}
                  Edit
                </Button>{" "}
              </div>
            </Tab>
          ))}
        </Tabs>
        <div className="d-flex justify-content-center align-item-center">
        <Button
            className="Preview-buttons"
            variant="primary"
            style={{
              border: "none",
            
              width:'500px'
            }}
            //onClick={() => setModalShow(true)}
            onClick={handlePay}
          >
            <span style={{fontSize:'20px'}}>Publish</span><br/>
            Total Amount <br/>{Object.keys(Details).length>1?`${Object.keys(Details).length}x 100`:`${Object.keys(Details).length}x 200`}  = Rs.{Object.keys(Details).length>1?Object.keys(Details).length*100:Object.keys(Details).length*200}
        </Button>
        </div>
        
      </div>
      
      <div style={{ marginRight: "5px" }}>
     <FontAwesomeIcon icon={faSquarePlus} size="3x" style={{marginTop:'30px',cursor:'pointer'}} onClick={handleAddMorebutton}/>       
        {/* <PaymentAlert show={modalShow} onHide={() => setModalShow(false)} /> */}
      </div>
    </div>
  );
};

export default PreviewProduct;
