import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducers from './slices/productsSlice';
import productsFilteringReducers from './slices/productsFilteringSlice';
import usersReducers from './slices/usersSlice';
import authReducers from './slices/authSlice';
import productReducers from './slices/productSlice';
import messagesReducers from './slices/messagesSlice';
import adminReducers from './slices/adminSlice';

const reducer = combineReducers({
  productsState: productsReducers,
  usersState: usersReducers,
  productsFilteringState: productsFilteringReducers,
  authState: authReducers,
  productState: productReducers,
  messagesState: messagesReducers,
  adminState: adminReducers,
});
const middlewareEnhancer = applyMiddleware(thunk);

const store = configureStore({
  reducer,
  middlewareEnhancer
});

export default store;
