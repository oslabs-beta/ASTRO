import React from 'react';
import { SideBar } from '../components/Sidebar.jsx';
import Metrics from '../components/Metrics.jsx';
import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

function Insights(){

    return (
        <div>
            <SideBar/>
            <h1>Lambda Func</h1>
            <Link to="/insights/metrics/"> Invocations </Link>  |
            <Link to="/insights/metrics/"> Errors </Link>  |
            <Link to="/insights/metrics/"> Throttles </Link> 
            
             <Metrics/> 
            <Outlet/>
        </div>
    );
}

export default Insights;