import "./styles.css";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const url = "https://cdn.crediwatch.com/assets/json/ews_score.json";

export default function App() {
  const [finData, setFindata] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, finData.length - page * rowsPerPage);

  fetch(url)
    .then((response) => response.json())
    .then((actualData) => {
      var fin_data = actualData.data;
      setFindata(fin_data);
    })
    .catch((err) => {
      console.log(err.message);
    });

  // function searchPartyName(queryPartyName){
  //   var resPartyName = finData.find(queryPartyName);
  //   console.log(resPartyName);
  // }

  // var queryPartyName1 = "ULTRAKOTE";
  // searchPartyName(queryPartyName1)

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <StyledTableCell>Expand View</StyledTableCell>
            <StyledTableCell>Party Name</StyledTableCell>
            <StyledTableCell>Financial Score</StyledTableCell>
            <StyledTableCell>Public Data Score</StyledTableCell>
            <StyledTableCell>Private Risk Score</StyledTableCell>
            <StyledTableCell>Total Score</StyledTableCell>
          </TableHead>
          <TableBody>
            {finData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow key={row.name}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <StyledTableCell>{row.party_name}</StyledTableCell>
                    <StyledTableCell>
                      {row.financial_risks.score}
                    </StyledTableCell>
                    <StyledTableCell>{row.score}</StyledTableCell>
                    <StyledTableCell>
                      {row.private_data_risks.score}
                    </StyledTableCell>
                    <StyledTableCell>{row.total}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={finData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
