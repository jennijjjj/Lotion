import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Edit from "./Edit";
import Preview from "./Preview";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {

    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      bodyPlaceholder: "...",
      datePlaceholder: "...",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    // document.querySelectorAll(".app-main-note-edit").forEach((el) => {
    //   el.style.display = "block";
    // });
    navigate(`/${newNote.id}/edit`);

  };

  const onDeleteNote = (noteId) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      const noteIndex = notes.findIndex(({ id }) => id === noteId);
      if (noteIndex > 0) {
        setActiveNote(notes[noteIndex - 1].id);
      } else if (notes.length > 1) {
        setActiveNote(notes[1].id);
      } else {
        setActiveNote(false);
      }
      setNotes(notes.filter(({ id }) => id !== noteId));
    }
  };


  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  const showSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);

    const appMainNoteEdit = document.querySelector('.app-main');
    if (appMainNoteEdit) {
      appMainNoteEdit.style.width = isSidebarVisible ? '1450px' : '900px';
    }
  };

  return (
    <div className="App">
      <div className='header'>
        <Header showSidebar={showSidebar} />
      </div>
      <div className='App-sidebar-main'>
        {isSidebarVisible && (
          <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        )}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path=":id/edit" element={<Edit notes={notes}
                activeNote={getActiveNote()}
                setActiveNote={setActiveNote}
                onUpdateNote={onUpdateNote} 
                onDeleteNote={onDeleteNote} />}></Route>
          <Route path="/:id" element={<Preview  notes={notes}
                activeNote={getActiveNote()}
                setActiveNote={setActiveNote}
                onUpdateNote={onUpdateNote} 
                onDeleteNote={onDeleteNote} />}></Route>
        </Routes>
      </div>

    </div>

  )
}

export default App;
