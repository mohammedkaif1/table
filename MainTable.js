import * as React from 'react';

import '../../Styles/HiringStyles/MainTable.css'
import { getProjects } from '../../Services/HiringStratgey';

import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { createTheme, styled } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';
import StratModal from './StratModal';
import ViewModal from './ViewModal';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1A429A'
        }
    }
})

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;


    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

TablePaginationActions.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsperPage: PropTypes.number.isRequired,
};



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1A429A',
        color: theme.palette.common.white,
        fontSize: 12,
        fontWeight: 600,
        height: 30,
        padding: 11,
    },
}));





function createData(projectID, projectName, totalResourcesRequired, internalResourcesAllocated, tobeHired, duration, SDM) {
  return { projectID, projectName, totalResourcesRequired, internalResourcesAllocated, tobeHired, duration, SDM };
}

const rows = [
  createData('098676', 'Homologation', 5, 2, 3, '12 months', 'Amarendra'),
  createData('094128', 'ARsembly', 6, 3, 3, '10 months', 'Sumit'),
  createData('067543', 'CarSoundDesigner', 3, 2, 1, '08 months', 'Swati'),
  createData('088887', 'WindKanal', 4, 3, 1, '24 months', 'Sumit'),
  createData('052347', 'P42M', 5, 2, 3, '18 months', 'Amarendra'),
  createData('052347', 'P42M', 5, 2, 3, '10 months', 'Gaurav'),
];

export default function BasicTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isStratOpen, setIsStratOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isOpportOpen, setIsOpportOpen] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const [project, setProject] = useState([]);

    const handleOpenStrat = (project) => {
      setIsStratOpen(true);
      setProject(project);
    }

    const handleCloseStrat = () => {
      setIsStratOpen(false);
    }

    const handleOpenOpport = () => {
      setIsOpportOpen(true);
    }
    
    const handleCloseOpport = () => {
      setIsOpportOpen(false);
    }
    
    const handleOpenView = (project) => {
      setIsViewOpen(true);
      setProject(project);
    }

    const handleCloseView = () => {
      setIsViewOpen(false);
    }

    const emptyRows = 
        page > 0 ? Math.max(0, (1+page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
 

    useEffect(() => {
      const fetchProjects = async() => {
        try {
          const data = await getProjects();
          setProjectsData(data);
        } catch(error) {
          console.error("Error fetching projects: ", error);
        }
      };
      fetchProjects();
      console.log(projectsData)
    }, []);

    

  return (  
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="hiring strategy view table" >
        <TableHead >
          <TableRow maxWidth="200">
            <StyledTableCell>Project ID</StyledTableCell>
            <StyledTableCell align="center">Project Name</StyledTableCell>
            <StyledTableCell align="center">Total Resources Required</StyledTableCell>
            <StyledTableCell align="center">Internal Resources allocated</StyledTableCell>
            <StyledTableCell align="center">Resources to be Hired</StyledTableCell>
            <StyledTableCell align='center'>Duration</StyledTableCell>
            <StyledTableCell align='center'>SDM</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0, height:'50px' }}}
              style={{paddingBottom: 1, }}
            >
              <TableCell component="th" scope="row">{row.projectID}</TableCell>
              <TableCell align="center">{row.projectName}</TableCell>
              <TableCell align="center">{row.totalResourcesRequired}</TableCell>
              <TableCell align="center">{row.internalResourcesAllocated}</TableCell>
              <TableCell align="center">{row.tobeHired}</TableCell>
              <TableCell align="center">{row.duration}</TableCell>
              <TableCell align="center">{row.SDM}</TableCell>
              <TableCell align="center">
                <div style={{
                    display: "flex",
                    justifyContent: "space-evenly"
                }}> 
                    <button className='action-button' onClick={handleOpenStrat}>
                      <EditIcon/>
                    </button>
                    <button className='action-button' onClick={handleOpenView}>
                      <VisibilityIcon/>
                    </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
        <TableBody>
          {(rowsPerPage > 0
            ? projectsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : projectsData
          ).map((project) => (
            <TableRow
              key={project.projectId}
              sx={{ '&:last-child td, &:last-child th': { border: 0, height:'50px' }}}
              style={{paddingBottom: 1, }}
            >
              <TableCell component="th" scope="row">{project.projectID}</TableCell>
              <TableCell align="center">{project.projectName}</TableCell>
              <TableCell align="center">{project.totalResourcesRequired}</TableCell>
              <TableCell align="center">{project.internalResourcesAllocated}</TableCell>
              <TableCell align="center">{project.toBeHired}</TableCell>
              <TableCell align="center">{project.duration} months</TableCell>
              <TableCell align="center">{project.sdm}</TableCell>
              <TableCell align="center">
                <div style={{
                    display: "flex",
                    justifyContent: "space-evenly"
                }}> 
                    <button className='action-button' onClick={() => handleOpenStrat(project)}>
                      <EditIcon/>
                    </button>
                    <button className='action-button' onClick={() => handleOpenView(project)}>
                      <VisibilityIcon/>
                    </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, { label: 'All', value: -1 }]}
                colSpan={9}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                    select: {
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                    },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
      </Table>  
    </TableContainer>
    <StratModal open={isStratOpen} handleClose={handleCloseStrat} data={project}/>
    <ViewModal open={isViewOpen} handleClose={handleCloseView} data={project}/>
    </>
  );
}