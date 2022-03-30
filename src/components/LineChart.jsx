import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
const moment = require('moment');

//MATERIAL UI//
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';

export const LineChart = () => {

  //this shows the chart data that is in state - we populate state in Dashboard
  const chartData = useSelector((state) => state.data);
  //this gives you the index of the function you need
  const currentFunc = useSelector((state) => state.chart.name);
  
  const [data, setData] = useState([])
  

  useEffect(() => {
    if (chartData.data.invocations && chartData.data.errors && chartData.data.throttles){

      const yData = [];
      const eData = [];
      const tData = [];
      const xAxis = [];

        //sets the x axis
        for (let i = 0; i < chartData.data.invocations[currentFunc].data.length; i++) {
          chartData.data.invocations[currentFunc].data.forEach((element) => {
          let num = moment(`${element.x}`).format("MM/DD, h a ");
          xAxis.push(num);
          })
        }

        //sets the invocation data - saved in the yData variable
        for (let i = 0; i < chartData.data.invocations[currentFunc].data.length; i++) {
          yData.push(chartData.data.invocations[currentFunc].data[i].y);
        }
        
        //sets the errors data - saved in the eData variable
        for (let i = 0; i < chartData.data.errors[currentFunc].data.length; i++) {
          eData.push(chartData.data.errors[currentFunc].data[i].y);
        }
        
        //sets the throttles data - saved in the tData variable
        for (let i = 0; i < chartData.data.throttles[currentFunc].data.length; i++) {
          tData.push(chartData.data.throttles[currentFunc].data[i].y);
        }

        const data = [];

        //configures data to the correct format for the MUI graph
        for (let i = 0; i < xAxis.length; i++) {
          data.push({x: xAxis[i], y: yData[i], e: eData[i], t: tData[i]});
        }

        setData(data);

    }
  }, [chartData, currentFunc])

  const props = [
  { name: "Invocations" },
  { name: "Errors" },
  { name: "Throttles" }
]

  //A component that renders the root layout.
  const Root = (props) => (
    <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
  );

  //A component that renders the label.
  const Label = props => (
    <Legend.Label sx={{ pt: 1, whiteSpace: 'nowrap' }} {...props} />
  );

  //A component that renders an item.
  // const Item = props => (
  //   <Legend.Item sx={{ flexDirection: 'column' }} {...props} />
  // );
  

  return (

      <Paper >
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries valueField="y" argumentField="x" />
          <LineSeries valueField="e" argumentField="x" />
          <LineSeries valueField="t" argumentField="x" />
          <Legend position="bottom" rootComponent={Root}labelComponent={Label} />
        </Chart>
      </Paper>

  );
};
