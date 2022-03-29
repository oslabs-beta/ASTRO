import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { LineChart } from './LineChart.jsx';
import TotalsByFunc from '../components/TotalsByFunc.jsx';
import { metricsByFunc } from '../utils/getMetricsByFunc';
import { invocationsChange, errorsChange, throttlesChange } from '../features/slices/dataSlice.js';

//Material UI Components//
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



export const Dashboard = () => {

  const dispatch = useDispatch();
	const creds = useSelector((state) => state.creds)
	const timePeriod = useSelector((state) => state.time.time)


	useEffect(() => {
		Promise.resolve(metricsByFunc(creds, 'Invocations', timePeriod))
		.then((data) => dispatch(invocationsChange(data.series)))
		.catch((e) => console.log(e));

		Promise.resolve(metricsByFunc(creds, 'Errors', timePeriod))
		.then((data) => dispatch(errorsChange(data.series)))
		.catch((e) => console.log(e));

		Promise.resolve(metricsByFunc(creds, 'Throttles', timePeriod))
		.then((data) => dispatch(throttlesChange(data.series)))
		.catch((e) => console.log(e));

	}, [timePeriod])

	return (

		<Fragment>
			<Box component="main">
				<Grid container spacing={1} columns={16} justifyContent="center">
					<Grid item xs={12}>
							<TotalsByFunc />
					</Grid>

					<Grid item xs={12}>
							<LineChart />
					</Grid>
				</Grid>
			</Box>
		</Fragment>
		
	)
}

