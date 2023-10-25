import React, { useState, useEffect } from 'react';
import './pageLayout.css';
import './reporting.css';
import { Doughnut, Bar } from 'react-chartjs-2';
import DropDown from './DropDownReport';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

// import { Accordion, AccordionDetails, AccordionSummary, Typography }from '@mui/material';
// import { alignPropType } from 'react-bootstrap/esm/types';
// import { AlignHorizontalCenterSharp } from '@mui/icons-material';
import axios from 'axios';
import { AlignHorizontalLeft } from '@mui/icons-material';
const Reporting = () => {
	Chart.register(
		ArcElement,
		BarElement,
		CategoryScale,
		LinearScale
		);

	const [reportName, setReportName] = useState('');
	const [skuSearch, setSkuSearch] = useState('');
	const [nameSearch, setNameSearch] = useState('');
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showCharts, setShowCharts] = useState(false);
	// const [showAnotherItem, setShowAnotherItem] = useState(false);
	// const [additionalItemsCount, setAdditionalItemsCount] = useState(1);

	// const toggleAnotherItem = () => {
	// 	if(additionalItemsCount < 5) {
	// 		setShowAnotherItem(true);
	// 		setAdditionalItemsCount((count) => count++);
	// 	}
	// };

	// const removeAdditionalItem = () => {
	// 	if (additionalItemsCount > 1){ 
	// 		setAdditionalItemsCount((count) => count--);
	// 	} else {
	// 		setShowAnotherItem(false);
	// 	}
	// }

	useEffect(() => {
		const fetchData = async () => {
			let endpoint = `http://localhost:8080/api/stock`;

			if (skuSearch || nameSearch) {
				const search = `${skuSearch}${nameSearch}`;
				endpoint = `http://localhost:8080/api/stock/search/${search}`;
			}
			
			try {
				const response = await axios.get(endpoint, {
				  headers: {
					'Authorization': `Bearer ${localStorage.getItem('jwt')}`
				  }
				});
		
				const formattedData = response.data.map(item => ({
					...item,
				  	label: item.stock_name,
				  	quantity: item.stock_quantity
				}));
		
				setData(formattedData);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [skuSearch, nameSearch]);

	const handleFilterClick = () => {
		setData([]);
		setLoading(false);
		setShowCharts(true);
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Doghnut Chart',
			},
		},
		maxWidth: 200,
		maxHeight: 100,
	};

	const doughnutChartData = {
		labels: data.map(item => item.stock_name),
		datasets: [{
		label: 'Quantity',
		data: data.map(item => item.stock_quantity),
		backgroundColor: [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
		  ],
		  borderColor: [
			'rgba(255, 99, 132, 1)',
			'rgba(54, 162, 235, 1)',
			'rgba(255, 206, 86, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
		  ],
		  borderWidth: 1,
		}],
	};

	const barChartData = {
		labels: data.map(item => item.stock_name),
		datasets: [{
			label: 'Quantity',
			data: data.map(item => item.stock_quantity),
			backgroundColor: 'rgba(75, 192, 192, 0.2)',
			borderColor: 'rgba(75, 192, 192, 1)',
			borderWidth: 1,
		}],
	};

	return (
		<div style={{zoom: JSON.parse(localStorage.getItem('zoom')),fontSize: JSON.parse(localStorage.getItem('newSize'))}}>
			<br/><br/>
			<div className='header'>
				<h1 style={{color: localStorage.getItem('fontColour')}}>Report Filters</h1>
				<button onClick= {handleFilterClick} className='button'> GENERATE REPORT </button>
			</div>
			<div className='content'>
				<table>
					<tr>
						<td className='filterData'>
							<h3 style={{color: localStorage.getItem('fontColour')}}>Report Type</h3>
							<DropDown/>
						</td>
						<td className='filterData'>
							<h3 style={{color: localStorage.getItem('fontColour')}}>Report Name</h3>
							<input type='text' placeholder='General Report...' value={reportName} onChange={(e) => setReportName(e.target.value)}/>
						</td>
					</tr>
					<br/>
					<tr className='filterRows'>
						<h3 style={{color: localStorage.getItem('fontColour')}}>SKU: &ensp;</h3>
						<input type='text' value={skuSearch} onChange={(e) => setSkuSearch(e.target.value)}/>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Category: &ensp;</h3>
						<input type='text'/>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Supplier: &ensp;</h3>
						<input type='text'/>
					</tr>
					<tr className='filterRows'>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Name: &ensp;</h3>
						<input type='text' value={nameSearch} onChange={(e) => setNameSearch(e.target.value)}/>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Order ID: &ensp;</h3>
						<input type='text'/>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Location: &ensp;</h3>
						<input type='text'/>
						<span className='checkBox'><input type='checkbox' />&ensp;Include zero qty</span>
					</tr>
				</table>
			</div>
			{/* <div>
				<Accordion className="anotherItemButton">
        			<AccordionSummary
          				id="panel1-header"
          				aria-controls="panel1-content"
          				onClick={toggleAnotherItem}
        			>
          			<Typography>Add items</Typography>
        			</AccordionSummary>
				{showAnotherItem && (
					<AccordionDetails className="anotherItemDetails">
					<br/>
					<div className='content'>
						<table>
							<tr>
								<td className='filterData'>
									<h3 style={{color: localStorage.getItem('fontColour')}}>Report Type</h3>
									<DropDown/>
								</td>
								<td className='filterData'>
									<h3 style={{color: localStorage.getItem('fontColour')}}>Report Name</h3>
									<input type='text' placeholder='General Report...'/>
								</td>
							</tr>
							<br/>
							<tr className='filterRows'>
								<h3>SKU: &ensp;</h3>
								<input type='text'/>
								<h3>Category: &ensp;</h3>
								<input type='text'/>
								<h3>Supplier: &ensp;</h3>
								<input type='text'/>
							</tr>
							<tr className='filterRows'>
								<h3>Name: &ensp;</h3>
								<input type='text'/>
								<h3>Order ID: &ensp;</h3>
								<input type='text'/>
								<h3>Location: &ensp;</h3>
								<input type='text'/>
								<span className='checkBox'><input type='checkbox' />&ensp;Include zero qty</span>
							</tr>
						</table>
					</div>
					{additionalItemsCount > 1 && (
						<button onClick={removeAdditionalItem}>Remove Item-</button>
					)}
					</AccordionDetails>
				)}
				</Accordion>
			</div> */}
			
			<div className="header">
				<h1 style={{color: localStorage.getItem('fontColour')}}>Report Filters</h1>
			</div>
			<div className="content">
				{showCharts && !loading ? (
				<table className="reportingTable">
					<tr>
						<td>
							<h1>{reportName}</h1>
						</td>
					</tr>
					<tr>
						<td>
							<Doughnut data={doughnutChartData} options={options} />
						</td>
						<td>
							<Bar style={{ padding: '20px' }} data={barChartData} options={options} />
						</td>
					</tr>
				</table>
				) : data.length === 0 ? (
					<div>Click "GENERATE REPORT" to load the charts.</div>
				) : null}
			</div>
		</div>
  	)
};

export default Reporting;