import "./table.scss"

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List =() => {

    const rows = [
        {
          no:1 ,
          product: "Pure clean",
          customer: "John Smith",
          date: "1 March",
          amount: 785,
          status: "Approved",
        },
        {
            no:2,
          product: "Clorine",
          customer: "Michael Doe",
          date: "1 March",
          amount: 900,
          status: "Pending",
        },
        {
            no:3,
          product: "Red cleaner",
          customer: "John Smith",
          date: "1 March",
          amount: 35,
          status: "Pending",
        },
        {
            no:4,
          product: "Purifier",
          customer: "Jane Smith",
          date: "1 March",
          amount: 920,
          status: "Approved",
        },
        {
          no:5,
          product: "Sulphur",
          customer: "Harold Carol",
          date: "1 March",
          amount: 2000,
          status: "Pending",
        },
      ];
    return(
        <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> Number</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.no}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
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