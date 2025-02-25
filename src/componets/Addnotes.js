import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

function Addnotes(props) {
    const valuee = useContext(NoteContext)
    const [notes, setNotes] = useState({title:"",description:"",tag:""});
    const handelClick =(e)=> {
        e.preventDefault();
        valuee.addNote(notes.title,notes.description,notes.tag)
        setNotes({title:"",description:"",tag:""})
        props.showAlert("Add Note SuccessFully","success")
    }
    const onChange = (e)=> {
        setNotes({...notes,[e.target.name]: e.target.value})
    }
  return (
    <div className='container my-3'>
    <h3>Add a Note</h3>
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' value={notes.title} style={{ backgroundColor: valuee.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color: valuee.mode === "dark" ? 'white' : 'black' }} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label"> Description</label>
        <input type="text" className="form-control" id="description" name='description'  value={notes.description}  style={{ backgroundColor: valuee.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color: valuee.mode === "dark" ? 'white' : 'black' }} onChange={onChange}  />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label"> Tag</label>
        <input type="text" className="form-control" id="description" name='tag'  value={notes.tag}  style={{ backgroundColor: valuee.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color: valuee.mode === "dark" ? 'white' : 'black' }} onChange={onChange}  />
      </div>
        <button disabled={notes.title.length<5||notes.description.length<5} id='Submit' type="submit" onClick={handelClick} className={`btn btn-${valuee.mode}`} style={{ border: valuee.mode === "dark" ? "1px solid white" : ' 1px solid grey' }}>Add Note</button>
    </form>
  </div>
  )
}

export default Addnotes
