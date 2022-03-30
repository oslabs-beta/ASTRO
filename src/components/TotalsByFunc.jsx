import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

///MATERIAL UI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Paper from '@mui/material/Paper';


export const TotalsByFunc = () => {

	const currentFunc = useSelector((state) => state.chart.name)
	const chartData = useSelector((state) => state.data);

	const [totalInvocations, setInvocations] = useState(0);
  const [totalThrottles, setThrottles] = useState(0);
  const [totalErrors, setErrors] = useState(0);

	const theme = createTheme({
		typography: {
			fontFamily: [
				"Nanum Gothic",
				"sans-serif"
			].join(","),
		},
	});


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
	

  return (

		<>
		<ThemeProvider theme={theme}>
				 
			<Paper sx={{ 
				display: "flex", 
				mt: 3,
					}} >

				{/* INVOCATIONS CARD */}
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

				{/* THROTTLES CARD */}
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

				{/* ERRORS CARD */}
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
