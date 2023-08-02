import React from 'react';
// { createContext, useState}
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
 
function App() {
    // const [loggedIn, setLoggedIn] = useState(true);
    return (
        // <LoginContext.Provider value={[loggedIn, setLoggedIn]}>

        // </LoginContext.Provider>

        <Router>
            <ShowNavBar>
                <Navbar />
            </ShowNavBar>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' exact element={<Home />} />
                <Route path='/order' element={<Order />} />
                <Route path='/inventory' element={<Inventory />} />
                <Route path='/employee' element={<Employee />} />
                <Route path='/reporting' element={<Reporting />} />
                <Route path='/help' element={<Help />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </Router>
    );
}
 
export default App;