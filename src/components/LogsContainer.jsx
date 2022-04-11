import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { LineChart } from './LineChart.jsx';
import { GenerateLogs } from './GenerateLogs.jsx';
import { metricsByFunc } from '../utils/getMetricsByFunc';
import { logs } from '../utils/getLogs';
import { TimePeriod } from './TimePeriod'

// MATERIAL UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// storing results from http request to /aws/getLogs for a specific function in local state
export const LogsContainer = () => {
  const currentFunc = useSelector((state) => state.chart.name);
  const list = useSelector((state) => state.funcList.funcList);
  const creds = useSelector((state) => state.creds);

  const [data, setData] = useState({});

  // if (!data) return <p>Loading streams...</p>

  useEffect(() => {
    Promise.resolve(logs(creds, list[currentFunc])
    .then((data) => {
        return setData(data)
      })
    )
  }, []);


  return (
    <TableContainer component={Paper}>
      <h1>Log Streams for {list[currentFunc]} </h1>
      <GenerateLogs data={data} /> 
    </TableContainer>

  )
}