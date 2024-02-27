import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Modal, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';
import Dropdown from 'react-native-element-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Rating } from 'react-native-ratings';

const FilterLocation = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [productLocations, setProductLocations] = useState([]);
  const [radius, setRadius] = useState(0)
  const [isActive,setIsActive]=useState(0)
  const {products,totalCount,count,error,isLoading,resPerPage}=useSelector((state)=>state.productsState)
  const{price,category,rating,city,model}=useSelector((state)=>state.productsFilteringState)
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    if (productLocations.length > 0) {
      const coordinates = productLocations.map(product => product.coordinate);
      const minLat = Math.min(...coordinates.map(coord => coord.latitude));
      const maxLat = Math.max(...coordinates.map(coord => coord.latitude));
      const minLng = Math.min(...coordinates.map(coord => coord.longitude));
      const maxLng = Math.max(...coordinates.map(coord => coord.longitude));
      const LATITUDE_PADDING = 0.5;
      const LONGITUDE_PADDING = 0.5;
      const deltaLat = maxLat - minLat + LATITUDE_PADDING * 2;
      const deltaLng = maxLng - minLng + LONGITUDE_PADDING * 2;

      setMapRegion({
        latitude: (maxLat + minLat) / 2,
        longitude: (maxLng + minLng) / 2,
        latitudeDelta: deltaLat,
        longitudeDelta: deltaLng,
      });
    }
  }, [productLocations]);

  useEffect(() => {
    fetchCurrentLocation()
    if(model==='laborers')
    {
      console.log(products)
      setProductLocations(products.map(product => ({
        id: product.id,
        coordinate: {
          latitude: product.location.lat,
          longitude: product.location.long
        },
        firstName: product.firstname,
        lastName: product.lastname,
        price: product.price,
        ratings: product.ratings,
      })));
    }else{
      setProductLocations(products.map(product => ({
        id: product._id,
        coordinate: {
          latitude: product.owner.location.lat,
          longitude: product.owner.location.long
        },
        name: product.name,
        shopName: product.owner.shopName,
        price: product.price,
        ratings: product.ratings,
      })));
    }
  }, [radius]);


  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission required', 'Please enable location services to use this feature.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  };


  const filterMarkers = (distanceThreshold) => {
    // Filter markers based on distance from userLocation
    return productLocations.filter(product => {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        product.coordinate.latitude,
        product.coordinate.longitude
      );
      return distance <= distanceThreshold;
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  

  // Filter markers based on the distance threshold
  const filteredMarkers = radius!==0?filterMarkers(radius):productLocations;

  const handleRadius=(item)=>{
    setRadius(item)
    setIsActive(item)
  }

 //console.log(filteredMarkers)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'yellowgreen', padding: 10,width:150,margin:10,borderRadius:5}}>
        <Text onPress={() => setShowModal(true)} >Show Available Shops</Text>
      </View>
      <Modal visible={showModal} animationType="slide">
        <View style={{ flex: 1 }}>
          <View style={{flexDirection:'row',justifyContent:"space-around",marginTop:10}}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 10 }}>Available Shops</Text>
            <TouchableOpacity style={{backgroundColor:'green',borderRadius:5,padding:10}} onPress={() => setShowModal(false)}><Text style={{color:'white'}}>Close</Text></TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
          <TouchableOpacity style={[styles.radius, isActive === 0 ? styles.active : null]} onPress={() => handleRadius(0)}><Text>All</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.radius, isActive === 5 ? styles.active : null]} onPress={() => handleRadius(5)}><Text>5 Km</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.radius, isActive === 10 ? styles.active : null]} onPress={() => handleRadius(10)}><Text>10Km</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.radius, isActive === 20 ? styles.active : null]} onPress={() => handleRadius(20)}><Text>20 Km</Text></TouchableOpacity>

          </View>
          <MapView
            style={{ flex: 1 }}
            initialRegion={mapRegion}
          >
            {filteredMarkers.map((product, index) => (
              <Marker
              key={index}
              coordinate={product.coordinate}
            >
              <View style={styles.customMarker}>
                <Text style={{textAlign:'center',padding:2}}>{product.name}</Text>
                <Text style={{paddingLeft:10}}>{product.shopName}</Text>
                <View style={{alignItems:'flex-start'}}><Rating startingValue={product.ratings} readonly={true} imageSize={20} /></View>
              </View>
            </Marker>
            ))}
          </MapView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  radius:{
    backgroundColor:'gold',
    padding:10,
    borderRadius:5,
    margin:10
  },
  active:{
    borderWidth:1,
    borderColor:'balck',
  },
  customMarker: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  }, 
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default FilterLocation;

