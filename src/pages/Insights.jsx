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
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import { Link, Outlet } from 'react-router-dom';

function Insights(){

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
  
    <div>
      <h1>Lambda Func</h1>
      <SideBar />
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16} justifyContent="center">
        <Grid item xs={10}>
          <Item><Invocations/></Item>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={16} justifyContent="center">
          <Grid item >
            <Item><Errors/></Item>
          </Grid>
          <Grid item >
            <Item><Throttles/></Item>
          </Grid>
        </Grid>
    </Box>
        
    {/* <Link to="/insights/metrics/"> Invocations </Link>  |
    <Link to="/insights/metrics/"> Errors </Link>  |
    <Link to="/insights/metrics/"> Throttles </Link>  */}
            
        
        
        
        {/* <Outlet/> */}
    </div>
    );
}

export default Insights;