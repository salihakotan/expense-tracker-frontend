import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "antd/dist/antd";
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import "./styles/general.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
