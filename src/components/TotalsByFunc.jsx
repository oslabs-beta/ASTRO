import React from 'react';
import { useEffect, useState } from 'react';
import { metricsByFunc } from "../utils/getMetricsByFunc";
import { useSelector } from 'react-redux';

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

function TotalsByFunc() {

	const creds = useSelector((state) => state.creds)
	const currentFunc = useSelector((state) => state.chart.name)

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


  const promise = (metric, setter) => {
    Promise.resolve(metricsByFunc(creds, metric))
			.then((data) => data.series[currentFunc].data.reduce((x, y) => x + y.y, 0))
			.then((data) => setter(data))
			.catch((e) => console.log(e));
  }

	useEffect(() => {
		if (creds.region.length) {
			//use promise.all here?
			const invocations = promise("Invocations", setInvocations);
			const throttles = promise("Throttles", setThrottles);
			const errors = promise("Errors", setErrors);
		}
	}, [currentFunc]);
	

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


				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default TotalsByFunc;