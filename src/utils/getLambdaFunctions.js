export const data = async () => {
    try {
    const data = await fetch('http://localhost:1111/aws/getLambdaFunctions', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        region: "us-east-1",
        credentials: {
            accessKeyId: "AKIA5TZBMT7EJNT2IGMU",
            secretAccessKey: "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"
        }
      })
    })
    console.log(data)
    return data.json()
  } catch(e) {
    console.log(e)
  }
}