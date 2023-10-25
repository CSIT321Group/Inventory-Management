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
      const stockEndpoint = `http://localhost:8080/api/stock`;

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

        const orderData = orderResponse.data;
        const staffData = staffResponse.data;
        const stockData = stockResponse.data;

        // Shuffle the stockData array to get a random order
        const shuffledStockData = shuffleArray(stockData);

        // Take the first 10 items from the shuffled list
        const randomStockData = shuffledStockData.slice(0, 10);

        const combinedData = randomStockData.map((stock, index) => {
          const order = orderData[index];
          const staff = staffData[index];

          // Generate random timestamps
          const orderDate = getRandomDate();
          const deliveryDate = getRandomDate();

          return {
            id: index + 1,
            product: stock.stock_name,
            amount: stock.stock_quantity,
            first_name: staff ? staff.first_name : 'N/A',
            orderDate,
            deliveryDate,
            status: order.status,
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to generate a random date
  const getRandomDate = () => {
    const startDate = new Date(2022, 0, 1); // Start date as January 1, 2022
    const endDate = new Date(); // Current date
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
  };

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
          {data.map((row) => (
            <TableRow key={row.id}>
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
