import React from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Insights from './pages/Insights.jsx';
import MustBeLoggedIn from './pages/MustBeLoggedIn.jsx';
import { useSelector, useDispatch } from 'react-redux';
import Github from './components/Github.jsx';
import { useEffect } from 'react';
import { getCreds } from './utils/getAWSCreds';
import { getBackendCreds } from './features/slices/credSlice';




import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { NavBar } from './components/'


function App() {

  const logged  = useSelector((state)=> state?.user.logged);
  const creds = useSelector((state) => state.creds)
  const dispatch = useDispatch();

  
  useEffect(() => {
    Promise.resolve(getCreds()).then((data) => {
      dispatch(getBackendCreds(data))
    return;
    })
  }, [creds])

  return (
    <Router>
    <NavBar/>

    <Routes>
  
      <Route path="/" element={<Home />} />
      <Route path="/insights" element={<Insights />}/> 
      <Route path="/github" element={<Github />}/>
      <Route path="/*" element={<PageNotFound />} />
      
    </Routes>

    <footer>footer stuff here!</footer>

    </Router>
    )
}

export default App;
