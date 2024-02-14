import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getProduct } from '../../actions/productActions';
import { Rating } from 'react-native-ratings';

const Product = ({ product }) => {
  const { model } = useSelector((state) => state.productsFilteringState);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleClick = async () => {
    const type = model !== 'laborers' ? 'product' : 'laborer';
    await dispatch(getProduct(product._id, type));
    navigation.navigate('ProductDetails', { productId: product._id });
  };

  const item = model === 'laborers' ? product.profile?.replace('localhost', '192.168.195.148') : product.images?.[0]?.image.replace('localhost', '192.168.195.148');
  
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.card}>
        {model !== 'laborers' && product.type && (
          <Text style={styles.type}>{`To ${product.type.replace(/\b\w/g, (char) => char.toUpperCase())}`}</Text>
        )}

        <Image source={{ uri: item }} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.shopName}>{model !== 'laborers' ? product.owner?.shopName : product.job}</Text>
          <Text style={styles.title}>{model === 'laborers' ? `${product.firstname} ${product.lastname}` : product.name}</Text>
          <View style={{alignItems:'flex-start'}}><Rating startingValue={product.ratings} readonly={true} imageSize={20} /></View>
          <Text>({product.numOfReviews} Reviews)</Text>
          <Text style={styles.price}>
            {`Rs.${product.price}  `}
          
          {model !== 'laborers' ? (product.discount > 0 ? <Text style={styles.discount}>Rs.{product.discount}</Text> : '') : <Text style={styles.type}>{product.priceType}</Text>}
          
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  card: {
    width:150,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  type: {
    fontSize: 12,
    color: '#ff9933',
    textAlign: 'right',
    padding: 5,
  },
  image: {
    width: '100%',
    height: 120,
  },
  details: {
    padding: 10,
  },
  shopName: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    marginTop: 10,

  },
  discount: {
    fontSize: 12,
    color:'red',
    textDecorationLine:'line-through',
  },
});

export default Product;
