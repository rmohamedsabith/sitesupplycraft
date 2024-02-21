import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Loader from './Loader'
import Search from './products/Search'
import ProductList from './products/ProductsList'
import { useRoute } from '@react-navigation/native'
import SearchedProductsList from './products/SearchedProductsList'
import Filter from './Layouts/Filter'
import AntDesign from '@expo/vector-icons/AntDesign'

const Home = () => {
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
  const router=useRoute()

  const {key}=router.params
  const toggleOffcanvas = () => {
    setIsOffcanvasVisible(prevState => !prevState);
  };

  return (
      <View>
        <View style={{marginTop:10}}>
          {/* Filter button */}
          <TouchableOpacity onPress={toggleOffcanvas} style={styles.filterButton}>
            <AntDesign name="filter" size={24} color="orange" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View><Search/></View> 
        {
          key?<View style={{height:"85%"}}><SearchedProductsList/></View>:<View style={{height:"85%"}}><ProductList/></View>
        }
        <Filter isVisible={isOffcanvasVisible} onClose={() => setIsOffcanvasVisible(false)} />
      </View>
      )

}
const styles=StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterButtonText: {
    color:'orange'
  },
})
export default Home