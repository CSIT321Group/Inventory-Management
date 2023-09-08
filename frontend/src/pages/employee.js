import React, { useState, useEffect } from 'react';
import './pageLayout.css';
import './employee.css';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchAllEmployees(); // Fetch all employees on component mount
    }, []);

    const searchEmployees = async (searchText) => {
        const result = await axios.get(`http://localhost:8080/api/staff/search/${searchText}`);
        setEmployees(result.data);
    }

    const fetchAllEmployees = async () => {
        const result = await axios.get('http://localhost:8080/api/staff');
        setEmployees(result.data);
    }

    const handleApplyFilters = (event) => {
        event.preventDefault();
        if(searchInput) {
            searchEmployees(searchInput);
        } else {
            fetchAllEmployees();
        }
    }

    return (
        <>
            <br/><br/>
            <div className='header'>
                <h1>Table Filter</h1>
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
                                    <label htmlFor="Position"><h3>Position</h3></label>
                                    <input type="checkbox" value="Associate"/>Associate<br/>
                                    <input type="checkbox" value="Manager"/>Manager<br/>
                                    <input type="checkbox" value="Office"/>Office<br/>
                                </td>
                                <td className="filterCols">
                                    <label htmlFor="permissions"><h3>Permissions</h3></label>
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
                    <h1>Employees Table</h1>
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
                                        <td>Position Placeholder</td> {/* Update this as needed */}
                                        <td>{employee.authorities.map((auth) => auth.authority).join(', ')}</td>
                                        <td>
                                            <button className='actionButtons'>
                                                <FaIcons.FaEdit />
                                            </button>
                                            |
                                            <button className='actionButtons'>
                                                <FaIcons.FaShare/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    );
}
