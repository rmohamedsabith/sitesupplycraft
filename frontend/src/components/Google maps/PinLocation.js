/* import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const PinLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null);

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
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setShowModal(true);
    }
  }, [setCurrentLocation, setShowModal]);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  const center = useMemo(() => {
    return currentLocation ? currentLocation : { lat: 0, lng: 0 };
  }, [currentLocation]);

  const handleMapClick = (event) => {
    setClickedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })

  };

  const containerStyle = {
    width: '100%',
    height: '80vh',
  };

  return (
    <>
         {clickedLocation &&(
            <h1>lat:{clickedLocation.lat}<br/>
            lng:{clickedLocation.lng}</h1>
        )}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onClick={handleMapClick}
        >
          {clickedLocation && (
            <Marker position={clickedLocation} />
          )}
        </GoogleMap>
      </LoadScript>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Location Error</Modal.Title>
         </Modal.Header>
        <Modal.Body>
          <p>Please enable location services to use this feature.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PinLocation;
 */

import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

// Mapbox access token
mapboxgl.accessToken = `${process.env.REACT_APP_MAP_TOKEN}`;

const PinLocation = ({setCurrentLocation}) => {
  const [longitude, setLongitude] = useState("80.4811");
  const [latitude, setLatitude] = useState("6.0101");

 useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 10,
    });

    // Add marker
    const marker=new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      console.log(lng, lat);
      setLongitude(lng);
      setLatitude(lat);
      setCurrentLocation({ lat, long: lng });
      marker.setLngLat([lng, lat]);
    });

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <div id="map-container" style={{ width: "100%", height: "70vh" }}></div>
  );
};

export default PinLocation;