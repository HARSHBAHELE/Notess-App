import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
function Noteiteam(props) {
    const valuee = useContext(NoteContext)
    const { note, updateNote} = props
    return (
        <>
        <div className='col-md-3'>
            <div className="card my-3" style={{ backgroundColor: valuee.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color: valuee.mode === "dark" ? 'white' : 'black' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle my-1">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{valuee.delateNote(note._id);props.showAlert("Delated SuccessFully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
                </div>
            </div>
        </div>
        </>
    )
}

export default Noteiteam
