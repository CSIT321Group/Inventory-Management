import React, { useState } from 'react';
import './pageLayout.css';
import './reporting.css';
import { Doughnut, Bar } from 'react-chartjs-2';
import DropDown from './DropDownReport';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

import { ExpandMoreOutlined } from '@mui/icons-material';
import {Accordion, AccordionDetails, AccordionSummary,Typography }from '@mui/material';
export default function Reporting() {
	Chart.register(
		ArcElement,
		BarElement,
		CategoryScale,
		LinearScale
		);

	const [show, toggleShow] = useState(true);

	const labels = ["In-stock", "Out-of-Stock", "Future Stock", "Predicted Loss", "Future Growth"];

	const data = {
		labels: labels,
		datasets: [{
			label: 'Test',
			data: [10, 8, 13, 4, 20],
			backgroundColor: [
				'#007bff', // blue
				'#FF0000', // red
				'#FFD700', // yellow
				'#28a745', // green
				'#FF00FF', // voilet
				'ff9900',  // orange
				'00FFFF',  // aqua marine
				'#d69ae5', // red violet
				'#FF8F66', // orange red
				'#00FF00'  // lime
			],
		}],
	};

	const options = {
		
	}

	return (
		<>
			<br/><br/>
			<div className='header'>
				<h1>Report Filters</h1>
				<button onClick= {() => toggleShow(!show)} className='button'> GENERATE REPORT</button>
			</div>
			<div className='content'>
				<table>
					<tr>
						<td className='filterData'>
							<h3>Report Type</h3>
							<DropDown/>
						</td>
						<td className='filterData'>
							<h3>Report Name</h3>
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
			<div>
				<Accordion className="anotherItemButton">
					<AccordionSummary id="panel1-header"
					aria-controls='panel1-content'
					expand ={<ExpandMoreOutlined/>}> <Typography>Add items</Typography>
					</AccordionSummary>
					<AccordionDetails className="anotherItemDetails">
					<br/>	<div className='content'>
				<table>
					<tr>
						<td className='filterData'>
							<h3>Report Type</h3>
							<DropDown/>
						</td>
						<td className='filterData'>
							<h3>Report Name</h3>
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
					</AccordionDetails>


				</Accordion>
			</div>
			











			<div className='header'>
					<h1>Report Statistics</h1>
					<button className='button'>EXPORT AS PDF</button>
			</div>
				{show ?
					<div className='content'>
						<table className='reportingTable'>
							<tr>
								<td>
									<Doughnut data={data} options={{maintainAspectRatio:false}} />
								</td>
								<td>
									<Bar style= {{padding: '20px'}} data = {data} options = {options}/>
								</td>
							</tr>
						</table>
					</div>
					:
					<div className='report-statistics-noshow'>
						<div>
							<h2 style={{textAlign:"center", alignContent:"center", marginTop:"250px"}}>GENERATE A REPORT ABOVE</h2>
						</div>
					</div>
				}
		</>
  	)
}