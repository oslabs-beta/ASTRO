import React from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//MUI Styling
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



export const NavBar = () => {

  // const logged  = useSelector((state)=> state?.user.logged);

  return (

      <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#64b5f6' }}>
        <Toolbar>

          <Button>
          <Link 
            to="/"
            className="navbar-astro"
          >Astro</Link>
          </Button>
          {/* <Box  sx={{ ml: 2 }} > */}
          <Button variant="contained" disableElevation sx={{background: '#64b5f6'}}>
          <Link to="/insights">Insights</Link>
          </Button>

          <Button variant="contained" disableElevation sx={{background: '#64b5f6'}}>
           <a href="https://github.com/oslabs-beta/ASTRO" target="_blank">Github</a> 
          
          </Button>

        </Toolbar>
      </AppBar>
  );
}