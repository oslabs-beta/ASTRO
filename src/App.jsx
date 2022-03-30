import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from './pages/Navigation'
import { getCreds } from './utils/getAWSCreds';
import { getBackendCreds } from './features/slices/credSlice';

//MATERIAL UI//
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
  
  useEffect( () => {
        Promise.resolve(getCreds())
        .then((data) => {
          dispatch(getBackendCreds(data))
          return;
        })
        .catch(err => console.log(err))
  }, [])


  return ( 

    creds.region.length ?
      <>
      <ThemeProvider theme={themeLight}>
      <CssBaseline />
        <Navigation/>
      </ThemeProvider>
      </> :
      <CircularProgress/>

    )
}

export default App;
