import React, { useEffect, useRef, useState, } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Noteiteam from './Noteiteam'
import Addnotes from './Addnotes'
import { useNavigate } from 'react-router-dom'
function Notes(props) {
    let history = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            valuee.getNotes()
        } else {
            history('/login')
        }
    },[])
    const valuee = useContext(NoteContext)
    const ref = useRef(null)
    const refclose = useRef(null)
    const [notes, setNotes] = useState({ id:'',title: "",description: "", tag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNotes({id:currentNote._id,title:currentNote.title,description:currentNote.description,tag:currentNote.tag})
    }

    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }
    const handelClick = (e) => {
        e.preventDefault();
        refclose.current.click();
        valuee.editNote(notes.id,notes.title,notes.description,notes.tag)
        props.showAlert("Updated SuccessFully","success")
    }
    return (
        <>
            <Addnotes showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" >
                <div className="modal-dialog" >
                    <div className="modal-content" style={{ backgroundColor: valuee.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color: valuee.mode === "dark" ? 'white' : 'black' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={notes.title} aria-describedby="emailHelp" name='title' style={{ backgroundColor: valuee.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color: valuee.mode === "dark" ? 'white' : 'black' }} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" value={notes.description} name='description' style={{ backgroundColor: valuee.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color: valuee.mode === "dark" ? 'white' : 'black' }} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" value={notes.tag} name='tag' style={{ backgroundColor: valuee.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color: valuee.mode === "dark" ? 'white' : 'black' }} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handelClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="continer">
               <h4 id='dan'>{valuee.notes.length===0&&`No Notes to display`}</h4>
                </div>
                {valuee.notes.map((note) => { return <Noteiteam key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} /> })}
            </div>
        </>
    )
}

export default Notes
