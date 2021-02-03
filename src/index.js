import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import Auth from './Action/Reducers/auth'
import Search from './Action/Reducers/search'
import Cart from './Action/Reducers/cart'
import drawer from './Action/Reducers/drawer'

const rootReducers = combineReducers({
  Auth: Auth,
  Search:Search,
  Cart:Cart,
  drawer:drawer
})

const store = createStore(rootReducers, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
