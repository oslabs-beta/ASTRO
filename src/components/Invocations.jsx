import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const moment = require("moment")
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';



const Invocations = () => {

  const creds = useSelector((state) => state.creds);
  const currentFunc = useSelector((state) => state.chart.name);
  const funcList = useSelector((state) => state.funcList.funcList);
  const chartData = useSelector((state) => state.data.data);

  console.log('this is chart data in invocations', chartData)

  const [title, setTitle] = useState('')
  const [yAxis, setYAxis] = useState([])
  const [xAxis, setXAxis] = useState([])

     const chartRef = React.createRef();

  useEffect(() => {

      Promise.resolve(metricsByFunc(creds, "Invocations"))
			.then((data) => {
				setTitle(data.options.funcNames[0]);
				const x = [];
				const y = [];
        console.log('in invocations promise')
				data.series[currentFunc].data.forEach((element) => {
					let num = moment(`${element.x}`).format("MM/DD, h a ");
					x.push(num);
					y.push(element.y);
				});

				setYAxis(y);
				setXAxis(x);
			})
			.catch((err) => console.log(err));

  }, [currentFunc])
 
  return (
    <div>
     <Paper>
        <Chart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            max={50}
            labelComponent={ValueLabel}
          />

          <LineSeries name="TV news" valueField="tvNews" argumentField="year"
          />
       
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
            textComponent={TitleText}
          />
          <Animation />
        </Chart>
      </Paper>
    </div>
  )
 
}
export default Invocations;




