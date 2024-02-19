import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loader from '../Loader'; 
import { ToastAndroid } from 'react-native'; 
import { clearProductsError, getProducts } from '../../actions/productsActions';
import Product from './Product';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const { products, totalCount, count, error, isLoading, resPerPage } = useSelector((state) => state.productsState);
  const { price, category, rating, model } = useSelector((state) => state.productsFilteringState);
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    ToastAndroid.show('Welcome to Site Supply Craft', ToastAndroid.BOTTOM);
  }, []);

 

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.BOTTOM);
      dispatch(clearProductsError());
    }
    dispatch(getProducts(null, price, category, rating, null, null, currentPage, model));
  }, [error, dispatch, currentPage, price, category, rating, model]);

  // Function to chunk array into pairs
  const chunkArray = (myArray, chunkSize) => {
    const results = [];
    if (!myArray) return results; // return empty array if myArray is not defined
    const arrayCopy = [...myArray];
    while (arrayCopy.length) {
      results.push(arrayCopy.splice(0, chunkSize));
    }
    return results;
  };

  // Chunk the products array into pairs
  const productPairs = chunkArray(products, 2);

  return (
    <ScrollView>
      {isLoading ? (
        <View style={{ alignItems: 'center', justifyContent:'center'}}>
          <Loader />
        </View>
      ) : count > 0 && products ? ( // Ensure products is defined
        <View>
          {productPairs.map((pair, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {pair.map((product) => (
                <Product key={product._id} product={product} navigation={navigation} />
              ))}
            </View>
          ))}
        </View>
      ) : ( 
        <Text style={{ color: 'red', textAlign: 'center', padding: 100 }}>There is no product</Text>
      )}
    </ScrollView>
  );
};

export default ProductList;
