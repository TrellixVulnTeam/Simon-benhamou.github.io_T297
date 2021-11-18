import {Button,Paper,TextField} from '@material-ui/core'
import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import CheckIcon from '@material-ui/icons/Check';
import Note from './Note';

function FormAreaEdit(props) {

    const [note, setNote] = useState({
        title: props.title,
        content: props.content,
        date: props.date,
    })

    function clickHandler(){
        if(note.content !== ""){
        document.getElementById(`id${props.id}`).parentNode.remove()
        props.editNote(props.id, note);
        setNote({  title: "",
        content:"",date: ""})

        }
     
    }

    function changeHandler(event){
        const {name, value} = event.target 
        setNote(preValues => {
            return {
                ...preValues,[name]:value
            }
        })
    }

    return (
        <div style={{display:"flex",
            justifyContent:"center"}}>
        <Paper style={{ 
            margin:"10px",
            padding: "15px 50px",
            width:"50%",
            }}>
            <form>
                <TextField onChange={changeHandler} name="title" value={note.title} label ="Title (optional)" style={{width:"70%"}} autoComplete="off" />
                <TextField onChange={changeHandler} name="content" value={note.content} label ="Content (required)" multiline rows={2} style={{width:"70%"}} autoComplete="off" />
                <span name="date" value={note.date} label ="date"  fullWidth autoComplete="on"></span>
            </form>
            <Button><CheckIcon onClick={clickHandler}/></Button>
        </Paper>
        </div>
    )
}

export default FormAreaEdit
