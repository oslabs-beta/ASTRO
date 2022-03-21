import React, {Fragment} from 'react';
import Invocations from '../components/Invocations.jsx';
import Errors from '../components/Errors.jsx';
import Throttles from '../components/Throttles.jsx';
import TotalsByFunc from '../components/TotalsByFunc.jsx'

//Material UI Components//
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


function Dashboard() {

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));


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

					<Grid item xs={6}>
						<Item>
							<Errors />
						</Item>
					</Grid>

					<Grid item xs={6}>
						<Item>
							<Throttles />
						</Item>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	);
}

export default Dashboard;