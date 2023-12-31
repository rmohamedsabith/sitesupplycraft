import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import productsReducers from './slices/productsSlice'
import productsFilteringReducers from './slices/productsFilteringSlice'
import usersReducers from './slices/usersSlice'
import authReducers from './slices/authSlice'
import productReducers from './slices/productSlice'


const reducer = combineReducers({
  productsState:productsReducers,
  usersState:usersReducers,
  productsFilteringState:productsFilteringReducers,
  authState:authReducers,
  productState:productReducers,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;