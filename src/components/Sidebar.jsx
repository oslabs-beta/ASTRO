import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../utils/getLambdaFunctions.js'

export const SideBar = () => {

const [result, setResult] = useState([])

useEffect(() => {
  const res = Promise.resolve(data()).then(res => setResult(res)).catch(err => console.log(err))
},[])

/**
 * @Remember { Axios }
 */

console.log(result)
return(
    <div>
        { ( result && result.length > 0 ) && result.map((res, idx) => <div key={idx}>{res}</div>) }
    </div>
    )

}