import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './features/store'
import '../src/pages/styles/styles.css'
import  { theme } from './pages/styles/theme'
import { ThemeProvider } from '@mui/material/styles'

render(
//Provider passes down the redux store to our App//
<Provider store={store}>   
    <React.StrictMode>
        {/* <ThemeProvider theme={theme}> */}
        <App/>
        {/* </ThemeProvider> */}
    </React.StrictMode>
</Provider> 
,document.getElementById('root')
);