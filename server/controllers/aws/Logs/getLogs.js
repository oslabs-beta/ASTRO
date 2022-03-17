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

	// nextToken is a parameter specified by AWS CloudWatch for the FilterLogEventsCommand; this token is needed to fetch the next set of events
	// helperFunc provides a recursive way to get all the logs
	async function helperFunc(nextToken, data = []) {
		// once we run out of nextTokens, return data (base case)
		if (!nextToken) {
			return data;
		}
		const nextLogEvents = await cwLogsClient.send(
			// FilterLogEventsCommand is a class that lists log events from a specified log group, which can be filtered using a filter pattern, a time range, and/or the name of the log stream
			// by default this lists logs up to 1 megabyte of log events (~10,000 log events) but we are limiting the data to the most recent 50 log events
			// query will return results from LEAST recent to MOST recent
			new FilterLogEventsCommand({
				logGroupName,
				endTime: new Date().valueOf(),
				startTime: StartTime,
				nextToken,
				// START, END, REPORT are keywords that appear at the start of the message for specific log events and our filter pattern detects only these events to be included in our logs
				filterPattern: '- START - END - REPORT',
			})
		);
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

		// if no log events exist, return back to frontend
		if (!logEvents) {
			res.locals.functionLogs = false;
			return next();
		}
		// only send back most recent 50 logs to reduce size of payload
		const shortenedEvents = [];

		// if we received a nextToken, start helperFunc to recursively parse through most recent data (meaning we grab data from the end since that is the most recent log stream)
		if (logEvents.nextToken) {
			const helperFuncResults = await helperFunc(logEvents.nextToken);

			// poppedEl gets the most recent log stream that currently exists in helperFunc (log streams that are even more recent will have already been added to shortenedEvents)
			let poppedEl;

			// while we still have logs to grab from the helperFunc and shortenedEvents is shorter than 50 logs, add to shortenedEvents array from the end (the most recent log stream)
			while (
				helperFuncResults.length &&
				shortenedEvents.length <= 50
			) {
				// poppedEl gets the most recent log stream that currently exists in helperFunc (log streams that are even more recent will have already been added to shortenedEvents)
				// but the for loop below is iterating through helperFunc such that we are adding the most recent log stream at the beginning of the shortenedEvent array
				poppedEl = helperFuncResults.pop();
				/**
				
				shortenedEvent = [                                              helperFuncResults = [
					index 0: { most recent event log stream },                      index 0: { least recent event log stream }
					.                                                               .
					.                                                               .
					.                                                               .
					index N: { least recent event log stream },                     index N: { most recent event log stream }
				]																																]
				
				*/
				for (let i = poppedEl.length - 1; i >= 0; i -= 1) {
					// we don't want to have more than 50 logs at any point in time to reduce operational load and size
					if (shortenedEvents.length === 50) break;
					else shortenedEvents.push(poppedEl[i]);
				}
			}
		}
		/**
		 * If a nextToken exists, we can't populate shortenedEvents with event log data without the second part of
		 * the or clause since we want to consider the situation when there are < 50 event log streams;
		 */
		if (!logEvents.nextToken || shortenedEvents.length < 50) {
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
			// the very first shortenedEvent element is the most recent log stream
			let eventObj = shortenedEvents[i];
			// create the individual arrays to populate the table; note that this will represent a single row of info (log stream name + time stamp + stream message)
			const dataArr = [];
			// cut off the last five characters from the log stream name to create an identifier for this specific log stream
			// note that logStreamName appears before the timestamp
			dataArr.push('...' + eventObj.logStreamName.slice(-5));
			// format('lll') creates a human readable date from the specific log stream's timestamp
			dataArr.push(moment(eventObj.timestamp).format('lll'));

			// if message is just from a normal log, remove the first 67 characters of the message as it's all just metadata/a string of timestamps and unnecessary info
			if (
				eventObj.message.slice(0, 4) !== 'LOGS' &&
				eventObj.message.slice(0, 9) !== 'EXTENSION'
			)
				dataArr.push(eventObj.message.slice(67));
			// messages starting with LOGS or EXTENSION represents different/pertinent info and we don't want to mutate the message like we did within the if block just above
			else dataArr.push(eventObj.message);
			// push the formatted dataArr into the outer array, streams, to make the table for our logs
			streams.push(dataArr);
		}
		eventLog.streams = streams;
		/**
				
				streams = [
					index 0: [ { most recent event log stream } ],
					.
					.
					.
					index N: [ { least recent event log stream } ],
				]																																
		*/

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
