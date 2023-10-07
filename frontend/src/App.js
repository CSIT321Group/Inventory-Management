import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import ShowNavBar from './components/Navbar/ShowNavBar';
import Home from './pages/dashboard';
import Order from './pages/Order/order';
import Inventory from './pages/inventory';
import Login from './pages/login';
import Employee from './pages/employee';
import Reporting from './pages/reporting';
import Help from './pages/help';
import Settings from './pages/settings';
import Logout from "./pages/logout";

 
function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('jwt');

        if(isUserLoggedIn) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <ShowNavBar>
                <Navbar />
            </ShowNavBar>
            <Routes>
                {loggedIn ? (
                    <>
                        <Route path='/' exact element={<Home />} />
                        <Route path='/order' element={<Order />} />
                        <Route path='/inventory' element={<Inventory />} />
                        <Route path='/employee' element={<Employee />} />
                        <Route path='/reporting' element={<Reporting />} />
                        <Route path='/help' element={<Help />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/logout' element={<Logout />} />
                    </>
                ): (
                    <Route path='/login' element={<Login />} />
                )}
            </Routes>
        </Router>
    );
}
 
export default App;