import React from 'react';
import { SideBar } from '../components/Sidebar.jsx';
import Invocations from '../components/Invocations.jsx';
import Errors from '../components/Errors.jsx';
import Throttles from '../components/Throttles.jsx';
import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCreds } from '../utils/getAWSCreds.js';
import { getBackendCreds } from '../features/slices/credSlice';
// import { Link, Outlet } from 'react-router-dom';

function Insights(){


  return (
    <div>
      <h1>Lambda Func</h1>
        <SideBar />
    {/* <Link to="/insights/metrics/"> Invocations </Link>  |
    <Link to="/insights/metrics/"> Errors </Link>  |
    <Link to="/insights/metrics/"> Throttles </Link>  */}
            
        <Invocations/>
        <Errors/>
        <Throttles/>
        {/* <Outlet/> */}
    </div>
    );
}

export default Insights;