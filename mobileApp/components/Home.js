import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Loader from './Loader'
import Search from './products/Search'
import ProductList from './products/ProductsList'
import { useRoute } from '@react-navigation/native'
import SearchedProductsList from './products/SearchedProductsList'

const Home = () => {
  const router=useRoute()
  const {key}=router.params
  return (
      <View>
        <View><Search/></View> 
        {
          key?<View style={{height:"85%"}}><SearchedProductsList/></View>:<View style={{height:"85%"}}><ProductList/></View>
        }
      </View>
      )

}

export default Home