import React from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//MUI Styling
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';



export const NavBar = () => {

  // const logged  = useSelector((state)=> state?.user.logged);

  return (

      <AppBar position="static">
        <Toolbar>

          <Button >
          <Link 
            to="/"
            className="navbar-astro"
          >Astro</Link>
          </Button>

          <Button >
          <Link to="/insights">Insights</Link>
          </Button>

          <Button >
          <Link to="/github">Github</Link>
          </Button>

        </Toolbar>
      </AppBar>
  );
}