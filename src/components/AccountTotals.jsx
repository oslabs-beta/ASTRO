import React from 'react';
import { useEffect, useState } from 'react';
import { metricsAllFunc } from '../utils/getMetricsAllFunc';
import { useSelector } from 'react-redux';
import { Doughnut } from "react-chartjs-2";

///MATERIAL UI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

export const AccountTotals = () => {

	const creds = useSelector((state) => state.creds)
	const chartData = useSelector((state) => state.data);
	const list = useSelector((state) => state.funcList.funcList);

  const [totalInvocations, setInvocations] = useState(0);
  const [totalThrottles, setThrottles] = useState(0);
  const [totalErrors, setErrors] = useState(0);
  const [pieChartInvocations, setPCI] = useState([]);
  const [pieChartErrors, setPCE] = useState([]);
  const [pieChartThrottles, setPCT] = useState([])

	const promise = (metric, setter) => {
		Promise.resolve(metricsAllFunc(creds, metric))
			.then(data => data.data.reduce((x, y) => x + y.y, 0))
			.then(data => setter(data))
			.catch(e => console.log(e))
	}

	const pieChartData = (funcNames, metric) =>{
		return {
			labels: [...funcNames],
			datasets: [
				{
					data: metric,
					backgroundColor: [
						"rgb(242,165,152)",
						"rgb(255,232,157)",
						"rgb(236,107,109)",
						"rgb(122,231,125)",
						"rgb(195,233,151)"
					],
					hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
				}
			],
		
			plugins: {
				labels: {
					render: "percentage",
					fontColor: ["green", "white", "red"],
					precision: 2
				},
			},
			text: "23%",
		};
	}
	
	useEffect(() => {
		console.log('chart data : ', chartData.data)
		if (creds.region.length) {
			// console.log(chartData.data)
			const invocations = promise('Invocations', setInvocations);
			const throttles = promise('Throttles', setThrottles);
			const errors = promise('Errors', setErrors);

		}
		if (chartData.data) {
			const chartInvocations = [];
			for (let i = 0; i < chartData.data.invocations.length; i++) {
				chartInvocations.push(chartData.data.invocations[i].total);
			}
			setPCI(chartInvocations);

			const chartErrors = [];
			for (let i = 0; i < chartData.data.errors.length; i++) {
				chartErrors.push(chartData.data.errors[i].total);
			}
			setPCE(chartErrors);

			const chartThrottles = [];
			for (let i = 0; i < chartData.data.throttles.length; i++) {
				chartThrottles.push(chartData.data.throttles[i].total);
			}
			setPCT(chartThrottles);

		}
	} , [creds, chartData])



  return (

			<Container
				maxWidth="lg"
			>

				<h1>Account Totals</h1>
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
						
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							bgcolor: "background.paper",
							borderRadius: 0,
						}}
					>
						
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							bgcolor: "background.paper",
							borderRadius: 1,
						}}
					>
						
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

									<Doughnut
										data={pieChartData(list, pieChartInvocations)}
										options={{
											
											elements: {
												
												center: {
													legend: { display: true, position: "right" },
													text: "Red is 2/3 the total numbers",
													color: "#FF6384", // Default is #000000
													fontStyle: "Arial", // Default is Arial
													sidePadding: 20, // Default is 20 (as a percentage)
													minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
													lineHeight: 25 // Default is 25 (in px), used for when text wraps
												}
											},
											
										}}
									/>
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

									<Doughnut
										data={pieChartData(list, pieChartThrottles)}
										options={{
											
											elements: {
												
												center: {
													legend: { display: true, position: "right" },
													text: "Red is 2/3 the total numbers",
													color: "#FF6384", // Default is #000000
													fontStyle: "Arial", // Default is Arial
													sidePadding: 20, // Default is 20 (as a percentage)
													minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
													lineHeight: 25 // Default is 25 (in px), used for when text wraps
												}
											},
											
										}}
									/>
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

									<Doughnut
										data={pieChartData(list, pieChartErrors)}
										options={{
											
											elements: {
												
												center: {
													legend: { display: true, position: "right" },
													text: "Red is 2/3 the total numbers",
													color: "#FF6384", // Default is #000000
													fontStyle: "Arial", // Default is Arial
													sidePadding: 20, // Default is 20 (as a percentage)
													minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
													lineHeight: 25 // Default is 25 (in px), used for when text wraps
												}
											},
											
										}}
									/>
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
	
	);
}
