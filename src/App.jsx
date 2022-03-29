import React, { useEffect } from 'react';
import { Insights } from './pages/Insights.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getCreds } from './utils/getAWSCreds';
import { getBackendCreds } from './features/slices/credSlice';
import { NavBar } from './components/NavBar'


function App() {

  const creds = useSelector((state) => state.creds)
  const dispatch = useDispatch();

  
  useEffect(() => {
      Promise.resolve(getCreds()).then((data) => {
        dispatch(getBackendCreds(data))
        return;
    })
    .catch(err => console.log(err))
  }, [])


  return (


    creds.region.length ?
      <>
      <NavBar />
      <Insights/> 
      </> :
      <>
      <div>loading</div>
      </>


    )
}

export default App;
