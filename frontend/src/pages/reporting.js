import React, { useState, useEffect } from 'react';
import './pageLayout.css';
import './reporting.css';
import { Doughnut, Bar } from 'react-chartjs-2';
import DropDown from './DropDownReport';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

import { Accordion, AccordionDetails, AccordionSummary, Typography }from '@mui/material';
export default function Reporting() {
	Chart.register(
		ArcElement,
		BarElement,
		CategoryScale,
		LinearScale
		);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showAnotherItem, setShowAnotherItem] = useState(false);
	const [additionalItemsCount, setAdditionalItemsCount] = useState(1);
	const [showCharts, setShowCharts] = useState(false);

	const toggleAnotherItem = () => {
		if(additionalItemsCount < 5) {
			setShowAnotherItem(true);
			setAdditionalItemsCount((count) => count++);
		}
	};

	const removeAdditionalItem = () => {
		if (additionalItemsCount > 1){ 
			setAdditionalItemsCount((count) => count--);
		} else {
			setShowAnotherItem(false);
		}
	}

	useEffect (() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		if (data.length === 0) {
			try {
			  const result = await fetch('');
			  const doughnutData = await result.json();
			  setData(doughnutData);
			} catch (error) {
			  console.error("Error fetching data: ", error);
			} finally {
			  setLoading(false);
			  setShowCharts(true);
			}
		} else {
			setShowCharts(!showCharts);
		}
	};

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
	};

	const chartData = {
		labels: ["In-stock", "Out-of-Stock", "Future Stock", "Predicted Loss", "Future Growth"],
		datasets: [
			{
				label: 'Stock',
				data: data.colors,
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1,
			},
		],
	};

	// const options = {
	// 	labels: labels,
	// 	datasets: [{
	// 		label: 'Test',
	// 		data: [10, 8, 13, 4, 20],
	// 		backgroundColor: [
	// 			'#007bff', // blue
	// 			'#FF0000', // red
	// 			'#FFD700', // yellow
	// 			'#28a745', // green
	// 			'#FF00FF', // voilet
	// 			'ff9900',  // orange
	// 			'00FFFF',  // aqua marine
	// 			'#d69ae5', // red violet
	// 			'#FF8F66', // orange red
	// 			'#00FF00'  // lime
	// 		],
	// 	}],
	// };
	<></>
	return (
		<div style={{zoom: JSON.parse(localStorage.getItem('zoom')),fontSize: JSON.parse(localStorage.getItem('newSize'))}}>
			<br/><br/>
			<div className='header'>
				<h1 style={{color: localStorage.getItem('fontColour')}}>Report Filters</h1>
				<button onClick= {fetchData} className='button'> GENERATE REPORT</button>
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
							<input type='text' placeholder='General Report...'/>
						</td>
					</tr>
					<br/>
					<tr className='filterRows'>
						<h3 style={{color: localStorage.getItem('fontColour')}}>SKU: &ensp;</h3>
						<input type='text'/>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Category: &ensp;</h3>
						<input type='text'/>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Supplier: &ensp;</h3>
						<input type='text'/>
					</tr>
					<tr className='filterRows'>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Name: &ensp;</h3>
						<input type='text'/>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Order ID: &ensp;</h3>
						<input type='text'/>
						<h3 style={{color: localStorage.getItem('fontColour')}}>Location: &ensp;</h3>
						<input type='text'/>
						<span className='checkBox'><input type='checkbox' />&ensp;Include zero qty</span>
					</tr>
				</table>
			</div>
			<div>
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
			</div>
			
			<div className="header">
				<h1 style={{color: localStorage.getItem('fontColour')}}>Report Filters</h1>
				<button onClick={fetchData} className="button">
					{data.length === 0 ? 'GENERATE REPORT' : 'TOGGLE CHARTS'}
				</button>
			</div>
			<div className="content">
				{showCharts && !loading ? (
				<table className="reportingTable">
					<tr>
						<td>
							<Doughnut data={chartData} options={options} />
						</td>
						<td>
							<Bar style={{ padding: '20px' }} data={chartData} options={options} />
						</td>
					</tr>
				</table>
				) : data.length === 0 ? (
					<div>Click "GENERATE REPORT" to load the charts.</div>
				) : null}
			</div>
		</div>
  	)
}