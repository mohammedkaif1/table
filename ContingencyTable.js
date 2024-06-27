import React, { useState, useEffect} from "react";
//import { getContingent } from "../../../services/api";

import { styled } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Checkbox from '@mui/material/Checkbox';
import { Checkroom } from "@mui/icons-material";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.black,
    },
}));




export default function ContTable({data, setCheckedContingencyRows}) {

  const [localContRows, setLocalContRows] = useState([])

  const handleCheckboxChange = (row) => {
    if(localContRows.includes(row.empID)) {
      setLocalContRows(localContRows.filter((id) => id !== row.empID));
    } else {
      setLocalContRows([...localContRows, row.empID]);
    }
    setCheckedContingencyRows(localContRows);
    console.log(localContRows)
  }

  
  return (
    <TableContainer component={Paper} overflow="hidden">
      <Table sx={{ minWidth: 650, maxHeight: 40}} aria-label="simple table" overflow="scroll">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Emp ID</StyledTableCell>
            <StyledTableCell align="center">Emp Name</StyledTableCell>
            <StyledTableCell align="center">SDM</StyledTableCell>
            <StyledTableCell align="center">Project Duration</StyledTableCell>
            <StyledTableCell align="center">Skills</StyledTableCell>
            <StyledTableCell align='center'>Experience</StyledTableCell>
            <StyledTableCell align='center'>Location</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.empId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

            >
              {/* empId, empName, SDM, projectDuration, skills, experience, location */}
              <TableCell component="th" scope="row" align="center">
                {row.empID}
              </TableCell>
              <TableCell align="center">{row.empName}</TableCell>
              <TableCell align="center">{row.sdm}</TableCell>
              <TableCell align="center">{row.projectDuration}</TableCell>
              <TableCell align="center">{row.skills}</TableCell>
              <TableCell align="center">{row.experience}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">
                <div style={{display:"flex", justifyContent: "space-evenly"}}>
                  <button className='action-button'>
                    <Checkbox {...label} color="success" checked={localContRows.includes(row.empID)}
                    onChange={() => handleCheckboxChange(row)}/>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




