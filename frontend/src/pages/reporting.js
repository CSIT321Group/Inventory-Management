import React, { useState } from 'react';
import './reporting.css';
import { Doughnut } from 'react-chartjs-2';
import DropDown from './DropDownReport';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function Reporting() {
	Chart.register(
		ArcElement,
		BarElement,
		CategoryScale,
		LinearScale
		);

	const [show, toggleShow] = useState(true);

	const labels = ["In-stock", "Out-of-Stock"];

	const data = {
		labels: labels,
		datasets: [{
			label: 'Test',
			data: [10, 8],
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
		<div>
			<div className='report-filtering-card'>
				<div className='header'>
					<h1>Report Filters</h1>
					<button onClick= {() => toggleShow(!show)} className='generateReportButton'> GENERATE REPORT</button>
				</div>
				<div className='report-filtering-component'>
					<table>
						<tr>
							<td>
								<h3>Report Type</h3>
								<DropDown/>
							</td>
							<td>
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
				<button className='anotherItemButton'><i>+ Another Item</i></button>
				
			</div>

			<div className='report-statistics-card'>
				<div className='header'>
					<h1>Report Statistics</h1>
					<button className='exportPDFButton'>EXPORT AS PDF</button>
				</div>
					{show ?
					<div style={{display:"inline-flex"}}>
						<div>
							<Doughnut data={data} options={{maintainAspectRatio:false}} />
						</div>
						<div>
							<Bar style= {{padding: '20px'}} data = {data} options = {options}/>
						</div>
					</div>
						:
						<div className='report-statistics-noshow'>
							<div>
								<h2 style={{textAlign:"center", alignContent:"center", marginTop:"250px"}}>GENERATE A REPORT ABOVE</h2>
							</div>
						</div>
					}
				</div>
		</div>
  	)
}