import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    let host = `http://localhost:9000`
    const noteInitial =[]
   
    const [notes, setNotes] = useState(noteInitial)
    const [mode, setMode] = useState("light");
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = '#262626';
            document.body.style.color = 'white';
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
        }
    }
    // Add a note 
    const addNote = async (title, description, tag) => {
        //ToDo api call
        const response1 = await fetch(`${host}/api/notes/addNotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response1.json();
        setNotes(notes.concat(note));
        console.log(note);
        console.log("Adding new notes")
    }
    // Delate a note 
    const delateNote = async (id) => {
        const response1 = await fetch(`${host}/api/notes/delateNotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
        });
        const json = await response1.json();        console.log("Delating a note", id)
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }
    const getNotes= async ()=> {
        const response = await fetch(`${host}/api/notes/fetchalllnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json)
    }
    // Edit a note 
    const editNote = async  (id, title, description, tag) => {
        const response1 = await fetch(`${host}/api/notes/updateNotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response1.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = title;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{ mode: mode, toggle: toggleMode, notes: notes, addNote, editNote, delateNote, getNotes,}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;