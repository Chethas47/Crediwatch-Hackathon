import "./styles.css";
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const url = "https://cdn.crediwatch.com/assets/json/ews_score.json";

export default function App() {
  const [finData, setFindata] = useState([]);
  // const [financialScore, setFinancialScore] = useState(0);
  // const [partyName, setPartyName] = useState("");
  // const [totalScore, setTotalScore] = useState(0);
  // const [publicScore, setPublicScore] = useState(0);
  // const [privateScore, setPrivateScore] = useState(0);

  fetch(url)
    .then((response) => response.json())
    .then((actualData) => {
      //console.log(actualData.data[0].financial_risks.score);
      //console.log(actualData.data[0].party_name);
      var fin_data = actualData.data;
      var financial_score = actualData.data[0].financial_risks.score;
      var party_name = actualData.data[0].party_name;
      var total_score = actualData.data[0].total;
      var public_score = actualData.data[0].score;
      var private_score = actualData.data[0].private_data_risks.score;
      // setFinancialScore(financial_score);
      // setPartyName(party_name);
      // setTotalScore(total_score);
      // setPublicScore(public_score);
      // setPrivateScore(private_score);
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
            <TableRow>
              <TableCell>Party Name</TableCell>
              <TableCell>Financial Score</TableCell>
              <TableCell>Public Data Score</TableCell>
              <TableCell>Private Risk Score</TableCell>
              <TableCell>Total Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finData.map((row) => {
              return (
                <TableRow key={row.name}>
                  <TableCell>{row.party_name}</TableCell>
                  <TableCell>{row.financial_risks.score}</TableCell>
                  <TableCell>{row.score}</TableCell>
                  <TableCell>{row.private_data_risks.score}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* <TablePagination rowsPerPageOptions={[10, 50]} /> */}
      </TableContainer>
    </div>
  );
}
