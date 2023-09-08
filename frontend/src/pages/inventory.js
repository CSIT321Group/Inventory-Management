import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pageLayout.css';
import './inventory.css';

// Defining a functional component named 'Inventory'
const Inventory = () => {
    // Using the useState hook to create and manage state for the component
    const [data, setData] = useState([]); // To store fetched data
    const [skuSearch, setSkuSearch] = useState(''); // SKU search string
    const [nameSearch, setNameSearch] = useState(''); // Name search string

    // useEffect hook runs side-effects in functional components, similar to componentDidMount and componentDidUpdate combined in class components
    useEffect(() => {
        const fetchData = async () => {  // Defining an async function to fetch data from the API
            // Setting a default endpoint URL
            let endpoint = `http://localhost:8080/api/stock`;

            // If either skuSearch or nameSearch has a value, we modify the endpoint to search with that value
            if (skuSearch || nameSearch) {
                const search = `${skuSearch}${nameSearch}`;
                endpoint = `http://localhost:8080/api/stock/search/${search}`;
            }

            try {
                // Making an asynchronous GET request to the endpoint
                const response = await axios.get(endpoint);
                // Mapping the response data to add/update some fields before setting the state
                const updatedData = response.data.map(item => {
                    return {
                        ...item,
                        stockRoom: item.stockRoom || "Placeholder",
                        supplier: item.supplierName || "Placeholder",
                        totalValue: `$${item.unit_price * item.stock_quantity}`
                    };
                });
                // Updating the state with the fetched data
                setData(updatedData);
            } catch (error) {
                // Logging any errors during the fetch process
                console.error(`Error fetching data: ${error}`);
            }
        };

        fetchData(); // Calling the fetchData function to initiate the fetch process
    }, [skuSearch, nameSearch]);  // useEffect's dependency array, ensures this useEffect runs whenever skuSearch or nameSearch values change

    // Handler function to clear current data and initiate a new fetch (which happens automatically due to useEffect's dependency array)
    const handleFilterClick = () => {
        // triggers re-fetch of data with updated search strings
        setData([]);
    };

    const formatStockType = (type) => {
        // Split the string by underscores, capitalize the first letter of each word, and join them with spaces.
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // JSX to render the component
    return (
        <>
            <div className='header'>
                <h1>Table Filters</h1>
            </div>
            <div className='content'>
                <table className='inventoryFilterTable'>
                    <tr className='filterRow'>
                        <div className='filterRowDiv'>
                            <h3>SKU: &ensp;</h3>
                            <input type='text' value={skuSearch} onChange={(e) => setSkuSearch(e.target.value)} />
                        </div>
                        <div className='filterRowDiv'>
                            <h3>Category: &ensp;</h3>
                            <input type='text' />
                        </div>
                        <div  className='filterRowDiv'>
                            <h3>Supplier: &ensp;</h3>
                            <input type='text' />
                        </div>
                    </tr>
                    <tr className='filterRow'>
                        <div className='filterRowDiv'>
                            <h3>Name: &ensp;</h3>
                            <input type='text' value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} />
                        </div>
                        <div className='filterRowDiv'>
                            <h3>Last Update: &ensp;</h3>
                            <input type='text' />
                        </div>
                        <div className='filterRowDiv'>
                            <h3>Location: &ensp;</h3>
                            <input type='text' />
                        </div>
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
                            {data.map((item) => (// We use the map function to iterate over the data array and render a table row for each item
                                // We use the item's id as the key for each row
                                // We use the item's fields to populate the table cells
                                <tr>
                                    <td>{item.stockId || "Placeholder"}</td>
                                    <td>{item.stock_name || "Placeholder"}</td>
                                    <td>{formatStockType(item.stock_type)}</td>
                                    <td>{item.supplierName}</td>
                                    <td>{item.location}</td>
                                    <td>"Placeholder"</td>
                                    <td>{item.stock_quantity}</td>
                                    <td>{`$${item.unit_price.toFixed(2)}`}</td>
                                    <td>{`$${(item.unit_price * item.stock_quantity).toFixed(2)}`}</td>
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
