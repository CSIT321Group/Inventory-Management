import React from 'react';
import './pageLayout.css';
import Widget from '../pages/widget/widget';
import Chart from '../pages/chart/Chart';
import Featured from './featured/Featured';
import Table from '../pages/table/Table';
import "../pages/dashboard.scss"
 
const Dashboard = () => {
    return (
        <>
			<div className='header'>
				<h1>Quick View</h1>
			</div>
			<div className="widgets">
				<div className="bestSeller"> <Widget type="BestSeller"/></div>
				<div className="lowStock"><Widget type="lowstock"/></div>
				<div className="inStock"><Widget type="instock"/></div>
				<div className="outOrder"><Widget type="out"/></div>
			</div>
			<div className="header">
				<h1> Sales<t>&nbsp;</t>Insight </h1>
			</div>
			<div className="charts">
				<Featured/>
				<Chart/>
			</div>
			<div className='header'>
				<h1>Daily Inventory Actions</h1>
			</div>
			<div className='content'>
				<Table/>
				<table>
					<tr>
						<th>No.</th>
						<th>Product Name</th>
						<th>Amount</th>
						<th>Employee Number</th>
						<th>Timestamp</th>
						<th>Action</th>
					</tr>
				</table>
			</div>
       </>
       
    );
};
 
export default Dashboard;