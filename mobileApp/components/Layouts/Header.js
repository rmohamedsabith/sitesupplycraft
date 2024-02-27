import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../actions/authActions';
import { filter } from '../../actions/productsFilteringActions';
import { clearProducts } from '../../slices/productsSlice';
import Favourites from '../Favourites';
import Login from '../auth/Login'

const Header = ({ hide, setIsHumClicked, isHumClicked, setDistrict, setIsDistrict }) => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    navigation.navigate('/');
    dispatch(logout);
  };

  const handleRefresh = useCallback(async () => {
    setDistrict('');
    setIsDistrict(false);
    await dispatch(clearProducts());
    dispatch(filter(null, null, null, null, 'products'));
    navigation.navigate('Home');
  }, [setDistrict, setIsDistrict, dispatch, navigation]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:28,paddingTop:20,paddingBottom:20,padding:10,backgroundColor:'#053B50'}}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleRefresh}>
          <Image source={require('../../images/logo.jpeg')} style={{ width: 75, height: 40}} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16,color:'#FFFF' }}>Site Supply Craft</Text>
      </View>

      {hide ? (
        <TouchableOpacity onPress={() => setIsHumClicked(!isHumClicked)}>
          <Text style={{ fontSize: 20 }}>☰</Text>
        </TouchableOpacity>
      ) : null}

      {isAuthenticated ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Favourites />
          <TouchableOpacity onPress={() => navigation.navigate('/myprofile')}>
            <Image source={{ uri: user.profile ? user.profile : '../../images/default_avatar.png' }} style={{ width: 40, height: 40, borderRadius: 20 }} />
          </TouchableOpacity>
          {/* Add your Dropdown equivalent in React Native here */}
        </View>
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginLeft: 10, backgroundColor: '#027BFF', paddingTop:10,padding:10, borderRadius: 5 }} onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'white' }}>Log in</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
