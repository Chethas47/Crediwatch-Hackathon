import "./styles.css";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
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
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
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

  function getBg(score) {
    if (score > 0 && score <= 5) {
      return "#99ff66";
    }
    if (score > 5 && score < 13.5) {
      return "#ff9933";
    }
    if (score >= 13.5 && score <= 15) {
      return "#ff5c33";
    }
  }

  // function searchPartyName(queryPartyName){
  //   var resPartyName = finData.find(queryPartyName);
  //   console.log(resPartyName);
  // }

  // var queryPartyName1 = "ULTRAKOTE";
  // searchPartyName(queryPartyName1)

  return (
    <div className="App">
      <AppBar style={{ background: "#cccccc" }}>
        <Typography>
          <span style={{ color: "black" }}>Color Scheme =></span>
          <span style={{ backgroundColor: "#ff5c33", color: "black" }}>
            High|
          </span>
          <span style={{ backgroundColor: "#ff9933", color: "black" }}>
            Medium|
          </span>
          <span style={{ backgroundColor: "#99ff66", color: "black" }}>
            Low|
          </span>{" "}
        </Typography>
      </AppBar>
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
                  <TableRow key={row.name}>
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
                    <TableCell>{row.party_name}</TableCell>
                    <TableCell
                      style={{
                        backgroundColor: getBg(row.financial_risks.score),
                      }}
                    >
                      {row.financial_risks.score}
                    </TableCell>
                    <TableCell style={{ backgroundColor: getBg(row.score) }}>
                      {row.score}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: getBg(row.private_data_risks.score),
                      }}
                    >
                      {row.private_data_risks.score}
                    </TableCell>
                    <TableCell style={{ backgroundColor: getBg(row.total) }}>
                      {row.total}
                    </TableCell>
                  </TableRow>
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
