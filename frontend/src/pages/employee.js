import React, { useState, useEffect } from 'react';
import './pageLayout.css';
import './employee.css';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';
import Popup from './employee_popup';

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
    const [employeeList, setEmployeeList] = useState([]);
    const [employeeDetails, setEmployeeDetails] = useState({
        id: "",
        first_name: "",
        last_name: "",
        username: "",
        authorities: [],
    });

    const getAuthHeaders = () => {
        return {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        };
    };

    const searchEmployees = async (searchText) => {
        const result = await axios.get(`http://localhost:8080/api/staff/search/${searchText}`, {
            headers: getAuthHeaders()
        });
        setEmployees(result.data);
    }

    const fetchAllEmployees = async () => {
        const result = await axios.get('http://localhost:8080/api/staff', {
            headers: getAuthHeaders()
        });
        setEmployees(result.data);
    }
    

    useEffect(() => {
        fetchAllEmployees(); // Fetch all employees on component mount
    }, []);

    const handleApplyFilters = (event) => {
        event.preventDefault();
        fetchAllEmployees();
        if(!searchInput) {
            fetchAllEmployees();
        } else {
            searchEmployees(searchInput);
        }
    }
    //this is executed straight after 2.5 seconds to allow it to fill the employees table
    //setTimeout(fetchAllEmployees(), 2500);

    useEffect(() => {
        const fetchData = async () => {  // Defining an async function to fetch data from the API
            // Setting a default endpoint URL
            let endpoint = `http://localhost:8080/api/staff`;

            try {
                // Making an asynchronous GET request to the endpoint
                const response = await axios.get(endpoint, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                // Mapping the response data to add/update some fields before setting the state
                const updatedData = response.data.map(employee => {
                    return {
                        ...employee,
                        id: employee.id,
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        username: employee.username,
                        authorities: employee.authorities,
                        //<td>{getRoleFromAuthorities(employee.authorities)}</td>
                        //<td>{getFormattedAuthorities(employee.authorities)}</td>
                    };
                });
                setEmployeeList(updatedData) 
                // Updating the state with the fetched data
            } catch (error) {
                // Logging any errors during the fetch process
                console.error(`Error fetching Staff data: ${error}`);
            } 
        };
        fetchData(); // Calling the fetchData function to initiate the fetch process
    },);

    // Utility function to capitalize the first letter of a word
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

// Utility function to process the role
    const getRoleFromAuthorities = (authorities) => {
        const role = authorities.find(auth => auth.authority.startsWith('ROLE_'));
        return role ? capitalizeFirstLetter(role.authority.replace('ROLE_', '')) : 'Unknown';
    }

// Utility function to process the authorities
    const getFormattedAuthorities = (authorities) => {
        return authorities
            .filter(auth => !auth.authority.startsWith('ROLE_'))
            .map(auth => capitalizeFirstLetter(auth.authority))
            .join(', ');
    }

    //used to get the data of the employee selected based on which button they press
    const handleChange = (event) => {
        setEmployeeDetails({
            id: "",
            first_name: "",
            last_name: "",
            username: "",
            authorities: "",
        });
        setButtonPopup(true)
        const newValue = parseInt(event.target.value);
        console.log(event.target.value);

        const selectedObject = employeeList.find((item) => item.id === newValue);
        console.log(selectedObject);
        
        if (employeeDetails) {
            setEmployeeDetails({
                id: selectedObject.id,
                first_name: selectedObject.first_name,
                last_name: selectedObject.last_name,
                username: selectedObject.username,
                authorities: selectedObject.authorities,
            });
        }
    };
    
    return (
        <div style={{fontSize: JSON.parse(localStorage.getItem('newSize')), zoom: JSON.parse(localStorage.getItem('zoom')), fontWeight: localStorage.getItem('boldFont')}}>
            <br/><br/>
            <div className='header'>
                <h1 style={{color: localStorage.getItem('fontColour')}}>Table Filter</h1>
            </div>
            <div className="content">
                <div>
                    <form name='employeeFilterForm'>
                        <table className="filterTable">
                            <tr>
                                <td className="filterCols">
                                    <input className="searchInput"
                                           type="text"
                                           placeholder="Search"
                                           value={searchInput}
                                           onChange={e => setSearchInput(e.target.value)}/>
                                </td>
                                <td className="filterCols">
                                    <label htmlFor="Position"><h3 style={{color: localStorage.getItem('fontColour')}}>Position</h3></label>
                                    <input type="checkbox" value="Associate"/>Associate<br/>
                                    <input type="checkbox" value="Manager"/>Manager<br/>
                                    <input type="checkbox" value="Office"/>Office<br/>
                                </td>
                                <td className="filterCols">
                                    <label htmlFor="permissions"><h3 style={{color: localStorage.getItem('fontColour')}}>Permissions</h3></label>
                                    Inventory<input type="checkbox" value="Inventory"/><br/>
                                    Order<input type="checkbox" value="Order"/><br/>
                                    Reporting<input type="checkbox" value="Reporting"/><br/>
                                    Employee<input type="checkbox" value="Employee"/><br/>
                                </td>
                                <td className='filterButton'>
                                    <button className='applyButton' onClick={handleApplyFilters}>APPLY FILTERS</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <br/><br/>
            <IconContext.Provider value={{color: 'black'}}>
                <div className='header'>
                    <h1 style={{color: localStorage.getItem('fontColour')}}>Employees Table</h1>
                </div>
                <div className='content'>
                    <div>
                        <table className='employeeTable'>
                            <tr>
                                <th>Employee ID</th>
                                <th>Full Name</th>
                                <th>Position</th>
                                <th>Permissions</th>
                                <th>Action</th>
                            </tr>
                            {
                                employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.first_name + " " + employee.last_name}</td>
                                        <td>{getRoleFromAuthorities(employee.authorities)}</td>
                                        <td>{getFormattedAuthorities(employee.authorities)}</td>
                                        <td>
                                            <button className='actionButtons' onClick={handleChange} value={employee.id}>
                                                <FaIcons.FaEdit />
                                            </button>
                                            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} style={{backgroundColor: localStorage.getItem('backgroundColour')}}>
                                                <div>
                                                    <h2 style={{color: localStorage.getItem('fontColour')}}>Employee Details</h2>
                                                        <h3 style={{color: localStorage.getItem('fontColour')}}>Personal Information</h3>
                                                            <table className="employeeDetails_Table">
                                                                <tr>
                                                                    <td style={{border: "none"}}>{employeeDetails.first_name}</td>
                                                                    <td style={{border: "none"}}>{employeeDetails.last_name}</td>
                                                                    <td style={{border: "none"}}>{employeeDetails.id}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th style={{border: "none"}}>First Name</th>
                                                                    <th style={{border: "none"}}>Last Name</th>
                                                                    <th style={{border: "none"}}>Employee ID</th>
                                                                </tr>
                                                            </table>
                                                        <h3 style={{color: localStorage.getItem('fontColour')}}>Work Information</h3>
                                                        <table className="employeeDetails_Table">
                                                            <tr>
                                                                <td style={{border: "none"}}>{employeeDetails.username}</td>
                                                                <td style={{border: "none"}}>{getRoleFromAuthorities(employeeDetails.authorities)}</td>
                                                                <td style={{border: "none"}}>{getFormattedAuthorities(employeeDetails.authorities)}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style={{border: "none"}}>Username</th>
                                                                <th style={{border: "none"}}>Position</th>
                                                                <th style={{border: "none"}}>Permissions</th>
                                                            </tr>
                                                        </table>
                                                </div>
                                            </Popup>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </IconContext.Provider>
        </div>
    );
}
