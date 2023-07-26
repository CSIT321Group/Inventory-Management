import React from 'react';
import './employee.css';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';             

export default function Employee() {
    return (
        <div className="employeePageLayout">
            <br/><br/>
            <h1 style={{marginLeft:"200px"}}>Table Filter</h1>
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
                                    <input type="checkbox" value="level-1"/>Level 1<br/>
                                    <input type="checkbox" value="level-2"/>Level 2<br/>
                                    <input type="checkbox" value="level-3"/>Level 3<br/>
                                    <input type="checkbox" value="level-4"/>Level 4<br/>
                                </td>
                                <td>
                                    <button style={{width:"160px", height:"40px", borderRadius:"30px", textAlign:"center", color:"black"}}>APPLY FILTERS</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <br/><br/>
            <IconContext.Provider value={{color: 'black'}}>
            <h1 style={{marginLeft:"200px"}}>Employees Table</h1>
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
                                    {/* <img src={editImage} alt="edit"/> */}
                                </button>
                                |
                                <button className="actionButtons">
                                    <FaIcons.FaShare />
                                    {/* <img src={shareImage} alt="share"/> */}
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
                                    {/* <img src={editImage} alt="edit"/> */}
                                </button>   
                                    |
                                <button className="actionButtons">
                                    <FaIcons.FaShare />
                                    {/* <img src={shareImage} alt="share"/> */}
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