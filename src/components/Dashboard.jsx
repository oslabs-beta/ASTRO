import React, {Fragment, useEffect} from 'react';
import Invocations from '../components/Invocations.jsx';
// import Errors from '../components/Errors.jsx';
// import Throttles from '../components/Throttles.jsx';
import TotalsByFunc from '../components/TotalsByFunc.jsx';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { metricsByFunc } from '../utils/getMetricsByFunc';
import { invocationsChange, errorsChange, throttlesChange } from '../features/slices/dataSlice.js';

//Material UI Components//
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


export const Dashboard = () => {

  const dispatch = useDispatch();
	const creds = useSelector((state) => state.creds)
	const timePeriod = useSelector((state) => state.time.time)

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	// let promise = 
	useEffect(() => {
		const invocations = Promise.resolve(metricsByFunc(creds, 'Invocations', timePeriod))
		.then((data) => dispatch(invocationsChange(data.series)))
		.catch((e) => console.log(e));

		const errors = Promise.resolve(metricsByFunc(creds, 'Errors', timePeriod))
		.then((data) => dispatch(errorsChange(data.series)))
		.catch((e) => console.log(e));

		const throttles = Promise.resolve(metricsByFunc(creds, 'Throttles', timePeriod))
		.then((data) => dispatch(throttlesChange(data.series)))
		.catch((e) => console.log(e));

	}, [timePeriod])

	return (

		<Fragment>
			<Box component="main">
				<Grid container spacing={1} columns={16} justifyContent="center">
					<Grid item xs={12}>
						<Item>
							<TotalsByFunc />
						</Item>
					</Grid>

					<Grid item xs={12}>
						<Item>
							<Invocations />
						</Item>
					</Grid>

					{/* <Grid item xs={6}>
						<Item>
							<Errors />
						</Item>
					</Grid>

					<Grid item xs={6}>
						<Item>
							<Throttles />
						</Item>
					</Grid> */}
				</Grid>
			</Box>
		</Fragment>
		
	)
}

