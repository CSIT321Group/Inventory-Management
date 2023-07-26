import React, { useState } from 'react';
import './reporting.css';
import { Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import DropDown from './DropDownReport.';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function Reporting() {
	Chart.register(
		ArcElement,
		BarElement,
		CategoryScale,
		LinearScale,
		Tooltip,
		Legend
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
					<h1 className='report-filtering-title'>Report Filters</h1>
					<Button onClick= {() => toggleShow(!show)} style={{alignSelf:"flex-end", borderRadius:"30px", fontWeight:"bold"}}> GENERATE REPORT</Button>
				</div>
				<div className='report-filtering-component'>
					<div style={{display:"flex"}}>
						<div style={{textAlign:"start", marginLeft:"10px"}}>
							<h3>Report Type</h3>
							<DropDown/>
						</div>
						<div style={{marginInlineStart:"200px"}}>
							<h3>Report Name</h3>
							<input type='title' placeholder='General Report...' style={{width:"200px", height:"30px"}}/>
						</div>
					</div>
					<div style={{display:"inline-flex"}}>
						<div style={{display:"inline-flex", marginRight:"30px"}}>
							<h3 className='label' style={{marginLeft:"10px"}}>SKU:</h3>
							<input type='sku' style={{height:"20px", alignItems:"center", marginTop:"15px"}}/>
						</div>
						<div style={{display:"inline-flex", marginRight:"30px"}}>
							<h3 className='label' style={{marginLeft:"10px"}}>Category:</h3>
							<input type='category' style={{height:"20px", alignItems:"center", marginTop:"15px"}}/>
						</div>
						<div style={{display:"inline-flex", marginRight:"30px"}}>
							<h3 className='label' style={{marginLeft:"10px"}}>Supplier:</h3>
							<input type='supplier' style={{height:"20px", alignItems:"center", marginTop:"15px"}}/>
						</div>
					</div>
					<div style={{display:"inline-flex"}}>
						<div style={{display:"inline-flex", marginRight:"30px"}}>
							<h3 className='label' style={{marginLeft:"10px"}}>Name:</h3>
							<input type='sku' style={{height:"20px", alignItems:"center", marginTop:"15px"}}/>
						</div>
						<div style={{display:"inline-flex", marginRight:"30px"}}>
							<h3 className='label' style={{marginLeft:"10px"}}>Order ID:</h3>
							<input type='category' style={{height:"20px", alignItems:"center", marginTop:"15px"}}/>
						</div>
						<div style={{display:"inline-flex", marginRight:"30px"}}>
							<h3 className='label' style={{marginLeft:"10px"}}>Location:</h3>
							<input type='supplier' style={{height:"20px", alignItems:"center", marginTop:"15px"}}/>
							<input type='checkbox' value="include-zero-qty" style={{marginLeft:"40px"}}/>
							<span style={{marginTop:'20px'}}>Include zero qty</span>
						</div>
					</div>
				</div>
				<Button style={{width:"125px"}}>+Another Item</Button>
				
			</div>

			<div className='report-statistics-card'>
				<div className='header'>
					<h1 style={{textAlign:"start", marginLeft:"150px"}}>Report Statistics</h1>
					<Button style={{alignSelf:"flex-end", borderRadius:"30px", fontWeight:"bold"}}>EXPORT AS PDF</Button>
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