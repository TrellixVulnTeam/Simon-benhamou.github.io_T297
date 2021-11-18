import { Box,Typography,Modal,Button, Paper} from '@material-ui/core';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormAreaEdit from './FormAreaEdit';


function Note({title, content,id, delNote,date,editNote}) {

      const [note, setNote] = useState({
        title: title,
        content: content,
        date: date
    })

    function clickHandler(){
        delNote(id)
    }
   
     function clickHandlerEdit(){
        
        ReactDOM.render(<FormAreaEdit editNote={editNote} id={id} date={date} title={title} content={content} />, document.getElementById(`id${id}`))
      
     }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
    return (
     
        <Paper style={{
            margin: "15px",
            display:"inline-flex",
            justifyContent:"left",
            padding:"10px",
            minWidth:"100px",
            minHeight:"50px",
        }}>

            <div id={"id"+id}>
            <div style={{ display:"flex",fontSize:"10px",overflow:"hidden",width:"100%"}}>Created: {date.split(" GMT+0200 (heure normale d’Israël)")}</div>
            <h1 onClick={handleOpen} >{title}</h1>
            <p>{content}</p>
            <Button id={id +"edit"} onClick={clickHandlerEdit} style={{marginLeft:"120px"}}>< EditIcon style={{color: "#89d0f0"}}/></Button>
            <Button onClick={clickHandler}> <DeleteIcon style={{color:"red"}}/></Button>
             </div>
              <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">{title}</Typography>
             <Typography id="modal-modal-description" sx={{ mt: 2 }}>{content}</Typography>
            </Box>
             </Modal>
        </Paper>
    )
}

export default Note
