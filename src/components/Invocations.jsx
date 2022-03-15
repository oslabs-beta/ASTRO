import { metricsByFunc } from '../utils/getMetricsByFunc.js'
import React from 'react'
import 'chart.js/auto';
import {Line} from "react-chartjs-2";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


const Invocations = () => {

  const currentFunc = useSelector((state) => state.chart.name)
  const credentials = useSelector((state) => state.creds)

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
      text: "Invocations"
      }
    }
  }
   
  useEffect(() => {
    const response = Promise.resolve(metricsByFunc(credentials, 'Invocations')).then((data) => {
      console.log(data); 
      setTitle(data.options.funcNames[0])
      
      const x = []
      const y = []

      data.series[currentFunc].data.forEach((element) => {
        x.push(element.x)
        y.push(element.y)
      })

        setYAxis(y)
        setXAxis(x)
      })
        .catch((err) => console.log(err))

  }, [currentFunc])
 
  return (
    <div>
      <Line data = {data} options={options}/>
    </div>
  )
 
}
export default Invocations;



