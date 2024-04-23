import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Button,Dropdown, Modal, Offcanvas, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getProduct } from '../../actions/productActions';


const Map = ({ center,productLocations,radius}) => {
  const {model}=useSelector((state)=>state.productsFilteringState)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  const containerStyle = {
    width: '100%',
    height: '80vh',
  };
  // Function to calculate the distance between two coordinates using Haversine formula
  const calculateDistance = (coord1, coord2) => {
    /* const start = {
      latitude: coord1.lat,
      longitude: coord1.lng,
    };
  
    const end = {
      latitude: coord2.latitude,
      longitude: coord2.longitude,
    };
  
    //return haversine(start, end, { unit: 'km' });
    return geolib.distance(start, end) / 1000; // geolib returns distance in meters, divide by 1000 to get kilometers */

  const toRadians = (angle) => (Math.PI / 180) * angle;

  const R = 6371; // Earth radius in kilometers

  const lat1 = toRadians(coord1.lat);
  const lon1 = toRadians(coord1.lng);
  const lat2 = toRadians(coord2.latitude);
  const lon2 = toRadians(coord2.longitude);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers

  return distance;

  };

  // Filter productLocations based on distance from the center
  const filteredLocations = productLocations.filter(product => {
    const productCoord = {
      latitude: product.location?.lat || 0,
      longitude: product.location?.long || 0,
    };
    const distance = calculateDistance(center, productCoord);
    console.log(center)
    console.log(productCoord)
    console.log(distance)
    console.log(radius)
    return distance<=radius;
  });

  const handleRedirect=async(id)=>{
    let type
    if(model!=='laborers')type='product'
              else type='laborer'
    await dispatch(getProduct(id,type))    
    navigate(`/product/${id}`)
  }


  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>       
        {radius!==null?(filteredLocations.map((product, index) => (
          <Fragment key={index}>                
          <Marker key={`marker-${index}`}
          position={{
            lat: product.location?.lat || 0,
            lng: product.location?.long || 0,
          }}/>
          <InfoWindow 
          position={{lat:product.location?.lat,
                    lng:product.location?.long}
                  }
        >
          <div onClick={()=>handleRedirect(product.id)} style={{cursor:'pointer'}}>
          {model !== 'laborers' ? (<><strong>{product.shopName}</strong><br/></>) : null}
            <span>product:- {product.name}<br/>
            Pirce:- {product.price}/=</span>
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div className="rating-inner" style={{width:`${product.ratings/ 5 * 100}%`}}></div>
              </div>
            </div>     
            
          </div>
        </InfoWindow>
          
          </Fragment>                    
        ))):(productLocations.map((product, index) => (
          <Fragment key={index}>                
          <Marker key={`marker-${index}`}
          position={{
            lat: product.location?.lat || 0,
            lng: product.location?.long || 0,
          }}/>
          <InfoWindow 
          position={{lat:product.location?.lat,
                    lng:product.location?.long}
                  }
        >
          <div onClick={()=>handleRedirect(product.id)} style={{cursor:'pointer'}}>
          {model !== 'laborers' ? (<><strong>{product.shopName}</strong><br/></>) : null}
            <span>product:- {product.name}<br/>
            Pirce:- {product.price}/=</span>
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div className="rating-inner" style={{width:`${product.ratings/ 5 * 100}%`}}></div>
              </div>
            </div>     
            
          </div>
        </InfoWindow>
          
          </Fragment>                    
        )))}
      </GoogleMap>
    </LoadScript>
  );
};

const FilterMap = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {model}=useSelector((state)=>state.productsFilteringState)
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [showModal,setShowModal]=useState(false) 
  const[showError,setShowError]=useState(false)
  const [productLocations, setProductLocations] = useState([]);
  const[radius,setRadius]=useState(null)
  // Assuming you have a function to fetch products with their locations from the productsState
  const products = useSelector((state) => state.productsState.products);

  const fetchProductLocations = useCallback(() => {
    
    
    // Assuming each product in the state has properties like location, name, price, and review
    if(products)
    {
      let locations;
      if(model!=='laborers')
      {
        locations = products.map((product) => ({
          id:product._id,
          location: product.owner?.location,
          name:product.name,
          shopName: product.owner?.shopName,
          price: product.price,
          ratings: product.ratings,
        }));
      }
      else{
        locations = products.map((product) => ({
          id:product._id,
          location: product.location,
          name:product.firstname+' '+product.lastname,
          price: product.price,
          ratings: product.ratings,
        }));
      }
      setProductLocations(locations);
    }

   
  }, [products]);

  const fetchUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setShowModal(false);
        },
        (error) => {
          console.error('Error getting user location:', error.message);
         setShowModal(true);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setShowModal(true);
    }
  }, [setCurrentLocation,setShowModal]);

  useEffect(() => {
    fetchUserLocation();
    fetchProductLocations();
  }, [fetchUserLocation, fetchProductLocations]);

  const center =useMemo(()=>{
    return currentLocation
  },[currentLocation])

 
  return (
    <> 
    <div className='location' onClick={!showModal?handleShow:()=>setShowError(true)}
       style={{backgroundColor:'yellowgreen',padding:'10px'}}>Show Available Shops</div>
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Available Shops </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
          <>
          <Row>
            <span>Select the Radius</span>
            <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic" size='sm'>
                      {radius===null?'All':`${radius} Km`} 
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>{setRadius(null)}}>All</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{setRadius(5)}}>5 Km</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{setRadius(10)}}>10 Km</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{setRadius(20)}}>20 Km</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
            </Row>
            <Row>
            <Map center={center} productLocations={productLocations} radius={radius}/>
            </Row>
        </>
        
        
      </Offcanvas.Body>
    </Offcanvas>
    {/* <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>
      Available Shops

      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <>
        <Row>
          <span>Select the Radius</span>
          <Dropdown >
                  <Dropdown.Toggle variant="success" id="dropdown-basic" size='sm'>
                    {radius===null?'All':`${radius} Km`} 
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{setRadius(null)}}>All</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setRadius(5)}}>5 Km</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setRadius(10)}}>10 Km</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setRadius(20)}}>20 Km</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
          </Row>
          <Row>
          <Map center={center} productLocations={productLocations} radius={radius}/>
          </Row>
       </>
      
      
    </Modal.Body>
     </Modal> */}
     <Modal show={showError} onHide={() =>setShowError(false)} centered>
         <Modal.Header closeButton>
           <Modal.Title>Location Error</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <p>Please enable location services to use this feature.</p>
         </Modal.Body>
         <Modal.Footer>
          
           <Button variant="secondary" onClick={() => setShowError(false)}>
             Close
           </Button>
         </Modal.Footer>
      </Modal>

  </>
)
}
export default FilterMap