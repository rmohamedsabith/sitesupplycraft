import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import store from './store'
import {Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './chatContex'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ChatProvider> <App/></ChatProvider>
      
    </Provider>
    </BrowserRouter>
  //</React.StrictMode>
);