import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Avatar, Button } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import KPI from './Kpi';
import AddEmployeeModal from './AddEmployeeModal';
import "./style.css"
import {TablePagination} from '@mui/material'
import Kpi from './main';



const TableComponent = ({ onOptionChange }) => {
  const [kpi1, setKpi1] = useState(0);
  const [kpi2, setKpi2] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    fetchData();
    fetchKPIs();


  }, []);

  const fetchData =  () => {
    try {
      const response = axios.get('http://localhost:8080/api/employee').then(res=>{
        setTableData(res.data)
      })
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchKPIs= async() => {
    try{
      const[eligiblec,flaggedc]= await Promise.all([
        axios.get('http://localhost:8080/api/employee/eligiblec'),
        axios.get('http://localhost:8080/api/employee/flaggedc')

      ]);
      const eligiblecount=eligiblec.data
      const flaggedcount=flaggedc.data
      setKpi1(eligiblecount)
      setKpi2(flaggedcount)
    }
    catch(error)
    {
      console.log("error in fetching KPIs",error)

    }
  }

  const handleDropdownChange = async (event, id) => {
    const newValue = event.target.value;
    try {
      // Update frontend state
      setTableData(prevData =>
        prevData.map(item => (item.employeeId === id ? { ...item, flaggedForRotation: newValue } : item))
      );
      console.log('Frontend data updated successfully');

      // Update backend database
      await axios.put(`http://localhost:8080/api/employee/${id}`, { flaggedForRotation: newValue });
      console.log('Backend data updated successfully');

      // Callback to parent component to handle option change
      onOptionChange(newValue);
      // update kpis
      fetchKPIs();

      //const flaggedcount=tableData.filter(item => item.flaggedForRotation==="Yes").length
      //const eligiblecount=tableData.filter(item => item.eligibleForRotationPool==="Yes").length
      //setKpi1(eligiblecount)
      //setKpi2(flaggedcount)
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
      await axios.post('http://localhost:8080/api/employee', newEmployee);
      console.log('New employee added successfully');

      // Close modal <KPI kpi1={kpi1} kpi2={kpi2} />
      setOpenModal(false);

      // Refetch data
      fetchData();
      fetchKPIs();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  const [page,changepage]=useState(0);
const [rowperpage,changerowperpage]=useState(5);
 
const handleChangePage=(event,newpage)=>{
  changepage(newpage);
}
const handleRowperpageChange=(event)=>{
  changerowperpage(+event.target.value);
  changepage(0)
}

  return (
    
    <div style={{ marginTop: '40px' }}>
      
      <div style={{ display: 'flex' }}>
      <Kpi text="Total Employees Eligible for Rotation Pool" kpi1={kpi1}></Kpi>
      <Kpi text="Total Employees Flagged for Rotation Pool" kpi1={kpi2}></Kpi>
      
        
      </div>
      <Button variant="contained" onClick={handleOpenModal}>Add Employee</Button>
    
      <TableContainer component={Paper}>
        <Table>
          <TableHead >
            <TableRow >
              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>EmployeeID</TableCell>


              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>EmployeeName</TableCell>
              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>SDM</TableCell>
              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>Skills</TableCell>
              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>Duration in the<br/>Project</TableCell>
              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>Project</TableCell>
              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>Eligiblefor<br/>RotationPool</TableCell>
              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>Flaggedfor<br/>Rotation</TableCell>
              <TableCell sx={{whiteSpace:'nowrap'}} align='center'>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(page*rowperpage,page*rowperpage+rowperpage).map(item => (
              <TableRow key={item.employeeId} className="emp">
                <TableCell sx={{fontWeight:'bold',whiteSpace:'nowrap'}}align='center'>
                  <div style={{display:'flex',alignItems:'center'}}>
                  <span>{item.employeeId}</span>
                  {item.flaggedForRotation === 'Yes' &&  <Avatar style={{ backgroundColor: 'green',width:'20px',height:'20px'}}><FlagIcon style={{ color: 'white',fontSize:'10px'}} /></Avatar>}
                 
                  </div>
                </TableCell>
                <TableCell sx={{whiteSpace:'nowrap'}} align='center'>{item.employeeName}</TableCell>
                <TableCell sx={{whiteSpace:'nowrap'}} align='center'>{item.sdm}</TableCell>
                <TableCell sx={{whiteSpace:'nowrap'}} align='center'>{item.skills}</TableCell>
                <TableCell sx={{whiteSpace:'nowrap'}} align='center'>
                <div style={{alignItems:'center'}}>
                  <span>{item.durationInProject}</span>
                </div>
                  </TableCell>
                <TableCell sx={{whiteSpace:'nowrap'}} align='center'>{item.project}</TableCell>
                <TableCell sx={{whiteSpace:'nowrap'}} align='center'>{item.eligibleForRotationPool}</TableCell>

                <TableCell sx={{whiteSpace:'nowrap'}} align='center'>
                  <select
                    value={item.flaggedForRotation}
                    onChange={(e) => handleDropdownChange(e, item.employeeId)}
                    style={{minWidth:'5px', minHeight:'2px'}}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </TableCell>
                <TableCell sx={{whiteSpace:'nowrap'}} align='center'>{item.remark}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
       
      </TableContainer>
      <TablePagination


rowsPerPageOptions={[3,5,10,15]}
page={page}
rowsPerPage={rowperpage}
component="div"
onPageChange={handleChangePage}
onRowsPerPageChange={handleRowperpageChange}
count={tableData.length}

>

</TablePagination>

      <AddEmployeeModal open={openModal} handleClose={handleCloseModal} handleAddEmployee={handleAddEmployee} />
    </div>
  );
};



export default TableComponent;