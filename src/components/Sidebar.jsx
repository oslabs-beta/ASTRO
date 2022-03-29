import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getFuncs } from '../features/slices/funcListSlice';
import { nameChange } from '../features/slices/chartSlice';
import { toggleChange } from "../features/slices/insightsToggleSlice";

////////////STYLING///////////////
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';


export const SideBar = () => {

  const list = useSelector((state) => state.funcList.funcList);
  const creds = useSelector((state) => state.creds)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFuncs(creds))
  }, [])

  const handleFunctionChange = (key) => {
    dispatch(nameChange(key))
  }

	const handleComponentChange = (tab) => {
		dispatch(toggleChange(tab))
	}

  return (
		<Box sx={{ display: "flex" }}>
			<Drawer
				variant="permanent"
				sx={{
					width: 240,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
				}}
			>
				<Toolbar />

				<Typography variant="h6" sx={{ color: "#616161" }}>
					<ListItemButton data-testid="funcbutton"onClick={() => handleComponentChange("Functions")}>
						Functions
					</ListItemButton>
				</Typography>

				<Box sx={{ overflow: "auto" }}></Box>

				<List>
					{list.map((element, idx) => {
						return (
							<ListItemButton key={idx} onClick={() => handleFunctionChange(idx)}>
								<ListItemText primary={element} />
							</ListItemButton>
						);
					})}
				</List>

				<Typography variant="h6" sx={{ color: "#616161" }}>
					<ListItemButton onClick={() => handleComponentChange("Account Total")}>
						Account Total
					</ListItemButton>
				</Typography>
			</Drawer>
		</Box>
	);
}


/**
 * @Remember { Axios }
 * @Remember {https://reactjs.org/docs/conditional-rendering.html}
 */
