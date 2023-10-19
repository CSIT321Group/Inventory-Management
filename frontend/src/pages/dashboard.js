import React from 'react';
import './pageLayout.css';
import Widget from '../pages/widget/widget';
import Chart from '../pages/chart/Chart';
import Featured from './featured/Featured';
import Table from '../pages/table/Table';
import "../pages/dashboard.scss"
 
const Dashboard = () => {
    return (
        <div style={{fontSize: JSON.parse(localStorage.getItem('newSize'))}}>
			<div className='header'>
				<h1 style={{color: localStorage.getItem('fontColour')}}>Quick View</h1>
			</div>
			<div className="widgets">
				<div className="bestSeller"> <Widget type="BestSeller" /></div>
				<div className="lowStock"><Widget type="lowstock"/></div>
				<div className="inStock"><Widget type="instock"/></div>
				<div className="outOrder"><Widget type="out"/></div>
			</div>
			<div className="header">
				<h1 style={{color: localStorage.getItem('fontColour')}}> Sales<t>&nbsp;</t>Insight </h1>
			</div>
			<div className="charts">
				<Featured/>
				<Chart/>
			</div>
			<div className='header'>
				<h1 style={{color: localStorage.getItem('fontColour')}}>Daily Inventory Actions</h1>
			</div>
			<div className='content'>
				<Table/>
			</div>
       	</div>
    );
};
 
export default Dashboard;