export const logs = async (credentials, functionName) => {
	try {
		const data = await fetch(`http://localhost:1111/aws/getLogs`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				region: credentials.region,
				credentials: {
					accessKeyId: credentials.credentials.accessKeyId,
					secretAccessKey: credentials.credentials.secretAccessKey,
				},
				function: functionName,
			}),
		});
		const formattedData = await data.json();
		return formattedData;
	} catch (e) {
		console.log(e);
	}
};
