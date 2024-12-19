// React.js Notes App

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
import "./App.css";
import config from "./config.js"

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/notes`);
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    if (!noteInput.trim()) return;
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/notes`, { content: noteInput });
      setNotes([...notes, response.data.data]);
      setNoteInput("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${config.API_BASE_URL}/api/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };



  return (
    <div className="App">
      <nav className="navbar">
      <BsFilterLeft className="filter-left"/>
        <h1>Notes</h1>
      </nav>
      <div className="main-content">
        <textarea
          className="note-input"
          placeholder="Add a Note"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        
        ></textarea>
        <div className="button-container"><button onClick={addNote}>Enter</button></div>
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <p className="note-content">{note.content}</p>
              <div className="time-button-container">
                <span className="time">{note.created_at}</span>
                <button className="note-card-button" onClick={() => deleteNote(note.id)} ><MdDelete className="delete-icon"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;



