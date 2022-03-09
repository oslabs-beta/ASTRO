import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function NavBar(){

    const logged  = useSelector((state)=> state?.user.logged);

    return (
        logged? (
        <>
        <Link to="/insights">Insights</Link>
        <Link to="/">Logout</Link>
        </>
        ) : (
        <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        </>
        )
    );
}

export default NavBar;