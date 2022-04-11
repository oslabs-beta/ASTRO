import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { LineChart } from './LineChart.jsx';
import { TotalsByFunc } from './TotalsByFunc.jsx';
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

export const DisplayLogs = () => {
  const dispatch = useDispatch();
  const currentFunc = useSelector((state) => state.chart.name);
  const timePeriod = useSelector((state) => state.time.timePeriod);
  const list = useSelector((state) => state.funcList.funcList);
  const creds = useSelector((state) => state.creds);

  const [rows, setData] = useState([]);

  useEffect(() => {
    Promise.resolve(logs(creds)
      .then((data) => {
        data.streams.map((el, i) => {
          setData([...rows, [
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {i}
              </TableCell>
              <TableCell align="right">{el[0]}</TableCell>
              <TableCell align="right">{el[1]}</TableCell>
              <TableCell align="right">{el[2]}</TableCell>
          </TableRow>
          ]])
        })
        return rows;
      })
    )
  }, [])

  return (
    <TableContainer component={Paper}>
      <h1>Log Streams for {list[currentFunc]} </h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {/* the code below is for the names of the column */}
            
            <TableCell align="right">Stream ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(rows.length)}
          {rows}
        </TableBody>
      </Table>
    </TableContainer>

  )
}