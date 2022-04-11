import React, { useEffect, useState }  from 'react';
import { useSelector } from 'react-redux';
import { metricsAllFunc } from '../utils/getMetricsAllFunc';

///STYLING - MATERIAL UI && CHART.JS///
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';


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

	/*
	Helper function that is called on load - retrieves the data needed to sum metric totals and store it in local state
	*/
	const promise = (metric, setter) => {
		Promise.resolve(metricsAllFunc(creds, metric))
			.then(data => data.data.reduce((x, y) => x + y.y, 0))
			.then(data => setter(data))
			.catch(e => console.log(e))
	}

	/*
	Helper function to create customized formatted chart.js pie chart based on function metric 
	*/
	const pieChart = (funcNames, metricData) =>{
		return (
		<Doughnut
			data={{
				labels: [...funcNames],
				datasets: [
					{
						data: metricData,
						backgroundColor: [
							"#64b5f6",
							"#9575cd",
							"#26a69a",
							"rgb(122,231,125)",
							"rgb(195,233,151)"
						],
						hoverBackgroundColor: ["#1565c0", "#6200ea", "#004d40"]
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
			}}
			options={{
				
				elements: {
					
					center: {
						legend: { display: true, position: "right" },
						text: "Red is 2/3 the total numbers",
						color: "#FF6384",
						fontStyle: "Arial",
						sidePadding: 20,
						minFontSize: 20,
						lineHeight: 25 
					}
				},
				
			}}
		/>)
	}
	
	useEffect(() => {

		if (creds.region.length) {
			promise('Invocations', setInvocations);
			promise('Throttles', setThrottles);
			promise('Errors', setErrors);
		}
		if (chartData.data.invocations && chartData.data.errors && chartData.data.throttles) {
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
		
		chartData ? 

		<>
			<Container
				maxWidth="lg"
			>

			<Paper elevation={0} sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				verticalAlign: "middle",
				background: "#eeeeee",
  		}}>
				<h1 style={{color:"#424242"}}>Account Totals</h1>
			</Paper>

				<Box>
	
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

					{/* INVOCATIONS CARD */}

					<Card sx={{ maxWidth: 345, ml: 2 }}>
						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>

									<Alert color="info">
										<AlertTitle>Invocations</AlertTitle>
										<Typography>{totalInvocations}</Typography>
									</Alert>

									 {pieChart(list, pieChartInvocations)}

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

					{/* ERRORS CARD */}

					<Card sx={{ maxWidth: 345, ml: 2 }}>
						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>

									<Alert severity="error">
										<AlertTitle>Errors</AlertTitle>
										<Typography>{totalErrors}</Typography>
									</Alert>

									 {pieChart(list, pieChartErrors)}
									
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


					{/* THROTTLES CARD */}

					<Card sx={{ maxWidth: 345, ml: 2 }}>
						<CardActionArea>
							<CardContent>
								<Stack sx={{ width: "100%" }} spacing={2}>

									<Alert severity="success">
										<AlertTitle>Throttles</AlertTitle>
										<Typography>{totalThrottles}</Typography>
									</Alert>

									 {pieChart(list, pieChartThrottles)}
									
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

				</Box>

			</Container>
			</>

			:

			<CircularProgress />
	
	);
}
