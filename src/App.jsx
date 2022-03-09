import React from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Insights from './pages/Insights.jsx';
import MustBeLoggedIn from './pages/MustBeLoggedIn.jsx';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NavBar from '../src/components/NavBar.jsx'
import Sidebar from '../src/components/Sidebar.jsx'


function App() {
    //We can read data from the store with useSelector
    const logged  = useSelector((state)=> state?.user.logged);

    return (
        <Router>
        <NavBar/>
        <Routes>
            <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sidebar" element={<Sidebar/>} />
            </>
        {logged ? (
            <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/insights" element={<Insights />} />
            </>
        ) : (
            <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/insights" element={<MustBeLoggedIn />} />
            </>
        )}
        <Route path="/*" element={<PageNotFound />} />
        </Routes>

        <footer>footer stuff here!</footer>

    </Router>
    )
}

export default App;
