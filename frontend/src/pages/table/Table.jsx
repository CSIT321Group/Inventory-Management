import React, { useState, useEffect } from 'react';
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orderEndpoint = `http://localhost:8080/api/order`;
      const staffEndpoint = `http://localhost:8080/api/staff`;
      const stockEndpoint= `http://localhost:8080/api/stock/random`;

      try {
        const [orderResponse, staffResponse, stockResponse] = await Promise.all([
          axios.get(orderEndpoint, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          }),
          axios.get(staffEndpoint, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          }),
          axios.get(stockEndpoint, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          }),
        ]);

        // Create a mapping of staff data by their IDs for easy access
        const staffDataMap = new Map();
        staffResponse.data.forEach((staff) => {
          staffDataMap.set(staff.id, staff);
        });
        const stockDataMap =new Map();
        stockResponse.data.forEach((stock) => {
          stockDataMap.set(stock.stockId, stock);
        });


        // Merge order and staff data with the same ID
        const combinedData = orderResponse.data.map((order) => {
          const staff = staffDataMap.get(order.id);
          const stock = stockDataMap.get(order.stockId);
          return {
            id: order.id,
            product: stock ? stock.stock_name:"CNC-Extruder",
            amount: stock ? stock.stock_quantity: 1,
            first_name: staff ? staff.first_name : '',
            orderDate: order.orderDate,
            deliveryDate: order.deliveryDate,
            status: order.status,
          };
        }).slice(0,10);

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">No</TableCell>
            <TableCell className="tableCell">Product Name</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Employee no</TableCell>
            <TableCell className="tableCell">TimeStamp</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">{row.product}</div>
              </TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.first_name}</TableCell>
              <TableCell className="tableCell">{row.orderDate || row.deliveryDate}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
