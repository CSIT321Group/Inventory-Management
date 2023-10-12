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

const roleRestrictedRoutes = {
    'ROLE_ADMIN': [
        {path: '/', exact: true, componenent: Home},
        {path: '/order', componenent: Order},
        {path: '/inventory', componenent: Inventory},
        {path: '/employee', componenent: Employee},
        {path: '/reporting', componenent: Reporting},
        {path: '/help', componenent: Help},
        {path: '/settings', componenent: Settings},
    ],
    'ROLE_EMPLOYEE': [
        {path: '/order', componenent: Order},
        {path: '/inventory', componenent: Inventory}
    ],
}
 
function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decoded(token);

        const roles = decoded.roles;

        const filterRoles = roles.filter(role => {
            if (role === "ROLE_ADMIN") {

            }
        })

        const isUserLoggedIn = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');

        if(isUserLoggedIn === 'true') {
            setLoggedIn(true);
            setUserRole(userRole);
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
                        <Route 
                            path='/order'
                            element={
                                userRole.includes("ROLE_ADMIN") || userRole.includes("Order") ?(
                                    <Order />
                                ) : (
                                    <div>You do not have access to this page.</div>
                                )} />
                        <Route 
                            path='/inventory'
                            element={
                                userRole.includes("ROLE_ADMIN") || userRoles.includes("Inventory") ? (
                                    <Inventory/>
                                ) : (
                                    <div>You do not have access to this page</div>
                                )} />
                        <Route 
                            path='/employee' 
                            element={
                            userRole.includes("ROLE_ADMIN") || userRole.includes("EmployeeInfo") ? (
                                <Employee />
                            ) : (
                                <div>You do not have access to this page</div>
                            )} />
                        <Route 
                            path='/reporting'
                            element={
                            userRole.includes("ROLE_ADMIN") || userRole.includes("Reporting") ? ( 
                                <Reporting />
                            ) : (
                                <div>You do not have access to this page.</div>
                            )} />
                        <Route path='/help' element={<Help />} />
                        <Route path='/settings' element={<Settings />} />
                    </>
                ): (
                    <Route path='/login' element={<Login />} />
                )}
            </Routes>
        </Router>
    );
}
 
export default App;