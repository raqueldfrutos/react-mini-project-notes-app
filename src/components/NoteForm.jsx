import { useState } from "react";

const NoteForm = ({ notes, setNotes }) => {
  // const [title, setTitle] = useState("");
  // const [priority, setPriority] = useState("Medium");
  // const [category, setCategory] = useState("Work");
  // const [description, setDescription] = useState("");

  // Form Data Object - to avoid creating a single state for each field. To set the respective values, We need to add 'name' attribute to each field and it has to match with the names inside the useState. Also create handleChange function
  const [formData, setFormData] = useState({
    title: "",
    category: "Work",
    prioriry: "Medium",
    description: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value, e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validation
    if (!formData.title || !formData.description) return; // return nothing = not submitting

    //Create note object with new note submitted + adding id for the unique value (not recomended using date in prod)
    const newNote = { id: Date.now(), ...formData };

    // Add new note to Global state along with the rest that were already there
    setNotes([newNote, ...notes]);

    //Reset form data
    setFormData({
      title: "",
      category: "Work",
      prioriry: "Medium",
      description: "",
    });
  };

  return (
    <>
      {/* Toggle Button - In the onclick, we change the state of the varible to the opposite value of what it has using '!'*/}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover: border-purple-300 transition mb-4"
      >
        {isFormVisible ? "✖️ Hide Form" : "➕ Add New Note"}
      </button>

      {/* Form - if the variable isFormVisible is true, display form*/}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="w-full p-2 border rounded-lg"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="priority" className="block font-semibold">
              Priority
            </label>
            <select
              name="priority"
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="High">🔴High</option>
              <option value="Medium">🟡Medium</option>
              <option value="Low">🟢Low</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block font-semibold">
              Category
            </label>
            <select
              name="category"
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Ideas">Ideas</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover: bg-purple-600 ">
              Add note
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default NoteForm;
