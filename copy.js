import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height:1000,

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display:'felx',
  flexDirection:'column',
  maxHeight:'400px',
  overflowY:'auto'

};
const remarksStyle={
  flexGrow:1,
  overflowY:'auto',
  marginBottom:'10px',
  maxHeight:'250px'
}
const textAreaStyle={
  width:'100%',
  height:'100px',
  resize:'vertical',
}


const RemarkModal = ({ open, handleClose, remark, newRemark, setNewRemark, handleSaveRemark }) => {
  return (
    
    <Modal 
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Remarks
        </Typography>
        <Box sx={remarksStyle}>
          <div>
             {remark.map((remark) => (
             <div key={remark.id} >
             <div>{remark.remarkDate}</div>
             <div>-</div>
             <div>{remark.authour}</div>
             <div>:</div>
             <div>{remark.remarkText}</div>
             </div>
  ))}
          </div>

        
          
            
           
          
        
        </Box>
        <textarea
        style={textAreaStyle}
          label="New Remark"
          variant="outlined"
          fullWidth
          multiline
          margin="normal"
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
          InputProps={{
            style:{resize:'vertical'}
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSaveRemark}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default RemarkModal;