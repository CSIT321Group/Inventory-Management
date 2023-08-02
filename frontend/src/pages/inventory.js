import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pageLayout.css';
import './inventory.css';

const Inventory = () => {
    const [data, setData] = useState([]);
    const [skuSearch, setSkuSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            let endpoint = `http://localhost:8080/api/stock`;

            if(skuSearch || nameSearch){
                const search = `${skuSearch}${nameSearch}`;
                endpoint = `http://localhost:8080/api/stock/search/${search}`;
            }

            try {
                const response = await axios.get(endpoint);
                const updatedData = response.data.map(item => {
                    return {...item,
                        stockRoom: item.stockRoom || "Placeholder",
                        supplier: item.supplier || "Placeholder",
                        totalValue: `$${item.unit_price * item.stock_quantity}`};
                });
                setData(updatedData);
            } catch(error) {
                console.error(`Error fetching data: ${error}`);
            }
        };

        fetchData();
    }, [skuSearch, nameSearch]);

    const handleFilterClick = () => {
        // triggers re-fetch of data with updated search strings
        setData([]);
    };

    return (
        <>
            <div className='header'>
                <h1>Table Filters</h1>
            </div>
            <div className='content'>
                <table>
                    <tr className='filterRow'>
                        <h3>SKU: &ensp;</h3>
                        <input type='text' value={skuSearch} onChange={(e) => setSkuSearch(e.target.value)} />
                        <h3>Category: &ensp;</h3>
                        <input type='text' />
                        <h3>Supplier: &ensp;</h3>
                        <input type='text' />
                    </tr>
                    <tr className='filterRow'>
                        <h3>Name: &ensp;</h3>
                        <input type='text' value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} />
                        <h3>Last Update: &ensp;</h3>
                        <input type='text' />
                        <h3>Location: &ensp;</h3>
                        <input type='text' />
                    </tr>
                    <tr className='rowButton'>
                        <button className='applyFilterButton' onClick={handleFilterClick}>APPLY FILTERS</button>
                    </tr>
                </table>
            </div>
            <div className='header'>
                <h1>Inventory Table</h1>
            </div>
            <div className='content'>
                {data.length > 0 && (
                    <div>
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
                            {data.map((item) => (
                                <tr>
                                    <td>{item.id || "Placeholder"}</td>
                                    <td>{item.stock_name || "Placeholder"}</td>
                                    <td>Placeholder</td>
                                    <td>{item.supplier}</td>
                                    <td>{item.stockRoom}</td>
                                    <td>Placeholder</td>
                                    <td>{item.stock_quantity}</td>
                                    <td>{`$${item.unit_price}`}</td>
                                    <td>{item.totalValue}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default Inventory;
