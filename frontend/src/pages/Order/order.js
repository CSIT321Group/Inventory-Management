import React from "react";
// import Popup from './New_Order/new_order_popup';
// import SearchBar from "./searchbar";
import '../pageLayout.css';
import './order.css';
import * as FaIcons from 'react-icons/fa';
 
export default function Order() {
    // const [buttonPopup, setButtonPopup] = useState(false);
    // const [searchValue, setSearchValue] = useState("");
    // const [deliveryDateValue, setDeliveryDateValue] = useState("");
    // const [productValue, setProductValue] = useState("");
    // const [statusValue, setStatuseValue] = useState("");

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    // }
    
    return (
        <>
            <div>
                <div className="header">
                    <h1>Table Filters</h1>
                    <button className="button">
                        NEW ORDER &ensp;
                        <FaIcons.FaShare />
                    </button>
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

            <div className="header">
                <h1>Orders Table</h1>
            </div>
            <div className="content">
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
            </div>




            {/* <div style={{display:"flex", marginLeft:"200px", marginTop:"100px"}}>
                <h1 style={{marginLeft:"50px"}}>Table Filters</h1>
                <button style={{marginLeft:"auto", marginRight:"50px", width:"200px", height:'40px', borderRadius:"30px"}} onClick={() => setButtonPopup(true)}>
                NEW ORDER
                </button>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h1>Order Items</h1>
                    <div className='new-order-card'>
                        <p>This is the first card.</p>
                    </div>
                    <h1>Payment</h1>
                    <div className='new-order-card'>
                        <p>This is the second card.</p>
                    </div>
                </Popup>
            </div>
            <div style={{
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