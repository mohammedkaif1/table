import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Button, Grid, FormControl, InputLabel, styled } from '@mui/material';

const StyledFormControl = styled(FormControl)({
  minWidth: 200,
});

const AddEmployeeModal = ({ open, handleClose, handleAddEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    employeeID: '',
    employeeName: '',
    SDM: '',
    skills: '',
    duration: '',
    project: '',
    eligible: 'No',
    flagged: 'No',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleAdd = () => {
    handleAddEmployee(newEmployee);
    setNewEmployee({
      employeeID: '',
      employeeName: '',
      SDM: '',
      skills: '',
      duration: '',
      project: '',
      eligible: 'No',
      flagged: 'No',
      remarks: ''
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Employee</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              id="employeeID"
              name="employeeID"
              label="Employee ID"
              type="text"
              fullWidth
              value={newEmployee.employeeID}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="employeeName"
              name="employeeName"
              label="Employee Name"
              type="text"
              fullWidth
              value={newEmployee.employeeName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="SDM"
              name="SDM"
              label="SDM"
              type="text"
              fullWidth
              value={newEmployee.SDM}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="skills"
              name="skills"
              label="Skills"
              type="text"
              fullWidth
              value={newEmployee.skills}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="duration"
              name="duration"
              label="Duration"
              type="text"
              fullWidth
              value={newEmployee.duration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="project"
              name="project"
              label="Project"
              type="text"
              fullWidth
              value={newEmployee.project}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="eligible-label">Eligible</InputLabel>
            <StyledFormControl fullWidth>
              <Select
                labelId="eligible-label"
                id="eligible"
                name="eligible"
                value={newEmployee.eligible}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="flagged-label">Flagged</InputLabel>
            <StyledFormControl fullWidth>
              <Select
                labelId="flagged-label"
                id="flagged"
                name="flagged"
                value={newEmployee.flagged}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="remarks"
              name="remarks"
              label="Remarks"
              type="text"
              fullWidth
              value={newEmployee.remarks}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
