import React from 'react';
import { Insights } from './pages/Insights.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCreds } from './utils/getAWSCreds';
import { getBackendCreds } from './features/slices/credSlice';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#eeeeee"
    }
  }
});


function App() {

  const creds = useSelector((state) => state.creds)
  const dispatch = useDispatch();
  
  useEffect( async () => {
      await Promise.resolve(getCreds())
        .then((data) => {
          dispatch(getBackendCreds(data))
          console.log(creds)
          return;
        })
        .catch(err => console.log(err))
  }, [])


  return ( 

    creds.region.length ?
      <>
      <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <Insights/> 
      </ThemeProvider>
      </> :
      <CircularProgress/>

    )
}

export default App;
