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
    const [searchValue, setSearchValue] = useState("");
    const [deliveryDateValue, setDeliveryDateValue] = useState("");
    const [productValue, setProductValue] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const [orders, setOrders] = useState([]);
    const [stockCache, setStockCache] = useState([]); // NEW: Stock cache state
    const [objectDetails, setObjectDetails] = useState({
        stockId: '',
        supplierName: '',
        stock_name: '',
        stock_type: '',
        unit_price: '',
    });
    const [objectDetails2, setObjectDetails2] = useState({
        stockId2: '',
        supplierName2: '',
        stock_name2: '',
        stock_type2: '',
        unit_price2: '',
    });
    const [objectDetails3, setObjectDetails3] = useState({
        stockId3: '',
        supplierName3: '',
        stock_name3: '',
        stock_type3: '',
        unit_price3: '',
    });

    // NEW: Fetching stock cache
    useEffect(() => {
        const fetchAllStockItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/stock`);
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
                const response = await axios.get('http://localhost:8080/api/order');
                const data = response.data;
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
                // setObjectList(response.data);
                setOrders(modifiedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        if (stockCache.length) {
            fetchData();
        }
    }, [stockCache]);
    // Using the useState hook to create and manage state for the component
    const [data, setData] = useState([]); // To store fetched data
    const [selectedItem, setSelectedItem] = useState([]);
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
                setObjectList(updatedData) 
                // Updating the state with the fetched data
                setData(updatedData);
            } catch (error) {
                // Logging any errors during the fetch process
                console.error(`Error fetching Inven data: ${error}`);
            }
        };

        fetchData(); // Calling the fetchData function to initiate the fetch process
    }, [skuSearch, nameSearch]);  // useEffect's dependency array, ensures this useEffect runs whenever skuSearch or nameSearch values change
    
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
    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);

        const selectedObject = objectList.find((item1) => item1.stock_name === newValue);

        if (selectedObject) {
            setObjectDetails({
                stockId: selectedObject.stockId,
                supplierName: selectedObject.supplierName,
                stock_name: selectedObject.stock_name,
                stock_type: selectedObject.stock_type,
                unit_price: selectedObject.unit_price,
            });
        }
    };
    const [selectedValue2, setSelectedValue2] = useState('');
    const handleChange2 = (event) => {
        const newValue2 = event.target.value;
        setSelectedValue2(newValue2);

        const selectedObject2 = objectList.find((item2) => item2.stock_name === newValue2);

        if (selectedObject2) {
            setObjectDetails2({
                stockId2: selectedObject2.stockId,
                supplierName2: selectedObject2.supplierName,
                stock_name2: selectedObject2.stock_name,
                stock_type2: selectedObject2.stock_type,
                unit_price2: selectedObject2.unit_price,
            });
        }
    };
    const [selectedValue3, setSelectedValue3] = useState('');
    const handleChange3 = (event) => {
        const newValue3 = event.target.value;
        setSelectedValue3(newValue3);

        const selectedObject3 = objectList.find((item3) => item3.stock_name === newValue3);

        if (selectedObject3) {
            setObjectDetails3({
                stockId3: selectedObject3.stockId,
                supplierName3: selectedObject3.supplierName,
                stock_name3: selectedObject3.stock_name,
                stock_type3: selectedObject3.stock_type,
                unit_price3: selectedObject3.unit_price,
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
    //SUBMITTING NEW ORDER
    const handleSubmit = async (event) => {
        event.preventDefault();
        //Variables needed for the new order: status, order date, delivery date, order items: (stock: (stock ID, stock type) quantity)

        const order = {
            status: "PENDING",
            orderDate: new Date().toISOString().split('T')[0],
            deliveryDate: deliveryDateValue,
            orderItems: [
                {
                    stock: {
                        stockId: objectDetails.stockId, 
                        supplierName: objectDetails.supplierName,
                        stock_name: objectDetails.stock_name ,
                        unit_price: objectDetails.unit_price,
                        stock_type: objectDetails.stock_type,
                        quantity: (totalProdCost/objectDetails.unit_price),
                    }, 
                },
                {
                    stock: {
                        stockId: objectDetails2.stockId2, 
                        supplierName: objectDetails2.supplierName2,
                        stock_name: objectDetails2.stock_name2,
                        unit_price: objectDetails2.unit_price2,
                        stock_type: objectDetails2.stock_type2,
                        quantity: (totalProdCost2/objectDetails2.unit_price2),
                    }, 
                },
                {
                    stock: {
                        stockId: objectDetails3.stockId3, 
                        supplierName: objectDetails3.supplierName3,
                        stock_name: objectDetails3.stock_name3 ,
                        unit_price: objectDetails3.unit_price3,
                        stock_type: objectDetails3.stocj_type3,
                        quantity: (totalProdCost3/objectDetails3.unit_price3),
                    },  
                },
            ],
        };
        //Currently, new orders aren't submitting. Need to work out why
        try {
            const response = await axios.post('http://localhost:8080/api/order', order);
            console.log('Order submitted successfully', response.data);
        } catch (error) {
            console.error('There was an error submitting the order!', error);
            console.log(order);
        }
    };
   
    return (
        <>
            <div>
                {/*this is the new order popup*/}
                <div style={{display:"flex", marginLeft:"200px", marginTop:"80px", padding:"10px"}}>
                    <button style={{marginLeft:"auto", marginRight:"50px", width:"200px", borderRadius:"30px", color:"black"}} onClick={() => setButtonPopup(true)}>
                        NEW ORDER
                    </button>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <form>
                            <h1>Order Items</h1>
                            <div className='new-order-card'>
                                <table id="newOrderItemsTable" className='newOrderItemsTable'>
                                    <tr>
                                        <th>Product</th>
                                        <th>Supplier</th>
                                        <th>Quantity</th>
                                        <th>Cost Per Item</th>
                                        <th>Total</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select id="product" name="product" onChange={handleChange} value={selectedValue}>
                                                {data.map((item) => (
                                                    <option value={item.stock_name}> {item.stock_name}</option> 
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select id="supplier" name="supplier">
                                                <option type="text" value={objectDetails.supplierName}>{objectDetails.supplierName}</option>
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
                                            <><td>
                                                <select id="product" name="product2" onChange={handleChange2} value={selectedValue2}>
                                                    {data.map((item) => (
                                                        <option value={item.stock_name}> {item.stock_name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select id="supplier" name="supplier">
                                                    <option type="text" value={objectDetails2.supplierName2}>{objectDetails2.supplierName2}</option>
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
                                            <><td>
                                                <select id="product" name="product2" onChange={handleChange3} value={selectedValue3}>
                                                    {data.map((item) => (
                                                        <option value={item.stock_name}> {item.stock_name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select id="supplier" name="supplier">
                                                    <option type="text" value={objectDetails3.supplierName3}>{objectDetails3.supplierName3}</option>
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
                            <h1>Payment</h1>
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
                    <h1>Orders Filters</h1>
                </div>
                <div className="content">
                    <div>                        
                        <form action="">
                            <table>
                                <tr>
                                    <td className="filterOrder">
                                        <input style={{borderRadius:30}} type="text" placeholder="Search"/>
                                    </td>
                                    <td className="filterOrder">
                                        <h3>Delivery Date: &ensp;</h3>
                                        <input className="searchInput" type="text"/>
                                    </td>
                                    <td className="filterOrder">
                                        <h3>Product: &ensp;</h3>
                                        <input className="searchInput" type="text"/>
                                    </td>
                                    <td className="filterOrder">
                                        <h3>Status: &ensp;</h3>
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
            <div>
                <div className="header">
                    <h1>Orders Table</h1>
                </div>
                <div className="content">
                    <br/>
                    <TableContainer component={Paper} style={{ overflowX: 'hidden'}}>
                        <Table aria-label="collapsible table" className="orderTable" style={{ width: "97%"}}>
                            <TableHead>
                            <TableRow>
                                <TableCell className="small-cell" />
                                <TableCell>Order Num</TableCell>
                                <TableCell>Ordered Date</TableCell>
                                <TableCell>Delivery Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                <TableRow onClick={() => toggleRow(order.id)}>
                                    <TableCell className="smaller-cell"> 
                                    <IconButton size="small">
                                        {openRows.includes(order.id) ? (
                                        <KeyboardArrowUpIcon />
                                        ) : (
                                        <KeyboardArrowDownIcon />
                                        )}
                                    </IconButton>
                                    </TableCell >
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.orderDate}</TableCell>
                                    <TableCell>{order.deliveryDate}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={5}>
                                    <Collapse
                                        in={openRows.includes(order.id)}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <Box sx={{ margin: 2 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            Order Details
                                        </Typography>
                                        <Table size="normal" aria-label="purchases">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Product</TableCell>
                                                <TableCell>Supplier</TableCell>
                                                <TableCell>Quantity</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {order.orderItems.map((item) => (
                                                <TableRow key={item.id}>
                                                <TableCell>{item.stock.stock_name}</TableCell>
                                                <TableCell>{item.stock.supplierName}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
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
            {/*<div style={{
                    position:"absolute",
                    marginLeft:"220px",
                    marginRight:"100px",
                    width: "80%",
                    height: "250px",
                    borderRadius: "30px",
                    boxShadow: "0 4px 8px 8px rgba(0, 0, 0, 0.2)"
                }}>
                <div style={{display:"inline-flex"}}>
                    <SearchBar></SearchBar>
                    <h3 style={{marginLeft:"20px"}}>Delivery Date:</h3>
                    <input style={{width:"150px", height:"30px", marginTop:"10px"}}/>
                    <h3 style={{marginLeft:"20px"}}>Product:</h3>
                    <input style={{width:"150px", height:"30px", marginTop:"10px"}}/>
                    <h3 style={{marginLeft:"20px"}}>Status:</h3>
                    <input style={{width:"150px", height:"30px", marginTop:"10px"}}/>
                </div>
                <button className="apply-filters-btn" style={{display:"flex", textAlign:"center", width:"140px", height:"40px", position:"relative", right:"10px", bottom:"10px", top:"auto", left:"auto"}
            }>APPLY FILTER</button>
            </div>
                <h1>Orders Table</h1>
            <div style={{display:"flex", marginLeft:"200px", marginTop:"100px", border:"1px solid"}}>
                <table className="orderTable">
                    <tr>
                        <th>Order Num</th>
                        <th>Delivery Date</th>
                        <th>Product</th>
                        <th>Supplier</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>123456789</td>
                        <td>DD/MM/YYYY</td>
                        <td>XXXXXXXX</td>
                        <td>XXXXXXXX</td>
                        <td>16</td>
                        <td>OPEN</td>
                    </tr>
                    <tr>
                        <td>4004008</td>
                        <td>DD/MM/YYYY</td>
                        <td>XXXXXXXX</td>
                        <td>XXXXXXXX</td>
                        <td>32</td>
                        <td>OPEN</td>
                    </tr>
                </table>
            </div> */
            }
        </>
    );
};
