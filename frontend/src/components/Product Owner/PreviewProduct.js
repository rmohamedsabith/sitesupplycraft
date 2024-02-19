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
import Cookies from "js-cookie";

const PreviewProduct = () => {
  // handling the item array
  const [activeTab, setActiveTab] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(null);

  const navigatee = useNavigate();

  //edit button handler

  const onClickEditHandler = () => {
    const activeTabIndex = activeTab;
    navigatee("/productOwner/addProduct/Preview/Edit", {
      state: activeTabIndex,
    });
    console.log(activeTab);
  };

  //edit button ends

  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

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
    navigatee("/productOwner/addProduct");
  };
  const handleBackPage = () => {
    navigatee("/ProductOwner/addProduct");
  };

  // ***paymet model popup ***

  const PaymentAlert = (props) => {
    const [c_name, setCName] = useState("");
    const [c_number, setCNumber] = useState("");
    const [c_date, setCDate] = useState("");
    const [c_cvc, setCCVC] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
      if ((c_name, c_number, c_date, c_cvc)) {
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
        props.onHide();
      } else {
        alert("fill the required filds");
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
                  type="date"
                  value={c_date}
                  aria-describedby="passwordHelpBlock"
                  required
                />
              </Col>
              <Col>
                <Form.Label htmlFor="CVC">CVC</Form.Label>
                <Form.Control
                  type="number"
                  value={c_cvc}
                  aria-describedby="passwordHelpBlock"
                  inputMode="numeric"
                  onChange={handleCardCVC}
                  required
                />
              </Col>
            </Row>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlepaymentbutton} disabled={!isFormValid}>
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  //  ***payment model end ***

  return (
    <div className="d-flex justify-content-center align-item-center">
      <MetaData title={"Preview"} />
      <div style={{ marginLeft: "3px", marginTop: "3px" }}>
        <img
          src="../images/back.png"
          alt="back page"
          onClick={handleBackPage}
        />
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
                          <Col>{product.type}</Col>
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
                          color: "grey",
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
                    <Row>
                      <Col>
                        <div
                          style={{
                            backgroundColor: "#1A9406",
                            padding: "10px 20px",
                            borderRadius: "20px",
                            display: "inline-block",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faWhatsapp}
                            style={{
                              color: "#ffff",
                              fontSize: "20px",
                              paddingRight: "10px",
                            }}
                          />
                          <span style={{ color: "#ffff" }}>Whatsapp</span>
                        </div>
                      </Col>
                    </Row>
                    <Row></Row>
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
      </div>
      <div style={{ marginRight: "5px" }}>
        <Button
          onClick={handleAddMorebutton}
          variant="primary"
          style={{
            width: "150px",
            height: "50px",
            marginTop: "150px",
            border: "none",
          }}
        >
          Add More
        </Button>{" "}
        <Button
          className="Preview-buttons"
          variant="primary"
          style={{
            border: "none",
            width: "150px",
            height: "50px",
            marginTop: "20px",
          }}
          onClick={() => setModalShow(true)}
        >
          Publish
        </Button>{" "}
        <PaymentAlert show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default PreviewProduct;
