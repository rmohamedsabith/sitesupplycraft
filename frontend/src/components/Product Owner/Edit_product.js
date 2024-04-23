import React from "react";
import "./AddProduct.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Col, Form, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import PreviewProduct from "./PreviewProduct"; // Import the PreviewProduct component
import { useSelector } from "react-redux";
import { ChatState } from "../../chatContex";

const Edit_product = () => {
  //fetching the index of the element
  const{postProducts,setPostProducts}=ChatState()
  const Details = JSON.parse(sessionStorage.getItem("items")) || []; // get the existing Data from session storage
  const location = useLocation();
  const activeTabIndex = location.state || 0;
  const ProductDetails = Details[activeTabIndex];

  const { user } = useSelector((state) => state.authState);

  const navigate = useNavigate();

  // useState Hook for handling items

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
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState(
    ProductDetails ? ProductDetails.type : "sell"
  );
  const [isRent, setIsRent] = useState(
    ProductDetails ? ProductDetails.type === "rent" : false
  );
  const [priceType, setPriceType] = useState(
    ProductDetails ? ProductDetails.priceType : ""
  );
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
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
    "Others"
  ];

  // useState for handling empty fields

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [discriptionError, setDiscriptError] = useState("");
  const [catagoryError, setCatagoryError] = useState("");
  const [previewImagesError, setPreviewImagesError] = useState("");
  const [selectedOptionError, setSelectedOptionError] = useState("");
  const [priceTypeError, setPriceTypeError] = useState("");

  // empty field useState handling ends

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
    const remaningSlots = 5 - previewImages.length;
    const selectedImages = files.slice(0, remaningSlots); // ensure there is only 5 images
    if (files.length > 5 || files.length > remaningSlots) {
      alert("only 5 images can be added");
    }
    selectedImages.forEach((file) => {
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
  const handleUpdateItem = () => {
    if (validateFields()) {
      const updatedDetails = Details.filter(product=>Details[activeTabIndex]!==product);
      const newItem = {
        name: name,
        price: price,
        discount: discount,
        description: discription,
        category: catagory,
        images: previewImages,
        type: selectedOption,
        owner:user,
        //previewImages:previewImages
      };
      if(selectedOption==='rent')
      {
        newItem.priceType=priceType;
      }
      const updatedArray = [...updatedDetails, newItem]; // Combine existing data with new data
      sessionStorage.setItem("items", JSON.stringify(updatedArray)); // adding items array to the session storage
      const filteredFormData =postProducts.filter(product=>postProducts[activeTabIndex]!==product)
      const formData=new FormData()
        formData.append('name' , name);
        formData.append('price' , price);
        formData.append('discount' , discount);
        formData.append('description' , discription);
        formData.append('type' , selectedOption);
        formData.append('category' , catagory);
        images.forEach (image => {
            formData.append('images', image)
        })
        if(selectedOption==='rent')
        {
          formData.append('priceType' , priceType);
        }

        if(postProducts.length>0)setPostProducts([...filteredFormData,formData])
        else setPostProducts([...filteredFormData,formData])

      navigate("/ProductOwner/addProduct/Preview");
    }
  };
  const handleRemoveItem = () => {
    Details.splice(activeTabIndex, 1);
    sessionStorage.setItem("items", JSON.stringify(Details));
    setPostProducts(postProducts.filter(product=>postProducts[activeTabIndex]!==product))
    navigate("/ProductOwner/addProduct/Preview");
  };
  console.log(postProducts)
  //    ***empty fields handling start

  const validateFields = () => {
    let isValid = true;

    if (name.trim() === "") {
      setNameError("***name is required***");
      isValid = false;
    } else {
      setNameError("");
    }

    if (discount.trim() === "") {
      setDiscountError("***Discount is required***");
      isValid = false;
    } else {
      setDiscountError("");
    }

    if (discription.trim() === "") {
      setDiscriptError("***Discription is required***");
      isValid = false;
    } else {
      setDiscriptError("");
    }

    if (catagory.trim() === "") {
      setCatagoryError("***catagory is required***");
      isValid = false;
    } else {
      setCatagoryError("");
    }

    if (previewImages.length === 0) {
      setPreviewImagesError("***images is required***");
      isValid = false;
    } else {
      setPreviewImagesError("");
    }

    if (selectedOption.trim() === "") {
      setSelectedOptionError("***this feild is requird***");
      isValid = false;
    } else {
      setSelectedOptionError("");
    }

    if (price.trim() === "") {
      setPriceError("***price is requird***");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (selectedOption === "rent") {
      if (priceType.trim() === "") {
        setPriceTypeError("***price type  is required***");
        isValid = false;
      } else {
        setPriceTypeError("");
      }
    }

    return isValid;
  };
  // ***empty fields handling field ends

  const handleRemoveImage = (index) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);
    const updatedFiles = [...images];
    updatedFiles.splice(index, 1);
    setImages(updatedFiles);
  };
  const handleImageClick = (index) => {
    setClickedImageIndex(index === clickedImageIndex ? null : index);
    console.log(clickedImageIndex);
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
                {selectedOptionError && (
                  <span className="error">{selectedOptionError}</span>
                )}
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
                {nameError && <span className="error">{nameError}</span>}
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
                      {priceError && (
                        <span className="error">{priceError}</span>
                      )}
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
                      {priceTypeError && (
                        <span className="error">{priceTypeError}</span>
                      )}
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
                    {priceError && <span className="error">{priceError}</span>}
                  </div>
                )}

                <br />

                <div>
                  <label>Discounted Price:</label>
                  <Form.Control
                    type="number"
                    placeholder="Discount"
                    value={discount}
                    onChange={handleDiscountChange}
                  />
                  {discountError && (
                    <span className="error">{discountError}</span>
                  )}
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
                  {discriptionError && (
                    <span className="error">{discriptionError}</span>
                  )}
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
                  {catagoryError && (
                    <span className="error">{catagoryError}</span>
                  )}
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
                <div>
                  {previewImages.map((image, index) => (
                    <div key={index}>
                      <Image
                        className=" mb-3 mr-2 previewImg"
                        key={image}
                        src={image}
                        alt={`Image Preview`}
                        width="55"
                        height="52"
                        onClick={() => handleImageClick(index)}
                      />
                      {clickedImageIndex === index && (
                        <Button
                          style={{ border: "none" }}
                          variant="primary"
                          size="sm"
                          onClick={() => handleRemoveImage(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {previewImagesError && (
                  <span className="error">{previewImagesError}</span>
                )}
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
                        onClick={handleUpdateItem}
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
