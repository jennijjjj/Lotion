import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};

const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
        return "";
    }
    return formatted;
};



function Preview({ notes, activeNote, setActiveNote, onUpdateNote, onDeleteNote  }) {
    const navigate = useNavigate();
    if (!activeNote) {
        navigate("/");
      }

    const EditPage=()=>{
        navigate(`/${activeNote.id}/edit`);
    }

    
      
    return (
        <div className="app-main-note-preview">
            <div className="app-main-preview-header">
                <h1 className="preview-title">{activeNote.title}</h1>
                <div className="app-main-preview-icons">
                    <button onClick={(e) => EditPage()}>Edit</button>
                    <button onClick={(e) => onDeleteNote(activeNote.id)}>Delete</button>
                </div>
            </div>

            <small className="note-meta">
                {formatDate(activeNote.lastModified)}
            </small>
            <div className="markdown-preview">
                <ReactQuill
                    value={activeNote.body}
                    readOnly={true}
                    theme={"bubble"}
                />
            </div>

        </div>
    )
};

export default Preview;