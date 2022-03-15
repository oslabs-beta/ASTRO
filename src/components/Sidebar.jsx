import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getFuncs } from '../features/slices/funcListSlice';
import { nameChange } from '../features/slices/chartSlice';
////////////STYLING///////////////
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


// const drawerWidth = 240;

export const SideBar = (props) => {

  const list = useSelector((state) => state.funcList.funcList)
  const credentials = useSelector((state) => state.creds)
  const dispatch = useDispatch()

   useEffect(() => {
     dispatch(getFuncs(credentials))
   }, [])

  const handleClick = (key) => {
    dispatch(nameChange(key))
  }

  return (

    <Box sx={{display: 'flex'}}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar/>
        <Box sx={{ overflow: 'auto' }}></Box>
       
        <List>
        {list.map((element, idx) => {
          
          return <ListItemButton
          button
          key={idx}
          onClick={() => handleClick(idx)}
          >
            <ListItemText primary={element}/>

          </ListItemButton>
         
        })}
      </List>
      <Divider/>
    </Drawer>
    </Box>
 )
}

// return(
//   <div>
//     {list.map((element, idx) =>
//       <button
//         key={idx}
//         onClick={() => handleClick(idx)}
//       >
//         {element}
//       </button>
//     )}
//   </div>


/**
 * @Remember { Axios }
 * @Remember {https://reactjs.org/docs/conditional-rendering.html}
 */