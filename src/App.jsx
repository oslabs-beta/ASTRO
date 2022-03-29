import React from 'react';
// import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import { Insights } from './pages/Insights.jsx';
import MustBeLoggedIn from './pages/MustBeLoggedIn.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCreds } from './utils/getAWSCreds';
import { getBackendCreds } from './features/slices/credSlice';
import { NavBar } from './components/'
import { getFuncs } from '../src/features/slices/funcListSlice';
import CircularProgress from '@mui/material/CircularProgress';


function App() {

  const logged  = useSelector((state)=> state?.user.logged);
  // const list = useSelector((state) => state.funcList.funcList)
  const creds = useSelector((state) => state.creds)
  const dispatch = useDispatch();

  
  useEffect( async () => {
    
      await Promise.resolve(getCreds()).then((data) => {

        // console.log('this is dat', data)

        dispatch(getBackendCreds(data))

        // if (creds) {
        //  dispatch(getFuncs(creds))
        // }

        return;

      })
      .catch(err => console.log(err))

  }, [])


  return ( 

    creds.region.length ?
      <>
      <Insights/> 
      </> :
      <CircularProgress />

    )
}

export default App;
