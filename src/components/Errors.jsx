import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import React from 'react'
import 'chart.js/auto';
import {Line} from "react-chartjs-2";
import { useEffect, useState } from 'react'

const Errors = () => {

const [title, setTitle] = useState('')
const [yAxis, setYAxis] = useState([])
const [xAxis, setXAxis] = useState([])

  const data = {
    labels: [...xAxis],
     datasets: [{
       data: [...yAxis]
     }]
   }
   
   const options = {
    plugins: {
    title: {
      display: true,
      text: "Errors"
      }
    }
  }
   



  useEffect(() => {
      const response = Promise.resolve(metricsByFunc()).then((data) => {

          setTitle(data.options.funcNames[0])
          const x = []
          const y = []

          data.series[0].data.forEach((element) => {
            x.push(element.x)
            y.push(element.y)
          })

          setYAxis(y)
          setXAxis(x)
      }).catch((err) => console.log(err))
  
    
  }, [])
 
  return (
    <div>
      <Line data = {data} options={options}/>
      
    </div>
  )
 
}
export default Errors;


