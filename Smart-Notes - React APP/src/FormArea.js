import {Fab,Paper,TextField} from '@material-ui/core'
import React, { useState } from 'react'

function FormArea({addNote}) {
    const [note, setNote] = useState({
        title: "",
        content:"",
        date: "",
    })
    function clickHandler(){
        if(note.content !== ""){

        addNote(note);
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
                <span name="date" value={note.date = Date(Date.now())} label ="date"  fullWidth autoComplete="on"></span>
            </form>
            <Fab onClick={clickHandler} style={{marginTop:"2rem"}}>+</Fab>
        </Paper>
        </div>
    )
}

export default FormArea
