import { Router, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

function Edit({ notes, activeNote, setActiveNote, onUpdateNote, onDeleteNote }) {
    // const { id } = useParams();
    const navigate=useNavigate();
    console.log(activeNote);
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
  
        ]
      ],
    };

    const [pendingChanges, setPendingChanges] = useState({
      lastModified: activeNote.lastModified || Date.now()
    });
    
  
    const onEditField = (fieldName, value) => {
      setPendingChanges({
        ...pendingChanges,
        [fieldName]: value
      });
    };
    
    const onSaveNote = () => {
      const updatedNote = {
        ...activeNote,
        ...pendingChanges,
        bodyPlaceholder: pendingChanges.body || activeNote.body,
        datePlaceholder: pendingChanges.lastModified || activeNote.lastModified || Date.now(),
        lastModified: pendingChanges.lastModified || activeNote.lastModified || Date.now()
      };
      onUpdateNote(updatedNote);
      setPendingChanges({});
      navigate(`/${activeNote.id}`);
    
    };

    if (!activeNote) {
      navigate("/");
    }
    
    return (
        <div className="app-main">

            <div className="app-main-note-edit">

                <div className='app-main-header'>
                    <input
                        type="text"
                        id="title_input"
                        placeholder="Note Title"
                        value={pendingChanges.title || activeNote.title}
                        onChange={(e) => onEditField("title", e.target.value)}
                        autoFocus
                    />


                    <div className="app-main-icons">
                        <button onClick={(e) => onSaveNote()}>Save</button>
                        <button onClick={(e) => onDeleteNote(activeNote.id)}>Delete</button>
                    </div>
                </div>
                <input
                  id="app-main-edit-date"
                  type="datetime-local"
                  value={
                    pendingChanges.lastModified ||
                    (activeNote.lastModified &&
                      (new Date(activeNote.lastModified).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      }).replace(',', '').replace(/\//g, '-').replace(' ', 'T').replace(/^(\d{2})-(\d{2})-(\d{4})/, '$3-$1-$2')))
                  }
                  onChange={(e) => onEditField("lastModified", e.target.value)}
                />

                <div className="App-main-editor">
                    <ReactQuill
                        id="body_input"
                        placeholder="Write your note here..."
                        theme="snow"
                        value={pendingChanges.body || activeNote.body}
                        onChange={(value) => onEditField("body", value)}
                        modules={modules}
                    />
                </div>
            </div>
        </div>
    );
};




export default Edit;