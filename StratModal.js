import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { styled } from '@mui/material/styles'   
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ContingencyTable from '../../Widgets/HiringWidgets/tables/StratModal/ContingencyTable';
import RotationPoolTable from '../../Widgets/HiringWidgets/tables/StratModal/RotationPoolTable';
import HireTable from '../../Widgets/HiringWidgets/tables/StratModal/HireTable';

import { getContingent, getRotation, updateContingencyProject,checkoutforcontingent } from "../../Services/HiringStratgey";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const AntTabs = styled(Tabs)({
    backgroundColor: 'white',
    textTransform: 'none',
    borderTop: '1px solid #e8e8e8',
    borderBottom: '2px solid #e8e8e8',
    borderRight: '1px solid #e8e8e8',
    borderLeft: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#1890ff',
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightBold,
  color: '#919191',
  
  '&:hover': {
    color: '#1A429A',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: "#1A429A",
    fontWeight: theme.typography.fontWeightBold,
    transform: "smooth"
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

function HiringTabs({data,updatec,updater}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [contingentData, setContingentData] = useState([]);
  const [rotationData, setRotationData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  
    
  

  

  useEffect(() => {
    const fetchData = async() => {
      try {
        const contData = await getContingent();
        setContingentData(contData);
        const rotData = await getRotation();
        setRotationData(rotData);
        console.log(rotationData)

      } catch(error) {
        console.error("Error fetching projects: ", error);
      }
    };
    fetchData();
  }, []);



  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static" >
        <AntTabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <AntTab label="Contingency Table" {...a11yProps(0)}/>
          <AntTab label="Rotation Pool" {...a11yProps(1)} />
          <AntTab label="To be Hired" {...a11yProps(2)} />
        </AntTabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
         <ContingencyTable data={contingentData} updatecon={updatec}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <RotationPoolTable data={rotationData} updaterot={updater}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <HireTable data={data} />
        </TabPanel>
      </SwipeableViews>
      <Divider/>
    </Box>
  );
}



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 40,
  maxHeight: '85%',
  borderRadius: '20px',
  p: 4,
  overflowY: 'scroll', 
};


const StratModal = ({open, handleClose, data}) => {

  const [showTable, setShowTable] = useState(false);
  const [checkedContingencyRows, setCheckedContingencyRows] = useState([]);
  const [checkedRotationRows, setCheckedRotationRows] = useState([]);
  const[checkoutcontingentemployeetable,setCheckoutcontingentemployeetable]=useState([])
  

  function updatec(con1)
  {
    
    setCheckedContingencyRows(con1)
  }

  function updater(ro1)
  {
    
    setCheckedRotationRows(ro1)
  }
  const handleShowTable = () => {
    setShowTable(true);
  }

  const handleCloseModal = () => {
    handleClose();
    setShowTable(false);
  }

  const handleFreeze = ({data}) => {
    try {
      const selectall=[...checkedContingencyRows,...checkedRotationRows]
      console.log(selectall)
        {/*console.log(checkedContingencyRows)
        if(checkedContingencyRows.length() > 0) {
            updateContingencyProject(data.projectID, checkedContingencyRows);
        }
        alert(`Hiring Strategy for project ${data.projectName} is done`)*/}
        checkoutforcontingent(checkedContingencyRows).then((res)=>setCheckoutcontingentemployeetable(res.data))
        console.log(checkoutcontingentemployeetable)
        
    } catch(error) {
        console.log(error);
    }

    handleClose();
    setShowTable(false);
  }

 

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <IconButton onClick={handleCloseModal} style={{float: "right"}}>
              <CloseIcon/>
            </IconButton>
          </div>
            <h2>{data.projectName}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20 }}>
                <div>
                    <p>Project ID</p>
                    <h4>{data.projectID}</h4>
                </div>
                <div>
                    <p>Duration</p>
                    <h4>{data.duration} months</h4>
                </div>
                
                <div>
                    <p>SDM</p>
                    <h4>{data.sdm}</h4>
                </div>
            </div>
            <Divider/>
            <div style={{width: "60%", marginTop: 18, display: "flex"}}>
                <Typography id="modal-modal-title" variant="p" component="p" fontSize={18} marginRight={5} marginTop={2}>
                    Add the required number of Employees
                </Typography>
                <TextField inputProps={{ type: 'number', min: 1, max: 30}} style={{}}/>
                <Button onClick={handleShowTable}
                 style={{marginLeft: 20, border: "1px solid #801947", color: "#801947", borderRadius: "15px"}}>
                    Done
                </Button>
            </div>
            &nbsp;
            &nbsp;
            {showTable && (
              <div>
                <HiringTabs data={data}
                updatec={updatec}
                updater={updater}
                  
                />
                <Button style={{left:850, border: '2px solid #801947', borderRadius: 12, height: 45, marginTop: 20, width: 120, color: "#801947"}} onClick={() => handleFreeze(data)}>Checkout</Button>
              </div> 
            )}
        </Box>
      </Modal>
    </div>
  );
}

export default StratModal;

// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Divider from '@mui/material/Divider';
// import { TextField } from '@mui/material';
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { styled } from '@mui/material/styles';
// import SwipeableViews from 'react-swipeable-views';
// import { useTheme } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import ContingencyTable from '../tables/StratModal/ContingencyTable';
// import RotationPoolTable from '../tables/StratModal/RotationPoolTable';
// import HireTable from '../tables/StratModal/HireTable';
// import HiringTabs from './HiringTabs';
// import { getContingent, getRotation, updateContingencyProject } from "../../services/api";

// const AntTabs = styled(Tabs)({
//     backgroundColor: 'white',
//     textTransform: 'none',
//     borderTop: '1px solid #e8e8e8',
//     borderBottom: '2px solid #e8e8e8',
//     borderRight: '1px solid #e8e8e8',
//     borderLeft: '1px solid #e8e8e8',
//     '& .MuiTabs-indicator': {
//         backgroundColor: '#1890ff',
//     },
// });

// const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
//     textTransform: 'none',
//     minWidth: 0,
//     [theme.breakpoints.up('sm')]: {
//         minWidth: 0,
//     },
//     fontWeight: theme.typography.fontWeightBold,
//     color: '#919191',
//     '&:hover': {
//         color: '#1A429A',
//         opacity: 1,
//     },
//     '&.Mui-selected': {
//         color: 'white',
//         backgroundColor: "#1A429A",
//         fontWeight: theme.typography.fontWeightBold,
//         transform: "smooth"
//     },
//     '&.Mui-focusVisible': {
//         backgroundColor: '#d1eaff',
//     },
// }));

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 1000,
//     height: 'auto',
//     bgcolor: 'background.paper',
//     boxShadow: 40,
//     maxHeight: '85%',
//     borderRadius: '20px',
//     p: 4,
//     overflowY: 'scroll',
// };

// const StratModal = ({ open, handleClose, data }) => {
//     const [showTable, setShowTable] = useState(false);
//     const [contingentData, setContingentData] = useState([]);
//     const [rotationData, setRotationData] = useState([]);
//     const [checkedContingencyRows, setCheckedContingencyRows] = useState([]);
//     const [checkedRotationRows, setCheckedRotationRows] = useState([]);
//     const [hireData, setHireData] = useState(data);

//     const handleShowTable = () => {
//         setShowTable(true);
//     }

//     const handleCloseModal = () => {
//         handleClose();
//         setShowTable(false);
//     }

//     const handleFreeze = async () => {
//         try {
//             const contingencyEmpIds = checkedContingencyRows.map(row => row.empid);
//             const rotationEmpIds = checkedRotationRows.map(row => row.empid);

//             if (contingencyEmpIds.length > 0) {
//                 await updateContingencyProject(data.projectID, contingencyEmpIds);
//             }

//             // if (rotationEmpIds.length > 0) {
//             //     await updateRotationProject(data.projectID, rotationEmpIds);
//             // }

//             // if (hireData.length > 0) {
//             //     await addNewHires(hireData);
//             // }

//             alert(`Hiring Strategy for project ${data.projectName} is updated`);
//             handleClose();
//             setShowTable(false);
//         } catch (error) {
//             console.error('Error during checkout:', error);
//             alert('An error occurred during checkout. Please try again.');
//         }
//     }

//     return (
//         <div>
//             <Modal
//                 open={open}
//                 onClose={handleCloseModal}
//                 closeAfterTransition
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <div>
//                         <IconButton onClick={handleCloseModal} style={{ float: "right" }}>
//                             <CloseIcon />
//                         </IconButton>
//                     </div>
//                     <h2>{data.projectName}</h2>
//                     <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20 }}>
//                         <div>
//                             <p>Project ID</p>
//                             <h4>{data.projectID}</h4>
//                         </div>
//                         <div>
//                             <p>Duration</p>
//                             <h4>{data.duration} months</h4>
//                         </div>
//                         <div>
//                             <p>SDM</p>
//                             <h4>{data.sdm}</h4>
//                         </div>
//                     </div>
//                     <Divider />
//                     <div style={{ width: "60%", marginTop: 18, display: "flex" }}>
//                         <Typography id="modal-modal-title" variant="p" component="p" fontSize={18} marginRight={5} marginTop={2}>
//                             Add the required number of Employees
//                         </Typography>
//                         <TextField inputProps={{ type: 'number', min: 1, max: 30 }} style={{}} />
//                         <Button onClick={handleShowTable}
//                             style={{ marginLeft: 20, border: "1px solid #801947", color: "#801947", borderRadius: "15px" }}>
//                             Done
//                         </Button>
//                     </div>
//                     &nbsp;
//                     &nbsp;
//                     {showTable && (
//                         <div>
//                             <HiringTabs data={data}
//                                 setCheckedContingencyRows={setCheckedContingencyRows}
//                                 setCheckedRotationRows={setCheckedRotationRows}
//                                 hireData={hireData}
//                                 setHireData={setHireData}
//                             />
//                             <Button style={{ left: 850, border: '2px solid #801947', borderRadius: 12, height: 45, marginTop: 20, width: 120, color: "#801947" }} onClick={handleFreeze}>Checkout</Button>
//                         </div>
//                     )}
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

// export default StratModal;
