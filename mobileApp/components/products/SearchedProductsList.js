import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productsActions';
import Product from './Product';
import Loader from '../Loader';
import FilterLocation from '../googleMaps/FilterLocation';

const SearchedProductsList = () => {
  const route = useRoute();
  const { key } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const { products, totalCount, count, error, isLoading, resPerPage } = useSelector((state) => state.productsState);
  const { price, category, rating,district,city,model } = useSelector((state) => state.productsFilteringState);
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };


  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.BOTTOM);
      dispatch(clearProductsError());
    }
    dispatch(getProducts(key, price, category, rating, null, null, currentPage, model));
  }, [error, dispatch, currentPage, price, category, rating, model,key]);

  // Function to chunk array into pairs
  const chunkArray = (myArray, chunkSize) => {
    const results = [];
    if (!myArray) return results; 
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
      ) : count > 0 && products ? (
        <View>
          {model==='products/sell' ? <Text style={{fontSize:20,color:'#053B50',paddingHorizontal:5}}>Searched Buying Products</Text> :
           model==='products/rent' ? <Text style={{fontSize:20,color:'#053B50',paddingHorizontal:5}}> Searched Hiring Products</Text> :
           model==='laborers' ? <Text style={{fontSize:20,color:'#053B50',paddingHorizontal:5}}> Searched Laborers</Text> :
           null
          }
          <FilterLocation/>
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
}

export default SearchedProductsList