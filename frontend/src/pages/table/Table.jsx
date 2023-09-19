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
          amount: 785,
          customer: 12345,
          date: "1 March",
          status: "Approved",
        },
        {
          no:2,
          product: "Clorine",
          amount: 900,
          customer: 6789,
          date: "1 March",
          status: "Pending",
        },
        {
          no:3,
          product: "Red cleaner",
          amount: 35,
          customer: 10111213,
          date: "1 March",
          status: "Pending",
        },
        {
            no:4,
          product: "Purifier",
          amount: 920,
          customer: 14151617,
          date: "1 March",
          status: "Approved",
        },
        {
          no:5,
          product: "Sulphur",
          amount: 2000,
          customer: 18192021,
          date: "1 March",
          status: "Pending",
        },
      ];
    return(
        <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> No </TableCell>
            <TableCell className="tableCell">Product Name</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Employee no</TableCell>
            <TableCell className="tableCell">TimeStamp</TableCell>
            <TableCell className="tableCell">Action</TableCell>
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
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
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