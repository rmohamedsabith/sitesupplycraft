import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, Text, ImageBackground, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/productsActions';
import { filter } from '../actions/productsFilteringActions';

const Selection = () => {
  const navigation = useNavigation();
  const [buttonStates, setButtonStates] = useState([false, false, false]);
  const dispatch=useDispatch()

  const handlePress = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !buttonStates[index];
    setButtonStates(newButtonStates);
  };
  const handleClick=(type)=>{
    dispatch(filter(null,null,null,null,type))
    navigation.navigate('Home',{keyword:null});
  }

  return (
    <ImageBackground source={require('../images/selection.jpg')} style={styles.backgroundImage}>
      <View>
        {['Rentable Products','Buyable Products', 'Finding Laborers'].map((value,i) => (
          <TouchableOpacity
            key={i}
            style={[styles.button, buttonStates[value] && styles.buttonPressed]}
            onPress={()=>{
              if(i==0)handleClick('products/rent')
              else if(i==1)handleClick('products/sell')
              else handleClick('laborers')
            }}
            onPressIn={()=>handlePress(value)}
            onPressOut={()=>handlePress(value)}>
            <Text style={styles.buttonText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginBottom: -100,
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
    padding: 20,
    backgroundColor: 'rgb(10, 59, 80)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    marginVertical: 10,
    borderRadius: 5,
    padding: 20,
    backgroundColor: 'rgba(10, 59, 80,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Selection;
