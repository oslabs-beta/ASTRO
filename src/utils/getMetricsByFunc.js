
export const metricsByFunc = async (credentials, metric) => {
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
    timePeriod: "7d"
  })
 })

 return data.json()
}
  
  catch (e) {
    console.log(e)
  }
}
