import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const notes = JSON.parse(localStorage.getItem("notes")); // as default value we pass the notes saved in LocalStorage. We we reload the page the state will run with this default value
    return notes || []; // if there are no notes in localStorage, value is empty
  }); // Global state - because it gonna be used in multiple components. When we submit a note it will be added to this notes array

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]); // will run this when notes changes which includes when it sets its empty default value at the beggining. This saves the notes created in localStorage (session expired)

  const deleteNote = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== id)); //this filters out the note we want to delete
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">📝Notes App</h2>
      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} deleteNote={deleteNote} />
    </div>
  );
};

export default App;

//We are only keeping the notes in state, so when we reload the page they will desappears
