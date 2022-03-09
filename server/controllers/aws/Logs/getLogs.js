const moment = require('moment');

const {
	CloudWatchLogsClient,
	FilterLogEventsCommand,
	DescribeLogStreamsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

const getLogs = async (req, res, next) => {
	// append name of function to the format necessary for grabbing logs
	const logGroupName = '/aws/lambda/' + req.body.function;

	// start a new CloudWatchLogsClient connection with provided region and credentials
	const cwLogsClient = new CloudWatchLogsClient({
		region: req.body.region,
		credentials: req.body.credentials,
	});

	// StartTime and EndTime for CloudWatchLogsClient need to be in millisecond format so need to find what the provided time period equates to
	let StartTime;
	if (req.body.timePeriod === '30min') {
		StartTime = new Date(
			new Date().setMinutes(new Date().getMinutes() - 30)
		).valueOf();
	} else if (req.body.timePeriod === '1hr') {
		StartTime = new Date(
			new Date().setMinutes(new Date().getMinutes() - 60)
		).valueOf();
	} else if (req.body.timePeriod === '24hr') {
		StartTime = new Date(
			new Date().setDate(new Date().getDate() - 1)
		).valueOf();
	} else if (req.body.timePeriod === '7d') {
		StartTime = new Date(
			new Date().setDate(new Date().getDate() - 7)
		).valueOf();
	} else if (req.body.timePeriod === '14d') {
		StartTime = new Date(
			new Date().setDate(new Date().getDate() - 14)
		).valueOf();
	} else if (req.body.timePeriod === '30d') {
		StartTime = new Date(
			new Date().setDate(new Date().getDate() - 30)
		).valueOf();
	}

	// if a nextToken exists (meaning there are more logs to fetch), helperFunc provides a recursive way to get all the logs
	async function helperFunc(nextToken, data = []) {
		// once we run out of nextTokens, return data
		if (!nextToken) {
			return data;
		}
		const nextLogEvents = await cwLogsClient.send(
			new FilterLogEventsCommand({
				logGroupName,
				endTime: new Date().valueOf(),
				startTime: StartTime,
				nextToken,
				filterPattern: '- START - END - REPORT',
			})
		);
		console.log('nextLogEvents is: ', nextLogEvents);
		data.push(nextLogEvents.events);
		return helperFunc(nextLogEvents.nextToken, data);
	}

	try {
		// find the logEvents with given logGroupName and time period
		const logEvents = await cwLogsClient.send(
			new FilterLogEventsCommand({
				logGroupName,
				endTime: new Date().valueOf(),
				startTime: StartTime,
				filterPattern: '- START - END - REPORT',
			})
		);
		console.log('logevents is: ', logEvents);

		/*
    logEvents is:  
    { 
      '$metadata': { 
        httpStatusCode: 200,
        requestId: '2d2497e0-eaa1-46e4-a288-d31e33ba5ecb',
        extendedRequestId: undefined,
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0 
      },
      events: [],
      nextToken: undefined,
      searchedLogStreams: [] 
    }

  */
		// if no log events, just go back to frontend
		if (!logEvents) {
			res.locals.functionLogs = false;
			return next();
		}
		// only send back most recent 50 logs to reduce size
		const shortenedEvents = [];

		// if we received a nextToken, start helperFunc process and make sure to parse through that data in order to grab from the end
		if (logEvents.nextToken) {
			const helperFuncResults = await helperFunc(logEvents.nextToken);
			let poppedEl;

			// while we still have logs to grab from the helperFunc and shortenedEvents is shorter than 50 logs, add to it from the end (giving us the most recent first instead)
			while (
				helperFuncResults.length &&
				shortenedEvents.length <= 50
			) {
				poppedEl = helperFuncResults.pop();
				for (let i = poppedEl.length - 1; i >= 0; i -= 1) {
					if (shortenedEvents.length === 50) {
						break;
					}
					shortenedEvents.push(poppedEl[i]);
				}
			}
		}

		// if we didn't have a nextToken and got all logs in one request to the CloudWatchLogsClient
		if (!logEvents.nextToken) {
			// grab from the end to grab most recent logs and stop once we reach 50 to send back to frontend
			for (let i = logEvents.events.length - 1; i >= 0; i -= 1) {
				if (shortenedEvents.length === 50) break;
				shortenedEvents.push(logEvents.events[i]);
			}
		}

		// start forming what it'll look like to send back to frontend
		const eventLog = {
			name: req.body.function,
			timePeriod: req.body.timePeriod,
		};
		const streams = [];

		// loop through logs in order to eventually add to eventLog object
		for (let i = 0; i < shortenedEvents.length; i += 1) {
			let eventObj = shortenedEvents[i];
			// create the individual arrays to populate the table, this info makes up one row
			const dataArr = [];
			// just cut off the last five characters for the log stream name as an identifier
			dataArr.push('...' + eventObj.logStreamName.slice(-5));
			// format the date of the log timestamp to be more readable
			dataArr.push(moment(eventObj.timestamp).format('lll'));

			// if message is just from a normal log, remove the first 67 characters as it's all just metadata/a string of timestamps and unnecessary info
			if (
				eventObj.message.slice(0, 4) !== 'LOGS' &&
				eventObj.message.slice(0, 9) !== 'EXTENSION'
			) {
				dataArr.push(eventObj.message.slice(67));
				// if the message starts with LOGS or EXTENSION, it's usually different type of info and the beginning part has to stay
			} else {
				dataArr.push(eventObj.message);
			}
			// push to the larger array to then make up the table
			streams.push(dataArr);
		}
		eventLog.streams = streams;

		// grab just the ERROR logs
		try {
			const errorEvents = await cwLogsClient.send(
				new FilterLogEventsCommand({
					logGroupName,
					endTime: new Date().valueOf(),
					startTime: StartTime,
					filterPattern: 'ERROR',
				})
			);
			const errorStreams = [];
			// grab from the end to sort the most recent first
			for (let i = errorEvents.events.length - 1; i >= 0; i -= 1) {
				let errorObj = errorEvents.events[i];
				const rowArr = [];
				// just cut off the last five characters for the log stream name as an identifier
				rowArr.push('...' + errorObj.logStreamName.slice(-5));
				// format the date of the log timestamp to be more readable
				rowArr.push(moment(errorObj.timestamp).format('lll'));
				// remove the first 67 characters as it's all just metadata/a string of timestamps and unnecessary info
				rowArr.push(errorObj.message.slice(67));
				errorStreams.push(rowArr);
			}
			eventLog.errors = errorStreams;
			// send entire object back to frontend
			res.locals.functionLogs = eventLog;
			return next();
		} catch (err) {
			if (err) {
				console.error(err);

				return next(err);
			}
		}
	} catch (err) {
		if (err) console.error(err);
		return next(err);
	}
};

module.exports = getLogs;
