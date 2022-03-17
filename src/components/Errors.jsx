import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import React from 'react';
import 'chart.js/auto';
import {Line,Bar} from "react-chartjs-2";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const moment = require("moment")

const Errors = () => {

  const currentFunc = useSelector((state) => state.chart.name);
  const credentials = useSelector((state) => state.creds);
  const funcList = useSelector((state) => state.funcList.funcList);

  const [title, setTitle] = useState('');
  const [yAxis, setYAxis] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  
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
      text: funcList[currentFunc] + " ERRORS"
      }
    },
    layout:{padding:{bottom:100}},
    scales: {
      y:{
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
            size:10      
          }
        }
      }
    },
  }
 

  useEffect(() => {
      const response = Promise.resolve(metricsByFunc(credentials, 'Errors')).then((data) => {

          setTitle(data.options.funcNames[0]);

          const x = []
          const y = []
          data.series[currentFunc].data.forEach((element) => {
            let num = moment(`${element.x}`).format("MM/DD  h a ")
           
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
      <Bar data = {data} options={options}/>
    </div>
  )
 
}

export default Errors;



