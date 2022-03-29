import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
const moment = require('moment');
import Paper from '@mui/material/Paper';
import {invocationsChange} from '../features/slices/dataSlice.js';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries
} from '@devexpress/dx-react-chart-material-ui';
import {ClosedCaptionOffSharp, ConstructionOutlined} from '@mui/icons-material';

export const LineChart = () => {

  //this shows the chart data that is in state - we populate state in Dashboard
  const chartData = useSelector((state) => state.data);
  //this gives you the index of the function you need
  const currentFunc = useSelector((state) => state.chart.name);
  
  const [data, setData] = useState([])
  

  useEffect(() => {
    if (chartData.data.invocations && chartData.data.errors && chartData.data.throttles){

      let yData = [];
      let eData = [];
      let tData = [];
      const xAxis = [];

        for (let i = 0; i < chartData.data.invocations[currentFunc].data.length; i++) {
          chartData.data.invocations[currentFunc].data.forEach((element) => {
          let num = moment(`${element.x}`).format("MM/DD, h a ");
          xAxis.push(num);
          })
        }

        for (let i = 0; i < chartData.data.invocations[currentFunc].data.length; i++) {
          yData.push(chartData.data.invocations[currentFunc].data[i].y);
        }
  
        for (let i = 0; i < chartData.data.errors[currentFunc].data.length; i++) {
          eData.push(chartData.data.errors[currentFunc].data[i].y);
        }
      
        for (let i = 0; i < chartData.data.throttles[currentFunc].data.length; i++) {
          tData.push(chartData.data.throttles[currentFunc].data[i].y);
        }

        const data = [];

        for (let i = 0; i < xAxis.length; i++) {
          data.push({x: xAxis[i], y: yData[i], e: eData[i], t: tData[i]});
        }
        setData(data)

    }
  }, [chartData, currentFunc])



  return (
    <div>
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries valueField="y" argumentField="x" />
          <LineSeries valueField="e" argumentField="x" />
          <LineSeries valueField="t" argumentField="x" />
        </Chart>
      </Paper>
    </div>
  );
};
