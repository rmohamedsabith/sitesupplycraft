import React from "react";
import "./AddProduct.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Col, Form, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import PreviewProduct from "./PreviewProduct"; // Import the PreviewProduct component
import { useSelector } from "react-redux";

const Edit_product = () => {
  //fetching the index of the element

  const Details = JSON.parse(sessionStorage.getItem("items")) || []; // get the existing Data from session storage
  const location = useLocation();
  const activeTabIndex = location.state || 0;
  const ProductDetails = Details[activeTabIndex];

  const { user } = useSelector((state) => state.authState);

  const navigate = useNavigate();
  const [name, setName] = useState(ProductDetails ? ProductDetails.name : "");
  const [price, setPrice] = useState(
    ProductDetails ? ProductDetails.price : ""
  );
  const [discount, setDiscount] = useState(
    ProductDetails ? ProductDetails.discount : ""
  );
  const [discription, setDiscript] = useState(
    ProductDetails ? ProductDetails.description : ""
  );
  const [catagory, setCatagory] = useState(
    ProductDetails ? ProductDetails.category : ""
  );
  const [images, setImages] = useState(
    ProductDetails ? ProductDetails.images : []
  );
  const [previewImages, setPreviewImages] = useState(
    ProductDetails ? ProductDetails.images : []
  );
  const [selectedOption, setSelectedOption] = useState(
    ProductDetails ? ProductDetails.type : "sell"
  );
  const [isRent, setIsRent] = useState(
    ProductDetails ? ProductDetails.type === "rent" : false
  );
  const [priceType, setPriceType] = useState(
    ProductDetails ? ProductDetails.priceType : ""
  );
  const [items, setItems] = useState([]);

  const Categories = [
    "Masonry",
    "Metal",
    "Wood",
    "Plastics",
    "Glass",
    "Electrical",
    "Paints",
    "Tiles",
    "Machines",
    "Tools",
    "Plumbing",
  ];

  /* ONCHANGE FUNCTIONS */
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleDiscriptChange = (event) => {
    setDiscript(event.target.value);
  };

  const handleCatagoryChange = (event) => {
    setCatagory(event.target.value);
    /* console.log(event.target.value); */
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    /* console.log(event.target.value); */
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImages((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handlePriceTypeonChange = (event) => {
    setPriceType(event.target.value);
    /* console.log(event.target.value); */
  };
  const handleEditItem = () => {
    const updatedDetails = [...Details];
    updatedDetails[activeTabIndex] = {
      name: name,
      price: price,
      discount: discount,
      description: discription,
      category: catagory,
      images: previewImages,
      type: selectedOption,
      isRent: isRent,
      priceType: priceType,
      owner: user,
    };
    sessionStorage.setItem("items", JSON.stringify(updatedDetails));

    navigate("/ProductOwner/addProduct/Preview");
  };
  const handleRemoveItem = () => {
    Details.splice(activeTabIndex, 1);
    sessionStorage.setItem("items", JSON.stringify(Details));
    navigate("/ProductOwner/addProduct/Preview");
  };

  return (
    <>
      <MetaData title={"EditProduct"} />
      <Row>
        <Col xs={2} style={{ backgroundColor: "#176B87" }}>
          <div className="p-3">
            <Link to={"/ProductOwner/DashBoard"}>
              <button className="btn1">DashBoard</button>
            </Link>
            <Link to={"/ProductOwner/addProduct"}>
              <button className="btn1">Add Product</button>
            </Link>
            <Link to="/ProductOwner/Messages">
              <button className="btn1">Message</button>
            </Link>
          </div>
        </Col>
        <Col className="addProduct">
          <div className="block" style={{ marginBottom: "30px" }}>
            <h1 className="styled-heading">Edit Product</h1>
            <br />

            {/*FORM ELEMENTS*/}

            <div>
              <Form className="box">
                <div>
                  <label>Type:</label>
                  <br />

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="sell"
                      onClick={() => setIsRent(false)}
                      checked={selectedOption === "sell"}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Sell
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="rent"
                      onClick={() => setIsRent(true)}
                      checked={selectedOption === "rent"}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Rent
                    </label>
                  </div>
                </div>
                <br />
                <div>
                  <label>Name: </label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="nameCs"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <br />

                {isRent ? (
                  <Row>
                    <Col>
                      <div>
                        <label>Price:</label>
                        <Form.Control
                          type="number"
                          placeholder="Price"
                          value={price}
                          onChange={handlePriceChange}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <label>Price Type:</label>
                        <Form.Select
                          aria-label="Default select example"
                          value={priceType}
                          onChange={handlePriceTypeonChange}
                        >
                          <option></option>
                          <option value="/perDay">perDay</option>
                          <option value="/perMonth">perMonth</option>
                          <option value="/perHour">perHour</option>
                        </Form.Select>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <div>
                    <label>Price:</label>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      value={price}
                      onChange={handlePriceChange}
                    />
                  </div>
                )}

                <br />

                <div>
                  <label>Discount:</label>
                  <Form.Control
                    type="number"
                    placeholder="Discount"
                    value={discount}
                    onChange={handleDiscountChange}
                  />
                </div>

                <br />

                <div>
                  <label>Discription:</label>

                  <Form.Control
                    value={discription}
                    onChange={handleDiscriptChange}
                    as="textarea"
                    placeholder="Discritption about the item"
                    style={{ height: "100px" }}
                  />
                </div>

                <br />

                <div>
                  <label>Catagory:</label>

                  <Form.Select
                    aria-label="Default select example"
                    value={catagory}
                    onChange={handleCatagoryChange}
                  >
                    <option></option>
                    {Categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                <br />

                <div>
                  <label>Photos:</label>

                  <Form.Group controlId="formFileLg" className="mb-3">
                    {/* <Form.Label>Large file input example</Form.Label> */}
                    <Form.Control
                      type="file"
                      size="lg"
                      multiple={true}
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                </div>
                {previewImages.map((image) => (
                  <Image
                    className=" mb-3 mr-2 previewImg"
                    key={image}
                    src={image}
                    alt={`Image Preview`}
                    width="55"
                    height="52"
                  />
                ))}

                <div style={{ marginLeft: "16%", marginTop: "5px" }}>
                  <Row>
                    <Col>
                      <Button
                        variant="primary"
                        size="lg"
                        style={{ border: "none" }}
                        onClick={handleRemoveItem}
                      >
                        Remove
                      </Button>
                    </Col>

                    <Col>
                      <Button
                        variant="primary"
                        size="lg"
                        style={{ border: "none" }}
                        onClick={handleEditItem}
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Edit_product;
