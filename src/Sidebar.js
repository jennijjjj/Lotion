import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, useNavigate,Navigate } from "react-router-dom";
  

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

const SidebarNote = ({ id, title, body, bodyPlaceholder, datePlaceholder, activeNote, setActiveNote, onUpdateNote }) => {
    const navigate = useNavigate();
    const formattedDate = formatDate(datePlaceholder);
    const formatPlaceholder = bodyPlaceholder;

    

    const handleClick = () => {
        const updatedNote = {
            ...activeNote,
            datePlaceholder: Date.now(),
            bodyPlaceholder: body && body.substr(0, 30),
        };
        setActiveNote(id);
        onUpdateNote(updatedNote);
        // navigate("/note/:id");
    };
    return (
        <div className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}>
            <Link to={`/`} className={`sidebar-note-link ${id === activeNote && "active"}`}/>
            <div className="sidebar-note-title">
                <strong>{title}</strong>
            </div>
            <div className="quill">
            <ReactQuill id="quill-sidebar" value={formatPlaceholder && formatPlaceholder.substring(0, 15)} readOnly={true} theme={"bubble"} />

        </div>
            <small className="note-metaa">
                <p id="note-metaa">{formattedDate}</p>
            </small>
        </div>
    );
};

const Sidebar = ({ notes, onAddNote, activeNote, setActiveNote, onUpdateNote }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button onClick={onAddNote}>+</button>
            </div>
            <div className="app-sidebar-notes">
                {sortedNotes.map(({ id, title, body, datePlaceholder, bodyPlaceholder }, i) => (
                    <SidebarNote
                        key={i}
                        id={id}
                        title={title}
                        bodyPlaceholder={bodyPlaceholder}
                        body={body}
                        datePlaceholder={datePlaceholder}
                        activeNote={activeNote}
                        setActiveNote={setActiveNote}
                        onUpdateNote={onUpdateNote}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

