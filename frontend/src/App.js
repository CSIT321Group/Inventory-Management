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

const roleRestrictedRoutes = {
    'ROLE_ADMIN': [
        {path: '/', exact: true, component: Home},
        {path: '/order', component: Order},
        {path: '/inventory', component: Inventory},
        {path: '/employee', component: Employee},
        {path: '/reporting', component: Reporting},
        {path: '/help', component: Help},
        {path: '/settings', component: Settings},
    ],
    'ROLE_EMPLOYEE': [
        {path: '/order', component: Order},
        {path: '/inventory', component: Inventory}
    ],
}

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRoles] = useState([]);

    useEffect(() => {

        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            setLoggedIn(false);
            console.log('JWT not found in local storage.');
            return; // Exit useEffect if JWT is not found
        }
        // Directly fetch roles from the server since JWT is stored in an HttpOnly cookie
        fetch("/current-user-roles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();  // This will return a promise that resolves with the parsed JSON data.
                } else {
                    throw new Error("Failed to fetch roles or user isn't authenticated");
                }
            })
            .then(data => {  // 'data' here will be the parsed JSON data, not the Response object.
                if (data && Array.isArray(data) && data.length > 0) {
                    setUserRoles(data);
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            })
            .catch(error => {
                console.error(error);
                setLoggedIn(false);
            });
    }, []);

    function handleLogout() {
        setLoggedIn(false);
    }

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
                                userRole.includes("ROLE_ADMIN") || userRole.includes("ROLE_Order") ?(
                                    <Order />
                                ) : (
                                    <div>You do not have access to this page.</div>
                                )} />
                        <Route
                            path='/inventory'
                            element={
                                userRole.includes("ROLE_ADMIN") || userRole.includes("ROLE_Inventory") ? (
                                    <Inventory/>
                                ) : (
                                    <div>You do not have access to this page</div>
                                )} />
                        <Route
                            path='/employee'
                            element={
                            userRole.includes("ROLE_ADMIN") || userRole.includes("ROLE_EmployeeInfo") ? (
                                <Employee />
                            ) : (
                                <div>You do not have access to this page</div>
                            )} />
                        <Route
                            path='/reporting'
                            element={
                            userRole.includes("ROLE_ADMIN") || userRole.includes("ROLE_Reporting") ? (
                                <Reporting />
                            ) : (
                                <div>You do not have access to this page.</div>
                            )} />
                        <Route path='/help' element={<Help />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
                        <Route path="*" element={<div>404 - Not Found</div>} />
                    </>
                ): (
                    <Route path='/login' element={<Login />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;