import React, { useState, useEffect } from "react";

import { styled } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function createData(empId, empName, SDM, skills, resourceLevel, location) {
  return { empId, empName, SDM, skills, resourceLevel, location };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.black,
    },
}));

const rows = [
  createData(102465, 'Kunal Damare', 'Dinesh', 8, 'Java Backend', 24, 'Pune'),
  createData(102717, 'Tejesh Gaikwad', 'Swati', 10, 'React', 10, 'Pune'),
  createData(103948, 'Aaditya Joshi', 'Avanti', 9, 'Node JS', 14, 'Pune'),
  createData(103261, 'Sunil Kumar', 'Amarendra', 9, 'Java', 6, 'Gurgaon'),
  createData(103261, 'Sunil Kumar', 'Amarendra', 9, 'Java', 6, 'Gurgaon'),
];

export default function RotationPoolTable({data, checkedRows, setCheckedRows}) {

  const handleCheckboxChange = (row) => {
    {/*if(checkedRows.includes(row.empID)) {
      setCheckedRows(checkedRows.filter((id) => id !== row.empID));
    } else {
      setCheckedRows([...checkedRows, row.empID]);
    }*/}
  }
  console.log()
  console.log(data)

  return (
    
    <TableContainer component={Paper} overflow="hidden">
      <Table sx={{ minWidth: 650, maxHeight: 40}} aria-label="simple table" overflow="scroll">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Emp ID</StyledTableCell>
            <StyledTableCell align="center">Emp Name</StyledTableCell>
            <StyledTableCell align="center">SDM</StyledTableCell>
            <StyledTableCell align="center">Skills</StyledTableCell>
            <StyledTableCell align='center'>Resource Level</StyledTableCell>
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
              <TableCell component="th" scope="row" align="center">
                {row.empID}
              </TableCell>
              <TableCell align="center">{row.empName}</TableCell>
              <TableCell align="center">{row.sdm}</TableCell>
              <TableCell align="center">{row.skills}</TableCell>
              <TableCell align="center">{row.resourceLevel}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">
                <div style={{display:"flex", justifyContent: "space-evenly"}}>
                  <button className='action-button' >
                    <Checkbox {...label} color="success" 
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




