import 'dotenv/config'

export const metricsByFunc = async (param) => {
  try {
  const data = await fetch(`http://localhost:1111/aws/getMetricsByFunc/Invocations`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    region: "us-east-1",
    credentials: {
      accessKeyId: '',
      secretAccessKey: ''
    },
    timePeriod: "24hr"
  })
 })

 return data.json()
}
  
  catch (e) {
    console.log(e)
  }
}