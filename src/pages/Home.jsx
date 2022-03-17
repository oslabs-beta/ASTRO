import React from 'react';
import { useEffect, useState } from 'react';
import { metricsAllFunc } from '../utils/getMetricsAllFunc';

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

function Home(props) {


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

  const { creds } = props;

  const promise = (metric, setter) => {
    Promise.resolve(metricsAllFunc(creds, metric))
      .then(data => data.data.reduce((x, y) => x + y.y , 0))
      .then(data => setter(data))
      .catch(e => console.log(e));
  }

  if (creds.region.length) {
    // Invocations
    const invocations = promise('Invocations', setInvocations);

    // Throttles
    const throttles = promise('Throttles', setThrottles);

    // Errors
    const errors = promise('Errors', setErrors);
  }

  // const classes = useStyles();

  return (
		<ThemeProvider theme={theme}>
			<Container
				maxWidth="lg"
			>
				<Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mt: 1,
							pt: 1,
							bgcolor: "background.paper",
							borderRadius: 1,
						}}
					>
						<Typography variant="h3">Welcome to Astro</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							bgcolor: "background.paper",
							borderRadius: 0,
						}}
					>
						<Typography variant="subtitle1" gutterBottom>
							Your solution to AWS Lambda Function Monitoring
						</Typography>
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							bgcolor: "background.paper",
							borderRadius: 1,
						}}
					>
						<Typography variant="subtitle1" display="block" gutterBottom>
							Below are the account totals of invocations, throttles, and errors over the past 7 days.
						</Typography>
					</Box>
				</Box>

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

							<CardContent>
								<Typography variant="body2" color="text.secondary">
									Invocations are the number of times a function was invoked by
									either an API call or an event response from another AWS
									service.
								</Typography>
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

							<CardContent>
								<Typography variant="body2" color="text.secondary">
									Throttles occur when the number of invocations for a function
									exceeds its concurrency pool, which causes Lambda to start
									rejecting incoming requests.
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>

					<Card sx={{ maxWidth: 345, ml: 2 }}>
						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="error">
										<AlertTitle>Errors</AlertTitle>
										<Typography>{totalErrors}</Typography>
									</Alert>
								</Stack>
							</CardContent>

							<CardContent>
								<Typography variant="body2" color="text.secondary">
									Errors log the number of errors thrown by a function. It can
									be used with the Invocations metric to calculate the total
									percentage of errors.
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default Home;