import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Avatar, Button } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import KPI from './Kpi';
import AddEmployeeModal from './AddEmployeeModal';

const TableComponent = ({ onOptionChange }) => {
  const [kpi1, setKpi1] = useState(0);
  const [kpi2, setKpi2] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('YOUR_BACKEND_API_ENDPOINT');
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDropdownChange = async (event, id) => {
    const newValue = event.target.value;
    try {
      // Update frontend state
      setTableData(prevData =>
        prevData.map(item => (item.id === id ? { ...item, selectedOption: newValue } : item))
      );
      console.log('Frontend data updated successfully');

      // Update backend database
      await axios.put(`YOUR_BACKEND_UPDATE_ENDPOINT/${id}`, { selectedOption: newValue });
      console.log('Backend data updated successfully');

      // Callback to parent component to handle option change
      onOptionChange(newValue);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      // Add new employee to backend
      await axios.post('YOUR_BACKEND_ADD_EMPLOYEE_ENDPOINT', newEmployee);
      console.log('New employee added successfully');

      // Close modal
      setOpenModal(false);

      // Refetch data
      fetchData();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <KPI kpi1={kpi1} kpi2={kpi2} />
        <Button variant="contained" onClick={handleOpenModal}>Add Employee</Button>
      </div>
    
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: 'lightblue' }}>
            <TableRow>
              <TableCell>EmployeeID</TableCell>
              <TableCell>EmployeeName</TableCell>
              <TableCell>SDM</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Duration in the Project</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>EligibleforRotationPool</TableCell>
              <TableCell>FlaggedforRotation</TableCell>
              <TableCell>Remarks</TableCell>
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

      <AddEmployeeModal open={openModal} handleClose={handleCloseModal} handleAddEmployee={handleAddEmployee} />
    </div>
  );
};

export default TableComponent;
