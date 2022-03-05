import React from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Insights from './pages/Insights.jsx';

import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

function App() {
    return (
        <>
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/insights">Insights</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
            <footer>footer stuff here!</footer>
        </Router>
        </>
    )
}

export default App;
