import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Avatar } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';

const TableComponent = ({ onOptionChange }) => {
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Item 1', description: 'Description 1', selectedOption: 'No' },
    { id: 2, name: 'Item 2', description: 'Description 2', selectedOption: 'No' },
    { id: 3, name: 'Item 3', description: 'Description 3', selectedOption: 'No' },
  ]);

  const handleDropdownChange = async (event, id) => {
    const newValue = event.target.value;
    try {
      // Simulate API call
      //await new Promise((resolve) => setTimeout(resolve, 500));

      setTableData(prevData =>
        prevData.map(item => (item.id === id ? { ...item, selectedOption: newValue } : item))
      );
      console.log('Data updated successfully');

      // Callback to parent component to handle option change
      onOptionChange(newValue);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                {item.selectedOption === 'Yes' &&  <Avatar style={{ backgroundColor: 'green' }}><FlagIcon style={{ color: 'white' }} /></Avatar>}
                {item.id}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Select
                  value={item.selectedOption}
                  onChange={(e) => handleDropdownChange(e, item.id)}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
