
export const metricsByFunc = async (credentials, metric, time) => {
  // console.log('in get metrics by func', time)
  try {
  const data = await fetch(`http://localhost:1111/aws/getMetricsByFunc/${metric}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.credentials.accessKeyId,
      secretAccessKey: credentials.credentials.secretAccessKey
    },
    timePeriod: time
  })
 })
//  console.log('this is data in metrics by func', data)
 return data.json()
}
  catch (e) {
    console.log(e)
  }
}
