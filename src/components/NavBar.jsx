import React from 'react';

//MUI Styling
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';




export const NavBar = () => {

  return (
		<AppBar
			position="sticky"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}
		>
			<Toolbar>
				<Button >
					<a href="http://localhost:8080">
						Astro
					</a>
				</Button>

				{/* <Button
					variant="contained"
					disableElevation
					sx={{ background: "#64b5f6" }}
					data-testid="dashBtnNavBar"
				>
					Dashboard
				</Button> */}

				<Button
					variant="contained"
					disableElevation
				>
					<a href="https://github.com/oslabs-beta/ASTRO" target="_blank">
						Github
					</a>
				</Button>

			</Toolbar>
		</AppBar>

	);
}