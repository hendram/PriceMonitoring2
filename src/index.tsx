import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import './index.css';
import { store } from './reduxstore/store';
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store} >
    <MainPage />,
     </Provider>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
