/* eslint-disable eqeqeq */
import SearchBar from "./searchbar";
import '../pageLayout.css';
import './order.css';
import React, { useState, useEffect } from 'react';
import Popup from './New_Order/new_order_popup';
import axios from 'axios';

import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Order() {
    
    const [buttonPopup, setButtonPopup] = useState(false);
    const [orders, setOrders] = useState([]);
    const [stockCache, setStockCache] = useState([]); // NEW: Stock cache state
    // Using the useState hook to create and manage state for the component
    const [data, setData] = useState([]); // To store fetched data
    const [selectedItem, setSelectedItem] = useState([]);
    const [skuSearch, setSkuSearch] = useState(''); // SKU search string
    const [nameSearch, setNameSearch] = useState(''); // Name search string
    const [objectDetails, setObjectDetails] = useState({
        stockId: 0,
        supplierName: "",
        stock_name: "",
        stock_type: "",
        stockType: "",
        unit_price: 0.0,
    });
    const [objectDetails2, setObjectDetails2] = useState({
        stockId2: 0,
        supplierName2: "",
        stock_name2: "",
        stock_type2: "",
        stockType2: "",
        unit_price2: 0.0,
    });
    const [objectDetails3, setObjectDetails3] = useState({
        stockId3: 0,
        supplierName3: "",
        stock_name3: "",
        stock_type3: "",
        stockType3: "",
        unit_price3: 0.0,
    });

    // NEW: Fetching stock cache
    useEffect(() => {
        const fetchAllStockItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/stock`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
            });
                const data = await response.json();
                setStockCache(data);
            } catch (error) {
                console.error(`Error fetching stock items: ${error}`);
            }
        };

        fetchAllStockItems();
    }, []);

    const [objectList, setObjectList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/order`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                const data = await response.json();
                // const allOrders = data.map(order2 => {
                //        setObjectList(order2) 
                //        console.log(order2);
                                                           
                // });
                const modifiedOrders = data.map(order => {
                    // Deep cloning the order
                    const clonedOrder = { ...order };
                    
                    clonedOrder.orderItems = clonedOrder.orderItems.map(item => {
                        const cachedItem = stockCache.find(stock => stock.stockId === item.stock.stockId);

                        if (cachedItem) {
                            item.stock.stock_name = cachedItem.stock_name;
                            item.stock.supplierName = cachedItem.supplierName;
                        }

                        return item;
                    });

                    return clonedOrder;
                });
                setOrders(modifiedOrders);
                console.log(modifiedOrders)
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        if (stockCache.length) {
            fetchData();
        }
    }, [stockCache]);

    useEffect(() => {
        const fetchData = async () => {  // Defining an async function to fetch data from the API
            // Setting a default endpoint URL
            let endpoint = `http://localhost:8080/api/stock`;

            // If either skuSearch or nameSearch has a value, we modify the endpoint to search with that value
            // if (skuSearch || nameSearch) {
            //     const search = `${skuSearch}${nameSearch}`;
            //     endpoint = `http://localhost:8080/api/stock/search/${search}`;
            // }

            try {
                // Making an asynchronous GET request to the endpoint
                const response = await axios.get(endpoint, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                // Mapping the response data to add/update some fields before setting the state
                const updatedData = response.data.map(item => {
                    return {
                        ...item,
                        stockId: item.stockId,
                        supplierName: item.supplierName,
                        stock_name: item.stock_name,
                        stock_type: item.stock_type,
                        stockType: item.stockType,
                        unit_price: item.unit_price
                    };
                });
                setObjectList(updatedData) 
                // Updating the state with the fetched data
                setData(updatedData);
            } catch (error) {
                // Logging any errors during the fetch process
                console.error(`Error fetching Inven data: ${error}`);
            }
        };

        fetchData(); // Calling the fetchData function to initiate the fetch process
    }, [skuSearch, nameSearch]);

    // Used for adding another new item to a new order State to show/hide accordion
    const [show, setShow] = useState(false);
    const handleOpen = () => {
        setShow(!show); // Toggle accordion
    };
    const [show2, setShow2] = useState(false);
    const handleOpen2 = () => {
        setShow2(!show2); // Toggle accordion
    };
    const [show3, setShow3] = useState(false);
    const handleOpen3 = () => {
        setShow3(!show3); // Toggle accordion
    };

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const handleChange = (event) => {
        const newValue = event.target.value;
        console.log(newValue);
        setSelectedValue(newValue);

        const selectedObject = objectList.find((item1) => item1.stock_name === newValue);

        if (selectedObject) {
            setObjectDetails({
                stockId: selectedObject.stockId,
                supplierName: selectedObject.supplierName,
                stock_name: selectedObject.stock_name,
                stock_type: selectedObject.stock_type,
                stockType: selectedObject.stockType,
                unit_price: selectedObject.unit_price
            });
        }
    };
    const [selectedValue2, setSelectedValue2] = useState('');
    const handleChange2 = (event) => {
        const newValue2 = event.target.value;
        setSelectedValue2(newValue2);

        const selectedObject2 = objectList.find((item2) => item2.stock_name == newValue2);

        if (selectedObject2) {
            setObjectDetails2({
                stockId2: selectedObject2.stockId,
                supplierName2: selectedObject2.supplierName,
                stock_name2: selectedObject2.stock_name,
                stock_type2: selectedObject2.stock_type,
                stockType2: selectedObject2.stockType,
                unit_price2: selectedObject2.unit_price
            });
        }
    };
    const [selectedValue3, setSelectedValue3] = useState('');
    const handleChange3 = (event) => {
        const newValue3 = event.target.value;
        setSelectedValue3(newValue3);

        const selectedObject3 = objectList.find((item3) => item3.stock_name == newValue3);

        if (selectedObject3) {
            setObjectDetails3({
                stockId3: selectedObject3.stockId,
                supplierName3: selectedObject3.supplierName,
                stock_name3: selectedObject3.stock_name,
                stock_type3: selectedObject3.stock_type,
                stockType3: selectedObject3.stockType,
                unit_price3: selectedObject3.unit_price
            });
        }
    };
    //calculates the cost of the 1st item
    const [totalProdCost, setTotalProdCost] = useState('');
    const handleCost = (event) => {
        const newQuantityValue = event.target.value;
        const total = (newQuantityValue * objectDetails.unit_price);
        const roundedTotal = Math.round(total*100)/100;
        setTotalProdCost(roundedTotal);
    }
    //calculates the cost of the 2nd item
    const [totalProdCost2, setTotalProdCost2] = useState('');
    const handleCost2 = (event) => {
        const newQuantityValue = event.target.value;
        const total = (newQuantityValue * objectDetails2.unit_price2);
        const roundedTotal = Math.round(total*100)/100;
        setTotalProdCost2(roundedTotal);
    }
    //calculates the cost of the 3rd item
    const [totalProdCost3, setTotalProdCost3] = useState('');
    const handleCost3 = (event) => {
        const newQuantityValue = event.target.value;
        const total = (newQuantityValue * objectDetails3.unit_price3);
        const roundedTotal = Math.round(total*100)/100;
        setTotalProdCost3(roundedTotal);
    }
    const [totalProdSum, setTotalProdSum] = useState('');
    const [totalOrderCost, setTotalOrderCost] = useState('');
    const calculateButtonClick = (event) => {
        //stops this button from submitting the order
        event.preventDefault();
        const prodTotal = totalProdCost + totalProdCost2 + totalProdCost3;
        const roundedTotal = Math.round(prodTotal*100)/100;
        setTotalProdSum(roundedTotal);
        const orderTotal = prodTotal + 30;
        const orderTotalRounded = Math.round(orderTotal*100)/100;
        setTotalOrderCost(orderTotalRounded);
    }
    const [openRows, setOpenRows] = React.useState([]);
      
    const toggleRow = (orderId) => {
        if (openRows.includes(orderId)) {
            setOpenRows(openRows.filter((id) => id !== orderId));
        } else {
            setOpenRows([...openRows, orderId]);
        }
    };
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    deliveryDate = deliveryDate.toISOString().split('T')[0];
    
    //SUBMITTING NEW ORDER
    const handleSubmit = async (event) => {
        const quantity1 = Math.round(totalProdCost / objectDetails.unit_price);
        console.log(quantity1);
        const quantity2 = Math.round(totalProdCost2 / objectDetails2.unit_price2);
        console.log(quantity2);
        const quantity3 = Math.round(totalProdCost3 / objectDetails3.unit_price3);
        console.log(quantity3);
        //Variables needed for the new order: status, order date, delivery date, order items: (stock: (stock ID, stock type) quantity)
        console.log(objectDetails.stockType, objectDetails2.stockType2, objectDetails3.stockType3)
        const order = {
            status: "PENDING",
            deliveryDate: deliveryDate,
            internalOrder: false,
            orderDate: new Date().toISOString().split('T')[0],            
            orderItems: [
                {                  
                    quantity: quantity1,
                    stock: {
                        stockId: objectDetails.stockId,
                        stock_name: objectDetails.stock_name,
                        supplierName: objectDetails.supplierName,
                        stock_type: objectDetails.stock_type,
                        stockType: objectDetails.stockType,
                    },
                    unitPrice: objectDetails.unit_price,
                },
                {
                    quantity: quantity2,           
                    stock: {
                        stockId: objectDetails2.stockId2,
                        stock_name: objectDetails2.stock_name2,
                        supplierName: objectDetails2.supplierName2,
                        stock_type: objectDetails2.stock_type2,
                        stockType: objectDetails2.stockType2,
                    },
                    unitPrice: objectDetails2.unit_price2,
                },
                {
                    quantity: quantity3,                
                    stock: {
                        stockId: objectDetails3.stockId3,
                        stock_name: objectDetails3.stock_name3,
                        supplierName: objectDetails3.supplierName3,
                        stock_type: objectDetails3.stock_type3,
                        stockType: objectDetails3.stockType3,
                    },
                    unitPrice: objectDetails3.unit_price3,
                },
            ],
        };
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post('http://localhost:8080/api/order', order, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Order submitted successfully', response.data);
            window.alert("Your order was submitted successfully!" + order);
        } catch (error) {
            console.error('There was an error submitting the order!', error);
            console.log(order);
            window.alert("There was an error in submitting your order, please try again or contact your system admin" + error)
        }
    }

        return (
        <>
            <div style={{fontSize: JSON.parse(localStorage.getItem('newSize')), zoom: JSON.parse(localStorage.getItem('zoom')), fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour'), backgroundColor: localStorage.getItem('backgroundColour')}}>
                {/*this is the new order popup*/}
                <div style={{display:"flex", marginLeft:"200px", marginTop:"50px", padding:"10px", }}>
                    <button style={{marginLeft:"auto", marginRight:"50px", width:"200px", borderRadius:"30px", color:"black"}} onClick={() => setButtonPopup(true)}>
                        NEW ORDER
                    </button>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <form>
                            <h1 style={{color: localStorage.getItem('fontColour')}}>Order Items</h1>
                            <div className='new-order-card'>
                                <table id="newOrderItemsTable" className='newOrderItemsTable'>
                                    <tr>
                                        <th>Stock ID</th>
                                        <th>Product</th>
                                        <th>Supplier</th>
                                        <th>Quantity</th>
                                        <th>Cost Per Item</th>
                                        <th>Total</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select>
                                                <option type="number">{objectDetails.stockId}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select id="product" name="product" onChange={handleChange} value={selectedValue}>
                                                {data.map((item) => (
                                                    <option>{item.stock_name}</option> 
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select id="supplier" name="supplier">
                                                <option type="text">{objectDetails.supplierName}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" name='quantity' onChange={handleCost} ></input>
                                        </td>
                                        <td>
                                            <p>${objectDetails.unit_price}</p>
                                        </td>
                                        <td>
                                            <p>${totalProdCost}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <div className="accordian-order">
                                                <div className="accordian-header-order" onClick={handleOpen}>
                                                    <div>Add Another Item</div>
                                                    <div className="sign">{show ? '-' : '+'}</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        {show && (
                                            <>
                                            <td>
                                                <select>
                                                    <option type="number">{objectDetails2.stockId2}</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select id="product" name="product2" onChange={handleChange2} value={selectedValue2}>
                                                    {data.map((item) => (
                                                        <option>{item.stock_name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select id="supplier" name="supplier">
                                                    <option type="text">{objectDetails2.supplierName2}</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="number" name='quantity' onChange={handleCost2} ></input>
                                            </td>
                                            <td>
                                                <p>${objectDetails2.unit_price2}</p>
                                            </td>
                                            <td>
                                                <p>${totalProdCost2}</p>
                                            </td></>
                                        )}
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <div className="accordian-order">
                                                <div className="accordian-header-order" onClick={handleOpen2}>
                                                    <div>Add Another Item</div>
                                                    <div className="sign">{show2 ? '-' : '+'}</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        {show2 && (
                                            <>
                                            <td>
                                                <select>
                                                    <option type="number">{objectDetails3.stockId3}</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select id="product" name="product2" onChange={handleChange3} value={selectedValue3}>
                                                    {data.map((item) => (
                                                        <option>{item.stock_name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select id="supplier" name="supplier">
                                                    <option type="text">{objectDetails3.supplierName3}</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="number" name='quantity' onChange={handleCost3} ></input>
                                            </td>
                                            <td>
                                                <p>${objectDetails3.unit_price3}</p>
                                            </td>
                                            <td>
                                                <p>${totalProdCost3}</p>
                                            </td></>
                                        )}
                                    </tr>                                            
                                </table>
                            </div>
                            <h1 style={{color: localStorage.getItem('fontColour')}}>Payment</h1>
                            <div className='new-order-card'>
                                <table className='newOrderPaymentTable'>
                                    <tr>
                                        <th>Account Details</th>
                                        <th>Order Payment Details</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="accName">Account Name: </label>
                                            <input style={{transform: "none"}} type="text" name='accName' value="Stockor Ordering"></input>
                                        </td>
                                        <td>
                                            <label htmlFor="prodTotal">Product Total:</label>
                                            <p>${totalProdSum}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="accBSB">Account BSB: </label>
                                            <input style={{transform: "none"}} type="text" name='accBSB' value='714-312'></input>
                                        </td>
                                        <td>
                                            <label htmlFor="shipCost">Shipping Cost: $</label>
                                            <input style={{transform: "none"}} type="text" name='shipCost' value='30.00'></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="accNum">Account Number: </label>
                                            <input style={{transform: "none"}} type="text" name='accNum' value='721012'></input>
                                        </td>
                                        <td>
                                            <label htmlFor="totalOrder">Total Order Cost:</label>
                                            <p>${totalOrderCost}</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <br/>
                            <div className="popupButtons">
                                <button className='calculateButton' onClick={calculateButtonClick}>Calculate Cost</button>
                                &nbsp;&nbsp;&nbsp;
                                <button className='calculateButton' onClick={handleSubmit}>Submit Order</button>
                            </div>
                        </form>
                    </Popup>
                </div>
                <div className="tableHeader">
                    <h1 style={{color: localStorage.getItem('fontColour')}}>Orders Filters</h1>
                </div>
                <div className="content">
                    <div>                        
                        <form action="">
                            <table>
                                <tr>
                                    <td className="filterOrder">
                                        <input style={{borderRadius:30}} type="text" placeholder="Search" value={skuSearch} onChange={(e) => setSkuSearch(e.target.value)}/>
                                    </td>
                                    <td className="filterOrder">
                                        <h3 style={{color: localStorage.getItem('fontColour')}}>Delivery Date: &ensp;</h3>
                                        <input className="searchInput" type="text"/>
                                    </td>
                                    <td className="filterOrder">
                                        <h3 style={{color: localStorage.getItem('fontColour')}}>Product: &ensp;</h3>
                                        <input className="searchInput" type="text"/>
                                    </td>
                                    <td className="filterOrder">
                                        <h3 style={{color: localStorage.getItem('fontColour')}}>Status: &ensp;</h3>
                                        <input className="searchInput" type="text"/>
                                    </td>
                                </tr>
                                <tr className="filterOrderButton">
                                    <button className="applyButton">APPLY FILTERS</button>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{fontSize: JSON.parse(localStorage.getItem('newSize')), zoom: JSON.parse(localStorage.getItem('zoom')), color: localStorage.getItem('fontColour'), backgroundColor: localStorage.getItem('backgroundColour')}}>
                <div className="header">
                    <h1 style={{color: localStorage.getItem('fontColour')}}>Orders Table</h1>
                </div>
                <div className="content">
                    <br/>
                    <TableContainer component={Paper} style={{ overflowX: 'hidden', fontSize: JSON.parse(localStorage.getItem('newSize')), color: localStorage.getItem('fontColour'), backgroundColor: localStorage.getItem('backgroundColour')}}>
                        <Table aria-label="collapsible table" className="orderTable" style={{ width: "97%", fontSize: JSON.parse(localStorage.getItem('newSize')), color: localStorage.getItem('fontColour'), backgroundColor: localStorage.getItem('backgroundColour')}}>
                            <TableHead>
                            <TableRow>
                                <TableCell className="small-cell" style={{color: localStorage.getItem('fontColour')}}/>
                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>Order Num</TableCell>
                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>Ordered Date</TableCell>
                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>Delivery Date</TableCell>
                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>Status</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                <TableRow onClick={() => toggleRow(order.id)}>
                                    <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}} className="smaller-cell"> 
                                    <IconButton size="small" style={{color: localStorage.getItem('fontColour')}}>
                                        {openRows.includes(order.id) ? (
                                        <KeyboardArrowUpIcon />
                                        ) : (
                                        <KeyboardArrowDownIcon />
                                        )}
                                    </IconButton>
                                    </TableCell >
                                    <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>{order.id || "Placeholder"}</TableCell>
                                    <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>{order.orderDate}</TableCell>
                                    <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>{order.deliveryDate}</TableCell>
                                    <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>{order.status}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={5}>
                                    <Collapse
                                        in={openRows.includes(order.id)}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <Box sx={{ margin: 2 }}>
                                        <Typography variant="h6" gutterBottom component="div" style={{color: localStorage.getItem('fontColour')}}>
                                            Order Details
                                        </Typography>
                                        <Table size="normal" aria-label="purchases">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>Product</TableCell>
                                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>Supplier</TableCell>
                                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>Quantity</TableCell>
                                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>Total Cost</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {order.orderItems.map((item) => (
                                                <TableRow key={item.id}>
                                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>{item.stock.stock_name}</TableCell>
                                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>{item.stock.supplierName}</TableCell>
                                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>{item.quantity}</TableCell>
                                                <TableCell style={{fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour')}}>{`$${(item.unitPrice * item.quantity).toFixed(2)}`}</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                        </Box>
                                    </Collapse>
                                    </TableCell>
                                </TableRow>
                                </React.Fragment>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};
