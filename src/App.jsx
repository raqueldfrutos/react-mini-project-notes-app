import NoteForm from "./components/NoteForm";
import { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]); // Global state - because it gonna be used in multiple components. When we submit a note it will be added to this notes array
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">📝Notes App</h2>
      <NoteForm notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default App;
