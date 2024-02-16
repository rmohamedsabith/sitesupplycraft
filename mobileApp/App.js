import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Layouts/Header';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Selection from './components/Selection';
import Home from './components/Home';
import { useFonts } from 'expo-font';
import SearchedProductsList from './components/products/SearchedProductsList';


const Stack = createStackNavigator();

export default function App() {

  

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Header />
          <Stack.Navigator initialRouteName="Selection">
            <Stack.Screen
              name="Selection"
              component={Selection}
              options={{ headerShown: false }} // Hide header for Selection screen
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }} // Hide header for Home screen
            />
            {/* <Stack.Screen
              name="SearchedProductsList"
              component={SearchedProductsList}
              options={{ headerShown: false }} // Hide header for Home screen
            /> */}
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
