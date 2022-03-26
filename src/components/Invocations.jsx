import {metricsByFunc} from '../utils/getMetricsByFunc.js';
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

const Invocations = () => {
  const creds = useSelector((state) => state.creds);
  const currentFunc = useSelector((state) => state.chart.name);
  const funcList = useSelector((state) => state.funcList.funcList);
  const chartData = useSelector((state) => state.data);

  const [title, setTitle] = useState('');
  const [yAxis, setYAxis] = useState([]);
  const [xAxis, setXAxis] = useState([]);

  const chartRef = React.createRef();
  const xData = [xAxis];

  useEffect(() => {
    Promise.resolve(metricsByFunc(creds, 'Invocations'))
      .then((data) => {
        setTitle(data.options.funcNames[0]);
        const x = [];
        data.series[currentFunc].data.forEach((element) => {
          let num = moment(`${element.x}`).format('MM/DD, h a ');
          x.push(num);
        });
        setXAxis(x);
      })
      .catch((err) => console.log(err));
  }, [currentFunc]);
console.log("heres the state data", chartData)
  let yData = [];
  let eData = [];
  let tData = [];

  if (Array.isArray(chartData.data.invocations)) {
    for (let i = 0; i < chartData.data.invocations[0].data.length; i++) {
      yData.push(chartData.data.invocations[0].data[i].y);
    }
  }
  if(chartData.data.errors){
    for (let i = 0; i < chartData.data.errors[0].data.length; i++) {
      eData.push(chartData.data.errors[0].data[i].y);
    }
  }
  if(chartData.data.throttles){
    console.log(chartData.data.throttles)
    for (let i = 0; i < chartData.data.throttles[0].data.length; i++) {
      tData.push(chartData.data.throttles[0].data[i].y);
    }
  }
  
  const data = [];
  for (let i = 0; i < xData[0].length; i++) {
    data.push({x: xData[0][i], y: yData[i], e: eData[i], t: tData[i]});
  }

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
export default Invocations;
