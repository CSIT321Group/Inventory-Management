import React from "react";
import "./chart.scss"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: '2020',
      Revenue: 3800,
      
    },
    {
      name: '2018',
      Revenue: 3000,
      
    },
    {
      name: '2017',
      Revenue: 2000,
      
    },
    {
      name: '2016',
      Revenue: 2780,
      
      
    },
    {
      name: '2015',
      Revenue: 1890,
      
    },
    {
      name: '2014',
      Revenue: 2390,
      
    },
    {
      name: '2013',
      Revenue: 3490,
    },
  ];
  

const Chart =() => {
    return (
        <div className="chart">
            <div className="title"> Last couple years revenue</div>
            <ResponsiveContainer width="100%" aspect={2/1}>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
          
				}}
        	>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="Revenue" fill="#82ca9d"  />
			</BarChart>
			</ResponsiveContainer>
        </div>
    )
};
export default Chart