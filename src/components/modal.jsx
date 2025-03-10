/* eslint-disable react/display-name */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { forwardRef,useImperativeHandle } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = forwardRef(function BasicModal(props, ref){
const [open, setOpen] = React.useState(false);
const [text, setText] = React.useState('');
  const handleOpen = (text) =>{ 
    setOpen(true)
    setText(text)
  }
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref,()=>{
    return{
    modalMethodOpen(text){
        handleOpen(text);
    },
    modalMethodClose(){
        handleClose();
    }
};
})

 
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {text}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
})
export default BasicModal