import React from 'react';
import { useEffect, useState } from 'react';
import { metricsByFunc } from "../utils/getMetricsByFunc";
import { useSelector } from 'react-redux';
import { timeChange } from '../features/slices/timePeriodSlice'
import { useDispatch } from 'react-redux';

///MATERIAL UI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Timelapse, TimelineOutlined } from '@mui/icons-material';

export const TotalsByFunc = () => {
	const dispatch = useDispatch();
	const creds = useSelector((state) => state.creds)
	const currentFunc = useSelector((state) => state.chart.name)
	const timePeriod = useSelector((state) => state.time.time)

	const theme = createTheme({
		typography: {
			fontFamily: [
				"Nanum Gothic",
				"sans-serif"
			].join(","),
		},
	});


  const [totalInvocations, setInvocations] = useState(0);
  const [totalThrottles, setThrottles] = useState(0);
  const [totalErrors, setErrors] = useState(0);
	const [time, setTime] = useState('')
	const chartData = useSelector((state) => state.data);

	useEffect(() => {

		if (chartData.data.invocations && chartData.data.errors && chartData.data.throttles) {

			const invocations = chartData.data.invocations[currentFunc].data.reduce((x, y) => x + y.y, 0)
			setInvocations(invocations)

			const errors = chartData.data.errors[currentFunc].data.reduce((x, y) => x + y.y, 0)
			setErrors(errors)

			const throttles = chartData.data.throttles[currentFunc].data.reduce((x, y) => x + y.y, 0)
			setThrottles(throttles)
	
		}
	}, [currentFunc, chartData]);
	
	const handleChange = async (event) => {
		setTime(event.target.value)
    dispatch(timeChange(event.target.value))
  };


  return (

		<>

			<ThemeProvider theme={theme}>
				 

				{/* <Box sx={{ display: "flex", mt: 3 }}> */}
					<Paper sx={{ 
						display: "flex", 
						mt: 3,
						 }} >

			
						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert color="info">
										<AlertTitle>Invocations</AlertTitle>
										<Typography>{totalInvocations}</Typography>
									</Alert>
								</Stack>
							</CardContent>
						</CardActionArea>




						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="success">
										<AlertTitle>Throttles</AlertTitle>
										<Typography>{totalThrottles}</Typography>
									</Alert>
								</Stack>
							</CardContent>
						</CardActionArea>
		


	
						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="error">
										<AlertTitle>Errors</AlertTitle>
										<Typography>{totalErrors}</Typography>
									</Alert>
								</Stack>
							</CardContent>
						</CardActionArea>
				</Paper>


			
		</ThemeProvider>
		</>
	);
}

export default TotalsByFunc;