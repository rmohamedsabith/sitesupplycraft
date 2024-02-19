import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react'
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';
import Tooltip from 'react-native-walkthrough-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from '../../actions/productsFilteringActions';

const Filter = ({ isVisible, onClose }) => {
  const { model } = useSelector((state) => state.productsFilteringState);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.productsState);

  const [price, setPrice] = useState([1, 100000]);
  const [priceChange, setPriceChanged] = useState(price);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);

 /*  useEffect(() => {
    setCategory('');
    setPrice([1, 100000]);
    setRating(0);
    setCity(null);
    setDistrict(null)
  }, []); */

  const handleFilter = () => {
    dispatch(filter(priceChange, rating, category, city, model));
    animateOut()
  };
  const [districts, setDistricts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = require('../../districts.json');
        setDistricts(data);
      } catch (error) {
        console.error('Error fetching the file:', error);
      }
    };
  
    // Fetch data only if districts is empty
    if (districts?.length === 0) fetchData();
  }, [districts]); 
  



  const data=districts.map((val,i)=>{
    return {label:val.district,value:i}
})

const [data1,setData1]=useState([])

const handleDistrictChange=async(item)=>{
  setDistrict(item.label);
  try {
    const citiesData = await districts.filter((val) => item.label === val.district);
    const cities = citiesData[0]?.cities || []; // Ensure citiesData is an array and get the cities
    const newData = cities.map((city, i) => ({ label: city, value: i }));
    setData1(newData); // Assuming setData1 is a state setter function for data1
  } catch (error) {
    console.error('Error filtering districts:', error);
  }
  

}


  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item?.value === value && (
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

  const Categories = [
    'Masonry',
    'Metal',
    'Wood',
    'Plastics',
    'Glass',
    'Electrical',
    'Paints',
    'Tiles',
    'Machines',
    'Tools',
    'Plumbing',
  ];

  const jobs = [
    'Electrician',
    'Plumber',
    'Painter',
    'Tiles',
    'A/C Repair',
    'LandScaping',
    'Engineer',
    'Capenders',
    'Curtain',
    'Cleaner',
    'Concerete Slap',
    'Interior Designer',
    'Movers',
    'CCTV Technician',
    'Cieling',
    'Architect',
    'Contractors',
  ];

  ///////////////////////////////////////////

  const [animatedOpacity] = useState(new Animated.Value(0));
  const [animatedTranslateX] = useState(new Animated.Value(-300));


  useEffect(()=>{
    if(isVisible)animateIn()
  },[isVisible])

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = () => {
    setCategory('');
    setPrice([1, 100000]);
    setRating(0);
    setCity(null);
    setDistrict(null)
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateX, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };


  return (
    <Animated.ScrollView style={[styles.offcanvas, { opacity: animatedOpacity, transform: [{ translateX: animatedTranslateX }] }]}>
      <TouchableOpacity onPress={animateOut} style={{flexDirection:'row-reverse',paddingBottom:5,borderBottomWidth:2,borderBottomColor:'red'}}>
        <AntDesign name="closecircle" size={30} color="red" />
        <Text style={{fontSize:20,marginRight:20}}>Filter Product</Text>        
      </TouchableOpacity>
        <View style={{ padding: 10 }}>
          {/* Categories */}
          <Text>Categories</Text>
          {model !== 'laborers' ? (
            Categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={{
                  paddingVertical: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: category === cat ? 'blue' : 'transparent',
                }}
                onPress={() => setCategory(cat)}
              >
                <Text>
                  <Text style={{ color: category === cat ? 'blue' : 'black' }}>{cat}</Text>
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            jobs.map((job) => (
              <TouchableOpacity
                key={job}
                style={{
                  paddingVertical: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: category === job ? 'blue' : 'transparent',
                }}
                onPress={() => setCategory(job)}
              >
                <Text>
                  <Text style={{ color: category === job ? 'blue' : 'black' }}>{job}</Text>
                </Text>
              </TouchableOpacity>
            ))
          )}

          {/* Price filter */}
          <Text>Price</Text>
          {/* <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={100000}
            step={1}
            minimumTrackTintColor="yellow"
            thumbTintColor="yellow"
            value={price}
            onSlidingComplete={(value) => setPrice(value)}
          /> */}
          <Text>{`Rs${price[0]}`}</Text>
          <Text>{`Rs${price[1]}`}</Text>

          {/* District */}
          <View>
            <Text>District</Text>
            <Dropdown
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
              placeholder={district?district:"Select District"}
              searchPlaceholder="Search..."
              value={district}
              onChange={item => {                
                handleDistrictChange(item);
              }}
            /*  renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              )}
              renderItem={renderItem} */
            />
          </View>
          {/* Hometown */}
          {district && (
            <View>
              <Text>Hometown</Text>
              <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data1}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={city?city:"Select City"}
              searchPlaceholder="Search..."
              value={city}
              onChange={item => {
                setCity(item?.label);
              }}
            /*  renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              )}
              renderItem={renderItem} */
            />
            </View>
          )}

          {/* Ratings */}
          <Text>Ratings</Text>
          <View style={{ flexDirection: 'row' }}>
            {[5, 4, 3, 2, 1, 0].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={{
                  padding: 5,
                  borderColor: rating === star ? 'blue' : 'transparent',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginRight: 5,
                }}
              >
                <FontAwesomeIcon icon={faStar} color={star > 0 ? '#f8ce0b' : 'black'} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleFilter}><Text style={[styles.footerBtn,{backgroundColor:'green',}]}>Filter</Text></TouchableOpacity>
        <TouchableOpacity><Text style={[styles.footerBtn,{backgroundColor:'blue'}]}>Clear All</Text></TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  footerBtn:{color:'#ffff',fontSize:16,padding:10,paddingHorizontal:20,borderRadius:5},
  footer:{
    backgroundColor:'#352F44',
    marginHorizontal:-20,
    paddingHorizontal:20,
    paddingVertical:20,
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    width:'125%',
    position:'absolute',
    bottom:-40,
    left:15
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
  offcanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
    backgroundColor: 'white',
    elevation: 5, // For Android shadow
    zIndex: 999, // Make sure it overlays other content
    padding: 20,
  },
})

export default Filter