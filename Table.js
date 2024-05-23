import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Avatar, Button, FormControl, RadioGroup, FormControlLabel,Radio, Popover, TextField } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import KPI from './Kpi';
import AddEmployeeModal from './AddEmployeeModal';
import "./style.css"
import {TablePagination} from '@mui/material'
import Kpi from './main';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'



const TableComponent = ({ onOptionChange }) => {
  const [kpi1, setKpi1] = useState(0);
  const [kpi2, setKpi2] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const[rotationType,setRotationType]=useState('All')
  const [durationsort,setDurationSort]=useState('')
  const[popoverTexts,setPopoverTexts]=useState({})
  const[popoverOpen,setPopoverOpen]=useState({
    employeeId:false,
    employeeName:false,
    sdm:false,
    skills:false,
    durationInProject:false,
    project:false,
    
    


  });
  const[PopoverAnchorE1,setPopoverAnchorE1]=useState({
    employeeId:false,
    employeeName:false,
    sdm:false,
    skills:false,
    durationInProject:false,
    project:false,
    eligibleForRotationPool:false,
    flaggedForRotation:false,
    


  });

  const[isapplied,setIsapplied]=useState({
    employeeId:false,
    employeeName:false,
    sdm:false,
    skills:false,
    durationInProject:false,
    project:false,
    filterbased:false
    
    


  });
  
  
  




  
  
  



  useEffect(() => {
    fetchData();
    fetchKPIs();


  }, []);
  useEffect(()=>{
    if(Object.keys(popoverTexts).length>0){
      makeAPIcall();
    }

  },[isapplied])


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
  const makeAPIcall = async()=>{
    try{
      const response=await axios.post('http://localhost:8080/api/employee/filters',popoverTexts)
      setTableData(response.data)
      console.log(response.data)
    }
    catch(error)
    {
      console.log('Error in making API call',error)
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
const handleRotationTypechange=(event)=>{
  
  setPopoverTexts(prevTexts=>({
    ...prevTexts,
    filterbased:event.target.value
  }))
  setIsapplied(prevIsapplied=>({
    ...prevIsapplied,
    [event.target.value]:true
  }))
  setRotationType(event.target.value)

  



}
console.log(popoverTexts)
const handleDurationSortChange=(event)=>{
  setDurationSort(event.target.value)
}
const handlePopoverOpen=(columnName,event)=>{
  setPopoverOpen(prevPopoverOpen=>({
    ...prevPopoverOpen,
    [columnName]:true
  }));
  setPopoverAnchorE1(prevAnchorE1=>(
    {
      ...prevAnchorE1,
      [columnName]:event.currentTarget
    }
  ));

};
const handlePopoverClose=(columnName)=>{
  setPopoverOpen(prevPopoverOpen=>({
    ...prevPopoverOpen,
    [columnName]:false
  }));
  setPopoverAnchorE1(prevAnchorE1=>(
    {
      ...prevAnchorE1,
      [columnName]:null
    }
  ));
}
const handlePopoverSubmit=(columnName)=>{
  setPopoverTexts(prevTexts=>({
    ...prevTexts,
    [columnName]:prevTexts[columnName]

  }));


  
  
  handlePopoverClose(columnName)
  //setPopoverFilter(popoverText)
 
  setIsapplied(prevIsapplied=>({
    ...prevIsapplied,
    [columnName]:true
  }));
  
  
};
const remove=(columnName)=>{
  //setPopoverFilter('')
  setPopoverTexts(prevTexts=>({
    ...prevTexts,
    [columnName]:''

  }));

  
  setIsapplied(prevIsapplied=>({
    ...prevIsapplied,
    [columnName]:false
  }))
}
const handlePopoverOpen1=(columnName,event)=>{
  setPopoverOpen(prevPopoverOpen=>({
    ...prevPopoverOpen,
    [columnName]:true
  }));
  setPopoverAnchorE1(prevAnchorE1=>(
    {
      ...prevAnchorE1,
      [columnName]:event.currentTarget
    }
  ));
  console.log(popoverTexts)

};
const handlePopoverSubmit1=(columnName,e)=>{
  setPopoverTexts(prevTexts=>({
    ...prevTexts,
    [columnName]:prevTexts[columnName]

  }));
  setPopoverTexts(prevTexts=>({
    ...prevTexts,
    sdm:e.target.value
  }))
  
 
  handlePopoverClose(columnName)
  //setPopoverFilter(popoverText)
  setIsapplied(prevIsapplied=>({
    ...prevIsapplied,
    [columnName]:true
  }));
  
};


{/*const filteredData=tableData.filter(item =>{
  if(rotationType==='eligible')
    {
      return item.eligibleForRotationPool==='Yes';
    }
    else if(rotationType==='flagged')
      {
        return item.flaggedForRotation==='Yes';
      }
      else{
        return true;
      }
})
const sortedData=filteredData.sort((a,b)=>{
  const durationA=parseInt(a.durationInProject)
  const durationB=parseInt(b.durationInProject)
  if(durationsort==='asc')
    {
      return durationA-durationB;
    }
    else{
      return durationB-durationA
    }
})*/}

  return (
    
    <div style={{ marginTop: '25px' }}>
      
      <div style={{ display: 'flex' }}>
      <Kpi text="Total Employees Eligible for Rotation Pool" kpi1={kpi1}></Kpi>
      <Kpi text="Total Employees Flagged for Rotation Pool" kpi1={kpi2}></Kpi>
      
        
      </div>
      <div class="button">
        <FormControl>
        <select
            value={durationsort}
            onChange={handleDurationSortChange}
            displayEmpty>
              <option value="asc">DurationinProject(Ascending)</option>
              <option value="desc">DurationinProject(Descending)</option>
          </select>
        </FormControl>
        <FormControl component="fieldset">
        
          <RadioGroup row aria-label="rotationType" name="rotationType" value={rotationType} onChange={handleRotationTypechange}>
          <FormControlLabel value="All" control={<Radio/>} label="All"/>
            <FormControlLabel value="EligibleForRotation" control={<Radio/>} label="EligibleForRotation"/>
            <FormControlLabel value="FlaggedForRotation"  control={<Radio/>} label="FlaggedForRotation"/>
          </RadioGroup>
          </FormControl>
      <Button variant="contained" onClick={handleOpenModal}>Add Employee</Button>
      
     
      </div>
    
      <TableContainer component={Paper} style={{marginTop:'60px'}}>





        <Table>
          <TableHead >
            <TableRow >
              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>Employee ID 
              <ArrowDropDownIcon onClick={(e)=> handlePopoverOpen('employeeId',e)} style={{cursor:'pointer'}}/>
              <Popover
              open={popoverOpen['employeeId']}
              anchorEl={PopoverAnchorE1['employeeId']}
              onClose={()=>handlePopoverClose('employeeId')}
              anchorOrigin={{
                vertical:'bottom',
                horizontal:'left'
              }}
              transformationOrigin={{
                vertical:'bottom',
                horizontal:'left'
              }}
              >
                <div style={{padding:'20px'}}>
                  <TextField
                  label="Enter employee id"
                  variant='outlined'
                  size="small"
                  defaultValue={popoverTexts['employeeId'] || ''}
                  onChange={(e)=>setPopoverTexts(prevTexts=>({
                    ...prevTexts,
                    employeeId:e.target.value
                  }))}
                
                  
                  />
                  <Button variant="contained" onClick={(e)=>handlePopoverSubmit('employeeId',e)}>Submit</Button>
                </div>
              </Popover>
              {
                isapplied['employeeId'] && <div className='remove' onClick={()=>remove('employeeId')}>
                  <div className='emppop'>{popoverTexts['employeeId']}</div>
                  <div className='removebutton'>
                    <HighlightOffIcon></HighlightOffIcon>
                  </div>
                </div>
              }

              
              
              
              
              </TableCell>


              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>Employee Name



              <ArrowDropDownIcon onClick={(e)=> handlePopoverOpen('employeeName',e)} style={{cursor:'pointer'}}/>
              <Popover
              open={popoverOpen['employeeName']}
              anchorEl={PopoverAnchorE1['employeeName']}
              onClose={()=>handlePopoverClose('employeeName')}
              anchorOrigin={{
                vertical:'bottom',
                horizontal:'left'
              }}
              transformationOrigin={{
                vertical:'bottom',
                horizontal:'left'
              }}
              >
                <div style={{padding:'20px'}}>
                  <TextField
                  label="Enter employee name"
                  variant='outlined'
                  size="small"
                  value={popoverTexts['employeeName'] || ''}
                  onChange={(e)=>setPopoverTexts(prevTexts=>({
                    ...prevTexts,
                    employeeName:e.target.value
                    
                  }))}
                  />
                  <Button variant="contained" onClick={(e)=>handlePopoverSubmit('employeeName',e)}>Submit</Button>
                </div>
              </Popover>
              {
                isapplied['employeeName'] && <div className='remove' onClick={()=>remove('employeeName')}>
                  <div className='emppop'>{popoverTexts['employeeName']}</div>
                  <div className='removebutton'>
                    <HighlightOffIcon></HighlightOffIcon>
                  </div>
                </div>
              }
              
              
              
              
              </TableCell>
              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>SDM
              <ArrowDropDownIcon onClick={(e)=> handlePopoverOpen1('sdm',e)} style={{cursor:'pointer'}}/>
              <Popover
              open={popoverOpen['sdm']}
              anchorEl={PopoverAnchorE1['sdm']}
              onClose={()=>handlePopoverClose('sdm')}
              anchorOrigin={{
                vertical:'bottom',
                horizontal:'right'
              }}
              transformationOrigin={{
                vertical:'top',
                horizontal:'left'
              }}
              >
                <div style={{padding:'10px'}}>
                  
                  <select
                  value={popoverTexts.sdm}
                  onChange={(e)=>handlePopoverSubmit1('sdm',e)}
                  style={{minWidth:'5px', minHeight:'2px'}}
                >
                  <option value="" selected disabled hidden>choose</option>
                  <option value="Amarendra kumar">Amarendra kumar</option>
                  <option value="Avanti Kapse">Avanti Kapse</option>
                  <option value="Dinesh Shalgar">Dinesh Shalgar</option>
                  <option value="Gaurav Agarwal">Gaurav Agarwal</option>
                  <option value="Rahul Narkar">Rahul Narkar</option>
                  <option value="Simran Chourasiya">Simran Chourasiya</option>
                  <option value="Sujeet Joshi">Sujeet Joshi</option>
                  <option value="Sahu Summit">Sahu Summit</option>
                  <option value="Swati padhye">Swati padhye</option>

  
                </select>
                
                                  </div>
              </Popover>
              {
                isapplied['sdm'] && <div className='remove' onClick={()=>remove('sdm')}>
                  <div className='emppop'>{popoverTexts['sdm']}</div>
                  <div className='removebutton'>
                    <HighlightOffIcon></HighlightOffIcon>
                  </div>
                </div>
              }
              
              
              
              
              
              
              
              </TableCell>
              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>Skills
              <ArrowDropDownIcon onClick={(e)=> handlePopoverOpen('skills',e)} style={{cursor:'pointer'}}/>
              <Popover
              open={popoverOpen['skills']}
              anchorEl={PopoverAnchorE1['skills']}
              onClose={()=>handlePopoverClose('skills')}
              anchorOrigin={{
                vertical:'bottom',
                horizontal:'left'
              }}
              transformationOrigin={{
                vertical:'bottom',
                horizontal:'left'
              }}
              >
                <div style={{padding:'20px'}}>
                  <TextField
                  label="Enter skills"
                  variant='outlined'
                  size="small"
                  value={popoverTexts['skills'] || ''}
                  onChange={(e)=>setPopoverTexts(prevTexts=>({
                    ...prevTexts,
                    skills:e.target.value
                  }))}
                  />
                  <Button variant="contained" onClick={(e)=>handlePopoverSubmit('skills',e)}>Submit</Button>
                </div>
              </Popover>
              {
                isapplied['skills'] && <div className='remove' onClick={()=>remove('skills')}>
                  <div className='emppop'>{popoverTexts['skills']}</div>
                  <div className='removebutton'>
                    <HighlightOffIcon></HighlightOffIcon>
                  </div>
                </div>
              }








              </TableCell>
              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>Duration in the Project

              
              </TableCell>
              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>Project
              <ArrowDropDownIcon onClick={(e)=> handlePopoverOpen('project',e)} style={{cursor:'pointer'}}/>
              <Popover
              open={popoverOpen['project']}
              anchorEl={PopoverAnchorE1['project']}
              onClose={()=>handlePopoverClose('project')}
              anchorOrigin={{
                vertical:'bottom',
                horizontal:'left'
              }}
              transformationOrigin={{
                vertical:'bottom',
                horizontal:'left'
              }}
              >
                <div style={{padding:'20px'}}>
                  <TextField
                  label="Enter skills"
                  variant='outlined'
                  size="small"
                  value={popoverTexts['project'] || ''}
                  onChange={(e)=>setPopoverTexts(prevTexts=>({
                    ...prevTexts,
                    project:e.target.value
                  }))}
                  />
                  <Button variant="contained" onClick={(e)=>handlePopoverSubmit('project',e)}>Submit</Button>
                </div>
              </Popover>
              {
                isapplied['project'] && <div className='remove' onClick={()=>remove('project')}>
                  <div className='emppop'>{popoverTexts['project']}</div>
                  <div className='removebutton'>
                    <HighlightOffIcon></HighlightOffIcon>
                  </div>
                </div>
              }






              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              </TableCell>
              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>Eligible for RotationPool</TableCell>
              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>Flagged for Rotation</TableCell>
              <TableCell sx={{whiteSpace:'nowrap',color:'white'}} align='center'>Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(page*rowperpage,page*rowperpage+rowperpage).map(item => (
              <TableRow key={item.employeeId} className="emp" sx={{paddingBottom:20}}>
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
                  <span>{item.durationInProject}{"yr"}</span>
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