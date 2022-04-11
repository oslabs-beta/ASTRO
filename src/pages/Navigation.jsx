import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AccountTotals } from '../components/AccountTotals.jsx';
import { Dashboard } from '../components/Dashboard.jsx';
import { DisplayLogs } from '../components/DisplayLogs.jsx';
import { toggleChange } from '../features/slices/insightsToggleSlice';
import { nameChange } from '../features/slices/chartSlice';
import { getFuncs } from '../features/slices/funcListSlice';

////////////////////////////////////
///////// MUI STYLING //////////////
////////////////////////////////////

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FunctionsTwoToneIcon from '@mui/icons-material/FunctionsTwoTone';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

////////////////////////////////////////
///////// MUI STYLING END //////////////
////////////////////////////////////////


export const Navigation = () => {

  const dispatch = useDispatch();
  const theme = useTheme();

  const componentChange = useSelector((state) => state.toggleInsights.toggle);
  const list = useSelector((state) => state.funcList.funcList);
  const creds = useSelector((state) => state.creds);

  useEffect(() => {
    dispatch(getFuncs(creds))
  }, [])

  const [open, setOpen] = React.useState(false);
  const [dropDown, setDropDown] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFunctionToggle = (key) => {
    dispatch(nameChange(key))
  };

  const handleDropDownComponentChange = (tab) => {
    dispatch(toggleChange(tab))
    setDropDown(!dropDown);
  };

  const handleComponentChange = (tab) => {
    dispatch(toggleChange(tab))
  };

    
  const componentSwitch = (componentName) => {
    switch(componentName){
      case 'Account Totals':
        return <AccountTotals/>
      case 'Functions':
        return <Dashboard />
      case 'Logs':
        return <DisplayLogs />
    }
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* NAVIGATION HEADER */}

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

              <Button 
              className="navbar-astro"
              variant="contained"
              disableElevation
              >
                <a href="http://localhost:1111"> Astro </a>
              </Button>

              <Button
              variant="contained"
              disableElevation
              >
                <a href="https://github.com/oslabs-beta/ASTRO" target="_blank"> Github </a>
              </Button>

        </Toolbar>
      </AppBar>


      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        
        {/* NAVIGATION SIDEBAR */}

      <List>

        <ListItemButton 
        onClick={() => handleComponentChange("Account Totals")}
        >
          <ListItemIcon>
            <AddBoxTwoToneIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary="Account Totals" />
        </ListItemButton >

        <ListItemButton 
          onClick={() => {handleComponentChange("Logs")}}
        >
          <ListItemIcon>
            <AssignmentTwoToneIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary="Logs" />
        </ListItemButton>


        <ListItemButton 
          onClick={() => {handleDropDownComponentChange("Functions")}}
        >
          <ListItemIcon>
            <FunctionsTwoToneIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary="Functions" />
          {dropDown ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={dropDown} timeout="auto" unmountOnExit>

          <List component="div" disablePadding>
            {list.map((text, index) => (
              <ListItemButton sx={{ pl: 4 }} key={index} onClick={() => handleFunctionToggle(index)}>
                <ListItemText primary={text}/>
              </ListItemButton>
            ))}
          </List> 
  
        </Collapse>
      
      </List>

      <Divider />
      </Drawer>

      {/* COMPONENT RENDERING */}
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />


         {componentSwitch(componentChange)}


      </Box>
    </Box>
  );
}
