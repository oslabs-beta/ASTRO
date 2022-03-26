import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import React from 'react'
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const moment = require("moment")

const Invocations = () => {

  const creds = useSelector((state) => state.creds);
  const currentFunc = useSelector((state) => state.chart.name);
  const funcList = useSelector((state) => state.funcList.funcList);
  const chartData = useSelector((state) => state.data.data);
  const timePeriod = useSelector((state) => state.time.time)

  // console.log('this is chart data in invocations', chartData)

  const [title, setTitle] = useState('')
  const [yAxis, setYAxis] = useState([])
  const [xAxis, setXAxis] = useState([])

  const data = {
    labels: [...xAxis],
     datasets: [{
       data: [...yAxis],
       fill: true,
       borderColor: '#000',
       backgroundColor:'#64b5f6',
       tension: 0.4,
       pointBorderWidth: 5,
       pointRadius: 4,
     }]
   }
   const options = {
    plugins: {
      legend: {display: false},
    title: {
      display: true,
      text: funcList[currentFunc] + " INVOCATIONS"
      }
    },
    layout:{padding:{bottom:100}},
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks:{
           color:"black",
           font:{
          size:18
           }
        }
      },
      x:{
        ticks:{
          
          color:"black",
          font:{
            size:13      
          }
        }
      }
    },
  }
  const chartRef = React.createRef();

  useEffect(() => {
    
      Promise.resolve(metricsByFunc(creds, "Invocations", timePeriod))
			.then((data) => {
        console.log('in invocations', data)
				setTitle(data.options.funcNames[0]);
				const x = [];
				const y = [];
        // console.log('in invocations promise')
				data.series[currentFunc].data.forEach((element) => {
					let num = moment(`${element.x}`).format("MM/DD, h a ");
					x.push(num);
					y.push(element.y);
				});

				setYAxis(y);
				setXAxis(x);
			})
			.catch((err) => console.log(err));

  }, [currentFunc, timePeriod])
 
  return (
    <div>
      <Bar data = {data} options={options}/>
    </div>
  )
 
}
export default Invocations;




