import React from "react";
import Payment from "./Payment";
import "./AddProduct.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Col, Form, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import PreviewProduct from "./PreviewProduct"; // Import the PreviewProduct component
import { useSelector } from "react-redux";
import Edit_product from "./Edit_product";

const AddProduct = () => {
  const navigate = useNavigate(); //get the navigate object

  const { user } = useSelector((state) => state.authState);

  /* USESTATE HOOKS */

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [discription, setDiscript] = useState("");
  const [catagory, setCatagory] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState("sell");
  const [isRent, setIsRent] = useState(false);
  const [priceType, setPriceType] = useState("");
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

  //functions for add more items (creating the items array and adding products to it)

  const handleAddItem = () => {
    const newItem = {
      //creating newItem to add the array
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
    const existingData = JSON.parse(sessionStorage.getItem("items")) || []; // get the existing Data from session storag
    const updatedArray = [...existingData, newItem]; // Combine existing data with new data
    setItems(updatedArray);
    sessionStorage.setItem("items", JSON.stringify(updatedArray)); // adding items array to the session storage

    //placing input field empty again to create a new product
    setName("");
    setPrice("");
    setDiscount("");
    setDiscript("");
    setCatagory("");
    setPreviewImages([]);
    setSelectedOption("sell");
    setIsRent(false);
    setPriceType("");

    navigate("preview");
  };

  /* functions for buttons */
  /* privew button */

  return (
    <>
      <MetaData title={"Add Product"} />
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
            <h1 className="styled-heading">Product Adverticement</h1>
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

                <div
                  className="mb-2 PreviewButtonContainer"
                  style={{ alignContent: "center" }}
                >
                  <div style={{ marginTop: "20px", marginBottom: "2pxs" }}>
                    <Button
                      variant="primary"
                      style={{ marginLeft: "35%", border: "none" }}
                      size="lg"
                      onClick={handleAddItem}
                    >
                      Add item
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddProduct;
