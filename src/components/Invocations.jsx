import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import React from 'react'
import 'chart.js/auto';
import {Line, Bar} from "react-chartjs-2";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const moment = require("moment")

const Invocations = () => {


  const currentFunc = useSelector((state) => state.chart.name)
  const credentials = useSelector((state) => state.creds)
  const funcList = useSelector((state) => state.funcList.funcList);

  const [title, setTitle] = useState('')
  const [yAxis, setYAxis] = useState([])
  const [xAxis, setXAxis] = useState([])

  const data = {
    labels: [...xAxis],
     datasets: [{
       data: [...yAxis],
       fill: true,
       borderColor: '#000',
       backgroundColor:'#02086C',
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
  console.dir(chartRef);
  useEffect(() => {
    const response = Promise.resolve(metricsByFunc(credentials, 'Invocations')).then((data) => {
      setTitle(data.options.funcNames[0])
      
      const x = []
      const y = []

      data.series[currentFunc].data.forEach((element) => {
        let num = moment(`${element.x}`).format("MM/DD, h a ")
        x.push(num)
        y.push(element.y)
      })

        setYAxis(y)
        setXAxis(x)
      })
        .catch((err) => console.log(err))

  }, [currentFunc])
 
  return (
    <div>
      <Bar className = ''data = {data} options={options}/>
    </div>
  )
 
}
export default Invocations;




