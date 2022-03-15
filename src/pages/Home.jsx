import React from 'react';
import { useEffect, useState } from 'react';
import { metricsAllFunc } from '../utils/getMetricsAllFunc';

function Home(props) {
  const [totalInvocations, setInvocations] = useState(0);
  const [totalThrottles, setThrottles] = useState(0);
  const [totalErrors, setErrors] = useState(0);

  const { creds } = props;

  const promise = (metric, setter) => {
    Promise.resolve(metricsAllFunc(creds, metric))
      .then(data => data.data.reduce((x, y) => x + y.y , 0))
      .then(data => setter(data))
      .catch(e => console.log(e));
  }

  if (creds.region.length) {
    // Invocations
    const invocations = promise('Invocations', setInvocations);

    // Throttles
    const throttles = promise('Throttles', setThrottles);

    // Errors
    const errors = promise('Errors', setErrors);
  }

  return (
    <div>
      <h1>Home Page</h1>
      <h2>User Account Totals:</h2>
      <div>Invocations: { totalInvocations }</div>
      <div>Throttles: { totalThrottles }</div>
      <div>Errors: { totalErrors }</div>
    </div>
  )
}

export default Home;