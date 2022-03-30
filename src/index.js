import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './features/store'
import '../src/pages/styles/styles.css'


render(
//Provider passes down the redux store to our App//
<Provider store={store}>   
    <React.StrictMode>
        <App/>
    </React.StrictMode>
</Provider> 
,document.getElementById('root')
);