import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { LineChart } from '../components/LineChart.jsx';
import { TotalsByFunc } from '../components/TotalsByFunc.jsx';
import { metricsByFunc } from '../utils/getMetricsByFunc';
import { invocationsChange, errorsChange, throttlesChange } from '../features/slices/dataSlice.js';
import { TimePeriod } from './TimePeriod'

//Material UI Components//
import Grid from '@mui/material/Grid';


export const Dashboard = () => {

  const dispatch = useDispatch();
	const creds = useSelector((state) => state.creds)
	const timePeriod = useSelector((state) => state.time.time)
	const currentFunc = useSelector((state) => state.chart.name);
	const list = useSelector((state) => state.funcList.funcList);


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

			<Grid container spacing={2} columns={16} >

          <Grid item xs={14}>
            <h1 style={{color:"#424242"}}>{list[currentFunc]}</h1>
          </Grid>

          <Grid item xs={2}>
            <TimePeriod />
          </Grid>
					
      </Grid>

	
				<Grid container spacing={1} columns={16} justifyContent="center">

					<Grid item xs={12}>
							<TotalsByFunc />
					</Grid>

					<Grid item xs={12}>
							<LineChart />
					</Grid>

				</Grid>

		</Fragment>
		
	)
}


