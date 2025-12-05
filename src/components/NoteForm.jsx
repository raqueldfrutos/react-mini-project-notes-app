import { useState } from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import TextAreaInput from "./inputs/TextAreaInput";

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
          <TextInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <SelectInput
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { value: "High", label: "🟠High" },
              { value: "Medium", label: "🟡Medium" },
              { value: "Low", label: "🟢Low" },
            ]}
          />

          <SelectInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: "Work", label: "✒️Work" },
              { value: "Personal", label: "🏡Personal" },
              { value: "Ideas", label: "💡Ideas" },
            ]}
          />

          <TextAreaInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover: bg-purple-600 ">
            Add note
          </button>
        </form>
      )}
    </>
  );
};

export default NoteForm;
