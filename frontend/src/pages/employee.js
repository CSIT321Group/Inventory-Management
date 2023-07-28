import React from 'react';
// import { useEffect, useState } from 'react';
import './employee.css';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';   
// import axios from 'axios';          

export default function Employee() {
    // const [staff, setStaff] = useState(null);
    // const baseURL = 'http://localhost:8080/api/staff/1';

    // useEffect(() => {
    //     axios.get(baseURL).then((response) => {
    //         setStaff(response.data);
    //     });
    // }, []);

    return (
        <div className="employeePageLayout">
            <br/><br/>
            <h1>Table Filter</h1>
            <div className="content">
                <div>
                    <form action="">
                        <table className="filterTable">
                            <tr>
                                <td className="filterCols">
                                    <input className="searchInput" type="text" placeholder="Search"/>
                                </td>
                                <td className="filterCols">
                                    <label htmlFor="Position"><h3>Position</h3></label>
                                    <input type="checkbox" value="Associate"/>Associate<br/>
                                    <input type="checkbox" value="Manager"/>Manager<br/>
                                    <input type="checkbox" value="Office"/>Office<br/>
                                </td>
                                <td className="filterCols">
                                    <label htmlFor="permissions"><h3>Permissions</h3></label>
                                    Level 1<input type="checkbox" value="level-1"/><br/>
                                    Level 2<input type="checkbox" value="level-2"/><br/>
                                    Level 3<input type="checkbox" value="level-3"/><br/>
                                    Level 4<input type="checkbox" value="level-4"/><br/>
                                </td>
                                <td className='filterButton'>
                                    <button className='applyButton'>APPLY FILTERS</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <br/><br/>
            <IconContext.Provider value={{color: 'black'}}>
            <h1>Employees Table</h1>
            <div className="content">
                <div>
                    <table className="employeeTable">
                        <tr>
                            <th>Employee ID</th>
                            <th>Full Name</th>
                            <th>Position</th>
                            <th>Permissions</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>123456</td>
                            <td>John Smith</td>
                            <td>Warehouse Staff</td>
                            <td>Access Level: 1</td>
                            <td>
                                <button className="actionButtons">
                                    <FaIcons.FaEdit />
                                </button>
                                |
                                <button className="actionButtons">
                                    <FaIcons.FaShare />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>654321</td>
                            <td>Callum Murray</td>
                            <td>Warehouse Manager</td>
                            <td>Access Level: 3</td>
                            <td>
                                <button className="actionButtons">
                                    <FaIcons.FaEdit />
                                </button>   
                                    |
                                <button className="actionButtons">
                                    <FaIcons.FaShare />
                                </button>
                            </td>
                        </tr>
                    </table>
                </div> 
            </div> 
            </IconContext.Provider>
        </div>
    );
}