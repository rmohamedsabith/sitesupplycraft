import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { filter } from '../../actions/productsFilteringActions';
import { clearProducts } from '../../slices/productsSlice';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign'; 
import Filter from '../Layouts/Filter';

const Search = ({ setIsDistrict, setDistrict, district, setRefreshSide, refreshSide }) => {
  const { isLoading } = useSelector((state) => state.productsState);
  const { model } = useSelector((state) => state.productsFilteringState);
  const [keyword, setKeyword] = useState(''); 
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);


  const handleChanges = (text) => {
    setKeyword(text);
  }; 

  const handleSubmit = () => {
    navigation.navigate(`Home`, { key: keyword }); 
    inputRef.current.blur(); 
  };
 
  return (
   <View>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef} 
          style={styles.input}
          placeholder="Search"
          onChangeText={handleChanges}
          value={keyword}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>       
      </View>
      
   </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '60%',
    marginHorizontal: 10
  },
  button: {
    backgroundColor: '#053B50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    
  },
  buttonText: {
    color: 'white',
  },
});

export default Search;
