import React, { useState, useEffect } from 'react';
import { CloseOutlined, PersonOutlined, ShoppingCartOutlined, Warehouse, Grading } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "../widget/widget.scss";
import axios from 'axios';

const Widget = ({ type }) => {
    const [expanded, setExpanded] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        // Define the API endpoint for each widget type
        let apiEndpoint = '';

        switch (type) {
            case 'BestSeller':
                apiEndpoint = 'http://localhost:8080/api/order/top-selling-items';
                setTitle('Best Seller');
                setIcon(
                    <PersonOutlined
                        className="icon"
                        style={{ color: 'white', backgroundColor: 'green' }}
                    />
                );
                break;
            case 'lowstock':
                apiEndpoint = 'http://localhost:8080/api/stock/lowest';
                setTitle('Low Stock');
                setIcon(
                    <ShoppingCartOutlined
                        className="icon"
                        style={{ color: 'white', backgroundColor: 'maroon' }}
                    />
                );
                break;
            case 'instock':
                apiEndpoint = 'http://localhost:8080/api/stock/random';
                setTitle('In Stock');
                setIcon(
                    <Warehouse
                        className="icon"
                        style={{ color: 'white', backgroundColor: 'green' }}
                    />
                );
                break;
            case 'out':
                apiEndpoint = 'http://localhost:8080/api/stock/random';
                setTitle('Out Stock');
                setIcon(
                    <Grading
                        className="icon"
                        style={{ color: 'white', backgroundColor: 'grey' }}
                    />
                );
                break;
            default:
                break;
        }

        // Fetch data from the API
        axios
            .get(apiEndpoint)
            .then((response) => {
                // Set the tableData state with the fetched data
                setTableData(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching data for ${type}:`, error);
            });
    }, [type]); // Run this effect whenever the type prop changes

    return expanded ? (
        <ExpandedCard
            tableData={tableData}
            title={title}
            icon={icon}
            setExpanded={() => setExpanded(false)}
        />
    ) : (
        <CompactCard
            title={title}
            icon={icon}
            setExpanded={() => setExpanded(true)}
        />
    );
};

function CompactCard({ title, icon, setExpanded }) {
    return (
        <div className="widget" onClick={setExpanded} layoutId={`card-${title}`}>
            <div className="left">
                <span className="title">{title}</span>
                <div className='link'>Click to view </div>
            </div>
            <div className="right">
                <span className="counter">10</span>
                {icon}
            </div>
        </div>
    );
}

function ExpandedCard({ tableData, title, icon, setExpanded }) {
    return (
        <div className="ExpandedCard" layoutId={`card-${title}`}>
            <div>
                <CloseOutlined onClick={setExpanded} />
            </div>
            <span>{title}</span>

            {/* Material-UI table */}
            <TableContainer component={Paper}>
                <Table  style={{ height: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Stockname</TableCell>
                            <TableCell>OrderFrequency</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.stockId}>
                                <TableCell>{row.stockId}</TableCell>
                                <TableCell>{row.stockName || row.stock_name}</TableCell>
                                <TableCell>{row.orderFrequency || row.stock_quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Widget;
