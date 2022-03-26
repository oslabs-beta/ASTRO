
export const metricsAllFunc = async (credentials, metric) => {
	try {
		const data = await fetch(`http://localhost:1111/aws/getMetricsAllFunc/${metric}`, {
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
				timePeriod: "30d"
			})
		})
		// console.log('this is data in metricsAllFunc: ', await data.json())
        const formattedData = await data.json();
				return formattedData;
	}

	catch (e) {
		console.log(e)
	}
}
