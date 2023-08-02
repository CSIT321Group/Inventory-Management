import React from 'react';
import Widget from '../pages/widget/widget';
import Chart from '../pages/chart/Chart';
import Featured from '../components/featured/Featured';
import Table from '../pages/table/Table';
import "../pages/dashboard.scss"
 
const Dashboard = () => {
    return (
        <>
			<div className='headings'>
				<h1>Quick View</h1>
			</div>
			<div className="widgets">
				<div className="bestSeller"> <Widget type="BestSeller"/></div>
				<div className="lowStock"><Widget type="lowstock"/></div>
				<div className="inStock"><Widget type="instock"/></div>
				<div className="outOrder"><Widget type="out"/></div>
			</div>
			<div className="headings"><h1> Sales<t>&nbsp;</t>Insight </h1></div>
			<div className="charts">
				<Featured/>
				<Chart/>
			</div>
			<div className="listContainer">
				<div className="listTilte">Latest transactions</div>
				<Table/>
			</div>
       </>
       
    );
};
 
export default Dashboard;