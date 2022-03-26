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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Timelapse, TimelineOutlined } from '@mui/icons-material';

function TotalsByFunc() {
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

			console.log('in use effect')
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
		<ThemeProvider theme={theme}>
			<Container
				maxWidth="lg"
			>
				 

				<Box sx={{ display: "flex", mt: 3 }}>

					
					<Card sx={{ maxWidth: 345, ml: 2 }}>
						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="success">
										<AlertTitle>Invocations</AlertTitle>
										<Typography>{totalInvocations}</Typography>
									</Alert>
								</Stack>
							</CardContent>
						</CardActionArea>
					</Card>



					<Card sx={{ maxWidth: 345, ml: 2 }}>
						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="warning">
										<AlertTitle>Throttles</AlertTitle>
										<Typography>{totalThrottles}</Typography>
									</Alert>
								</Stack>
							</CardContent>
						</CardActionArea>
					</Card>



					<Card sx={{ maxWidth: 5000, ml: 2 }}>
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
					</Card>

					<FormControl sx={{ m: 1, minWidth: 120 }}>

						<InputLabel id="demo-simple-select-helper-label">Time period</InputLabel>

							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={timePeriod}
								label="Time Period"
								onChange={handleChange}
							>

								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value='30min'>30min</MenuItem>
								<MenuItem value='1hr'>1hr</MenuItem>
								<MenuItem value='24hr'>24hr</MenuItem>
								<MenuItem value='7d'>7d</MenuItem>
								<MenuItem value='14d'>14d</MenuItem>
								<MenuItem value='30d'>30d</MenuItem>

							</Select>

						<FormHelperText>Choose your time period</FormHelperText>
						
      		</FormControl>

				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default TotalsByFunc;