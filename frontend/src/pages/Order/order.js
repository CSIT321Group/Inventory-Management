import SearchBar from "./searchbar";
import '../pageLayout.css';
import * as FaIcons from 'react-icons/fa';
import './order.css';
import React, { useState, useEffect } from 'react';
import Popup from './New_Order/new_order_popup';
import axios from 'axios';




export default function Order() {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [deliveryDateValue, setDeliveryDateValue] = useState("");
    const [productValue, setProductValue] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const [orders, setOrders] = useState([]);
    const [stockCache, setStockCache] = useState([]); // NEW: Stock cache state

    const handleSubmit = (event) => {
        event.preventDefault();
    };

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/order');
                const data = response.data;

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
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        if (stockCache.length) {
            fetchData();
        }
    }, [stockCache]);


    return (
        <>
            <div>
                <div style={{display:"flex", marginLeft:"200px", marginTop:"80px", padding:"10px"}}>
                    <button style={{marginLeft:"auto", marginRight:"50px", width:"200px", borderRadius:"30px"}} onClick={() => setButtonPopup(true)}>
                        NEW ORDER
                    </button>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <form>
                            <h1>Order Items</h1>
                            <div className='new-order-card'>
                                <table className='newOrderItemsTable'>
                                    <tr>
                                        <th>Product</th>
                                        <th>Supplier</th>
                                        <th>Quantity</th>
                                        <th>Cost Per Item</th>
                                        <th>Total</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select id="product" name="product">
                                                <option value="prod1">Prod1</option>
                                                <option value="prod2">Prod2</option>
                                                <option value="prod3">Prod3</option>
                                                <option value="prod4">Prod4</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select id="product" name="product">
                                                <option value="prod1">Prod1</option>
                                                <option value="prod2">Prod2</option>
                                                <option value="prod3">Prod3</option>
                                                <option value="prod4">Prod4</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" name='quantity'></input>
                                        </td>
                                        <td>
                                            <p>$$$/per unit</p>
                                        </td>
                                        <td>
                                            <p>$$$</p>
                                        </td>
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
                                            <label htmlFor="accName">Account Name:</label>
                                            <input type="text" name='accName'></input>
                                        </td>
                                        <td>
                                            <label htmlFor="prodTotal">Product Total:</label>
                                            <p>$$$</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="accBSB">Account BSB:</label>
                                            <input type="text" name='accBSB'></input>
                                        </td>
                                        <td>
                                            <label htmlFor="shipCost">Shipping Cost:</label>
                                            <p>$$$</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="accNum">Account Number:</label>
                                            <input type="text" name='accNum'></input>
                                        </td>
                                        <td>
                                            <label htmlFor="totalOrder">Total Order Cost:</label>
                                            <p>$$$</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <br/>
                            <input className='newOrderSubmit' type="submit"></input>
                        </form>
                    </Popup>
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

            return (
            <div>
                <div className="header">
                    <h1>Orders Table</h1>
                </div>
                <div className="content">
                    <table className="orderTable">
                        <thead>
                        <tr>
                            <th>Order Num</th>
                            <th>Delivery Date</th>
                            <th>Product</th>
                            <th>Supplier</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order =>
                            order.orderItems.map(item => (
                                <tr key={item.id}>
                                    <td>{order.id}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{item.stock.stock_name}</td>
                                    <td>{item.stock.supplierName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
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
        </div> */}
        </>
    );
};
