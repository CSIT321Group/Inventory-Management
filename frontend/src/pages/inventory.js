import React from 'react';
import './inventory.css';
 
const Inventory = () => {
    return (
        <>
            <h1>Table Filters</h1>
            <div className='component'>
                <table>
                    <tr className='filterRow'>
                        <h3>SKU: &ensp;</h3>
                        <input type='text' />
                        <h3>Category: &ensp;</h3>
                        <input type='text' />
                        <h3> Supplier: &ensp;</h3>
                        <input type='text' />
                    </tr>
                    <tr className='filterRow'>
                        <h3>Name: &ensp;</h3>
                        <input type='text' />
                        <h3>Last Update: &ensp;</h3>
                        <input type='text' />
                        <h3> Location: &ensp;</h3>
                        <input type='text' />
                    </tr>
                </table>
            </div>
            <button className='applyFilterButton'>APPLY FILTERS</button>
            <h1>Inventory Table</h1>
            <div className='component'>
                <table className='inventoryTable'>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Supplier</th>
                        <th>Location</th>
                        <th>Last Update</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Value</th>
                    </tr>
                    <tr>
                        <td>FHJH47U</td>
                        <td>Water Tap</td>
                        <td>Taps</td>
                        <td>Blues Inc</td>
                        <td>A5 - 78U</td>
                        <td>10am 25/05/2023</td>
                        <td>24</td>
                        <td>$65</td>
                        <td>$1560</td>
                    </tr>
                </table>
            </div>
        </>
    );
};
 
export default Inventory;