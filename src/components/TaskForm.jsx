import React, { useState } from "react";
import Modal from "./Modal";

const TaskForm = ({ addTask, setShowForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    if (!title) {
      setTitleError("Task Title is required");
      hasError = true;
    } else {
      setTitleError("");
    }
    if (!description) {
      setDescError("Task Description is required");
      hasError = true;
    } else {
      setDescError("");
    }
    if (!dueDate) {
      setDueDateError("Due Date is required");
      hasError = true;
    } else {
      setDueDateError("");
    }
    if (hasError) {
      return;
    }

    addTask({ title, description, dueDate, status });
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("todo");
    setShowForm(false);
  };

  return (
    <Modal onClose={() => setShowForm(false)}>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Task Title</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
        />
        {titleError && <div className="mb-4 text-red-600">{titleError}</div>}
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Task Description
        </h3>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
        />
        {descError && <div className="mb-4 text-red-600">{descError}</div>}
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Due Date</h3>
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
          min={getTodayDate()} // Prevent selecting dates before today
        />
        {dueDateError && (
          <div className="mb-4 text-red-600">{dueDateError}</div>
        )}
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Status</h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full bg-gray-100 text-gray-800 focus:outline-none focus:border-purple-500 focus:text-black"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
