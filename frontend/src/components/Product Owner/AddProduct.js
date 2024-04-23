import React from "react";
import "./AddProduct.css";
import { Link, useNavigate } from "react-router-dom";
import { Col, Form, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import MetaData from "../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import { ChatState } from "../../chatContex";
import { getMessages } from "../../actions/messagesAction";

const AddProduct = () => {
  const navigate = useNavigate(); //get the navigate object
  const dispatch = useDispatch(); //get the navigate object
  const{postProducts,setPostProducts}=ChatState()

  const { user } = useSelector((state) => state.authState);

  //USESTATE FOR HANDLING EMPTY INPUT FIELDS
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [discriptionError, setDiscriptError] = useState("");
  const [catagoryError, setCatagoryError] = useState("");
  const [previewImagesError, setPreviewImagesError] = useState("");
  const [selectedOptionError, setSelectedOptionError] = useState("");
  const [priceTypeError, setPriceTypeError] = useState("");

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
      setPriceError("***the price is requird***");
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

  /* USESTATE HOOKS */
  const [hasItems, setHasItems] = useState(false);
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
  //const [items, setItems] = useState([]);

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

  //functions for add more items (creating the items array and adding products to it)

  const handleAddItem = async() => {
    
    console.log(images)
    if (validateFields()) {
      document.getElementById('addItem').disabled=true
      const newItem = {
        //creating newItem to add the array
        name: name,
        price: price,
        discount: discount,
        description: discription,
        category: catagory,
        images: previewImages,
        type: selectedOption,
        owner:user
      };
      if(selectedOption==='rent')
      {
        newItem.priceType=priceType;
      }
      
     
       const {data}=await axios.post('/SiteSupplyCraft/products/check',{name})
       if(!data.duplicate)
       {
        const existingData = JSON.parse(sessionStorage.getItem("items")) || []; // get the existing Data from session storag
        const updatedArray = [...existingData, newItem]; // Combine existing data with new data
        //setItems(updatedArray);
        sessionStorage.setItem("items", JSON.stringify(updatedArray)); // adding items array to the session storage

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

        if(postProducts.length>0)setPostProducts([...postProducts,formData])
        else setPostProducts([formData])

        
        console.log(formData)
  
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
       }
       else{
        document.getElementById('addItem').disabled=false

        toast.error('There is a duplicate name please change your name',{
          position:'bottom-center'
        })
       }
      
    }
    else{
      document.getElementById('addItem').disabled=false
    }
  };
  const handlForwordPage = () => {
    navigate("preview");
  };

  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem("items"));
    if (items && items.length > 0) {
      setHasItems(true);
    } else {
      setHasItems(false);
    }
  }, []);


  const handleMessage=()=>{
    dispatch(getMessages).then(()=>navigate('/ProductOwner/Messages'))
  }


  return (
    <>
      <MetaData title={"Add Product"} />
      <Row>
      <Col xs={2}  style={{backgroundColor:'#176B87',minHeight:'90vh'}}>     
      <div className='p-3'>
        <Link to={'/ProductOwner/DashBoard'}><button className='btn1'>DashBoard</button></Link>
        <Link to={'/ProductOwner/addProduct'}><button className='btn1'>Add Product</button></Link>
        <button className='btn1' onClick={handleMessage}>Message</button>
      </div> 
      </Col>
        <Col className="addProduct">
          {hasItems && (
            <div style={{marginRight:"50px", position:"absolute", right:"10px"}}>
              <FontAwesomeIcon icon={faArrowRight} size="3x" onClick={handlForwordPage} />
            </div>
          )}

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
                        <label>Discounted Price:</label>
                        <Form.Control
                          type="number"
                          placeholder="Discounted Price"
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
                    <label>Discounted Price:</label>
                    <Form.Control
                      type="number"
                      placeholder="Discounted Price"
                      value={price}
                      onChange={handlePriceChange}
                    />
                    {priceError && <span className="error">{priceError}</span>}
                  </div>
                )}

                <br />

                <div>
                  <label>Price:</label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    value={discount}
                    onChange={handleDiscountChange}
                  />
                </div>
                {discountError && (
                  <span className="error">{discountError}</span>
                )}
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
                {previewImagesError && (
                  <span className="error">{previewImagesError}</span>
                )}
                <div
                  className="mb-2 PreviewButtonContainer"
                  style={{ alignContent: "center" }}
                >
                  <div style={{ marginTop: "20px", marginBottom: "2pxs" }}>
                    <Button
                      id="addItem"
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
