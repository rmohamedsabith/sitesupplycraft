import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap, InfoWindow, LoadScript} from '@react-google-maps/api';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import { toast } from 'react-toastify';
import { Button, Col, Container, Dropdown, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Map=({center, directions, directionsOptions,directionsCallback})=>{
  const { product } = useSelector((state) => state.productState);
  const containerStyle = {
    width: '100%',
    height: '80vh',
  };

  return(
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}> 
    <GoogleMap mapContainerStyle={containerStyle} center={center}>
      {directions && <DirectionsRenderer directions={directions} />}
        <InfoWindow
          position={{lat:directionsOptions.destination.lat+0.0007,
                    lng:directionsOptions.destination.lng+0.0001}
                  }
        >
          <div>
            <strong>{product.owner.shopName}</strong>
            <p>{`${product.owner.address.number},${product.owner.address.street},${product.owner.address.city},`}<br/>
            {`${product.owner.address.district},${product.owner.address.province},${product.owner.address.postalCode}`}</p>
          </div>
        </InfoWindow>
      
      <DirectionsService
        options={directionsOptions}
        callback={directionsCallback}
      />
    </GoogleMap>
 </LoadScript>
  )

}

const FindLocation = () => {
  const { isLoading, product } = useSelector((state) => state.productState);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance,setDistance]=useState(0)
  const [duration,setDuration]=useState(0)
  const [transportMode,setTransportMode]=useState('DRIVING')
  const [showModal,setShowModal]=useState(false) 

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
        },
        { enableHighAccuracy: true } // Specify the enableHighAccuracy option
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setShowModal(true);
    }
  }, [setCurrentLocation,setShowModal]);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  const center =useMemo(()=>{
    return currentLocation ? currentLocation : { lat: 0, lng: 0 };
  },[currentLocation])

  const directionsOptions =useMemo(()=>{
    return {
      origin: center,
      destination: {
        lat: product.owner.location.lat,
        lng: product.owner.location.long,
      },
      travelMode: transportMode, // Default travel mode
      optimizeWaypoints: true, // Optimize the order of waypoints for the shortest path
    };
  }, [center, product.owner.location.lat, product.owner.location.long, transportMode]);
  const fetchDistance = useCallback(() => {
    if (!window.google || !window.google.maps) {
     toast.error('Google Maps script not loaded.',{
      position:'bottom-center'
     });
      return;
    }
  
    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
      origins: [currentLocation],
      destinations: [directionsOptions.destination],
      travelMode: transportMode,
    }, (response, status) => {
      if (status === 'OK') {
        const distanceText = response.rows[0].elements[0].distance.text;
        const durationText = response.rows[0].elements[0].duration.text;

        setDistance(distanceText);
        setDuration(durationText);
      } else {
        console.error(`Distance matrix request failed: ${status}`);
      }
    });
  },[currentLocation,directionsOptions,transportMode])
  const directionsCallback = useCallback((result, status) => {
    if (status === 'OK') {
      setDirections(result);
      fetchDistance()
      toast.success(`Directions request success: ${status}`,{
        position:'bottom-center'
      })
    } else {
      toast.error(`Directions request failed: ${status}`,{
        position:'bottom-center'
      })
    }
  }, [fetchDistance]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <Container style={{margin:'20px auto'}}>
          <MetaData title={'Find Location'} />
          <Row>
            <Col md={8}>
            <Map center={center} directions={directions} directionsOptions={directionsOptions} directionsCallback={directionsCallback} />
            </Col>         
          <Col className='card p-5' >
            <center><h1 style={{color:'#053B50'}}>Route</h1></center>
            <Row>
              <Col md={{ span: 4, offset: 1 }}>From:-</Col>
              <Col style={{color:'blue'}}>Your Location</Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }}>To:-</Col>
              <Col style={{color:'blue'}}>{product.owner.shopName}</Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }}>Distance:-</Col>
              <Col style={{color:'blue'}}>{distance}</Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 1 }}>Mode:-</Col>
              <Col style={{color:'blue'}}>
                <Dropdown >
                  <Dropdown.Toggle variant="success" id="dropdown-basic" size='sm'>
                    {transportMode}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{setTransportMode('DRIVING')}}>DRIVING</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setTransportMode('WALKING')}}>WALKING</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setTransportMode('TRANSIT')}}>TRANSIT</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 5, offset: 1 }}>Duration:-</Col>
              <Col style={{color:'blue'}}>{duration}</Col>
            </Row>
          
          </Col>
            
          </Row>      
        </Container>

         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
         <Modal.Header closeButton>
           <Modal.Title>Location Error</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <p>Please enable location services to use this feature.</p>
         </Modal.Body>
         <Modal.Footer>
          <Link to={`/product/${product._id}`}>
           <Button variant="secondary" onClick={() => setShowModal(false)}>
             Close
           </Button>
           </Link>
         </Modal.Footer>
        </Modal>
       </>
      )}
    </>
  );
};

export default FindLocation;
