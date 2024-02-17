import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Modal, Button, StyleSheet, Alert } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';
import Dropdown from 'react-native-element-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';

const FilterLocation = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [productLocations, setProductLocations] = useState([]);
  const [radius, setRadius] = useState(null);
  const {products,totalCount,count,error,isLoading,resPerPage}=useSelector((state)=>state.productsState)
  const{price,category,rating,city,model}=useSelector((state)=>state.productsFilteringState)

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
        id: product.id,
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
    
  }, []);
  console.log(currentLocation)
    console.log(productLocations)
    console.log(products[0].owner.location.lat)

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission required', 'Please enable location services to use this feature.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  };
  const data=[
    {"label":'5 km','value':5},
    {"label":'10 km','value':10},
    {"label":'20 km','value':20},
  ]

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === radius && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

 

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'yellowgreen', padding: 10,width:150,margin:10,borderRadius:5}}>
        <Text onPress={() => setShowModal(true)} >Show Available Shops</Text>
      </View>
      <Modal visible={showModal} animationType="slide">
        <View style={{ flex: 1 }}>
          <View style={{flexDirection:'row',justifyContent:"space-around"}}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 10 }}>Available Shops</Text>
            <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
         {/*  <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select a Radius"
              searchPlaceholder="Search..."
              value={radius}
              onChange={item => {
                setRadius(item.value);
              }}
              renderItem={renderItem}
            /> */}
          </View>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {productLocations.map((product, index) => (
              <Marker
                key={index}
                coordinate={product.coordinate}
                title={product.name}
                description={`${product.shopName}\nPrice: ${product.price}`}
                onPress={() => {/* Handle marker press */}}
              />
            ))}
          </MapView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

