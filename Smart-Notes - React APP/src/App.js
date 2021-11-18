import './App.css';
import Header from './Header';
import Footer from './footer';
import Note from './Note';
import FormArea from './FormArea';
import { useState } from 'react';

function App() {

  const [notes,setNotes] = useState([])

  function addNote(note){
    setNotes((preNotes) => {
      return [...preNotes, note];
    });
  }

  function editNote(id, note){

    setNotes((preNotes) => {
       preNotes.forEach( (e,i) => {
        if(i === id){
          e.title = note.title
          e.content = note.content 
        }
        })
        return [...preNotes, note];
    }); 
  }

  function delNote(id){
    if(window.confirm("“Are you sure you want to delete your note?”")){
    setNotes(preNotes => {
      return preNotes.filter((note,index)=> {
        return index!== id 
      })
    })
    }
  }
  
  return (
    <div className="App">
      <Header/>
      <FormArea addNote ={addNote}/>
      {notes.map((note,index)=>(
        <Note id={index} editNote ={editNote} delNote={delNote}  title={note.title} content={note.content} date={note.date}/>
      ))}
      <Footer />
    </div>
  );
}

export default App;
