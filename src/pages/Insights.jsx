import React from 'react';
import { SideBar } from '../components/Sidebar.jsx';
import Invocations from '../components/Invocations.jsx';
import Errors from '../components/Errors.jsx';
import Throttles from '../components/Throttles.jsx';
import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import { useEffect, useState } from 'react'
// import { Link, Outlet } from 'react-router-dom';
import { data } from '../utils/getLambdaFunctions.js'

function Insights(){

    //state for charts to pass in time period
    //onclick needs to change state of clickedFunc and we pass this to invocations, throttles, errors
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