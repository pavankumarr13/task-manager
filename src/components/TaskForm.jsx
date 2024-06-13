import React, { useState } from "react";
import Modal from "./Modal";
import axios from "../services/axiosConfig";
import { toast } from "sonner";

const TaskForm = ({ addTask, setShowForm, setLoading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [stage, setstage] = useState("todo");
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

  const submitHanndler = async (data) => {
    try {
      console.log(`Task to be added: ${data}`);
      const token = localStorage.getItem("token");
      const response = await axios.post("/task/addTask", data, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (response.status === 200) {
        toast.success("Task created successfully");
        setLoading(false);
        setOpen(false);
      } else {
        toast.error("Task creation failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Task creation failed:", error);
      toast.error("Task creation failed");
      setLoading(false);
    }
  };

  const handleSubmit = (e, data) => {
    console.log("inside handleSubmit");
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
    // axios req
    submitHanndler(data);
    addTask({ title, description, dueDate, stage });
    setTitle("");
    setDescription("");
    setDueDate("");
    setstage("todo");
    setShowForm(false);
  };

  return (
    <Modal onClose={() => setShowForm(false)}>
      <form onSubmit={submitHanndler}>
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
        <h3 className="text-lg font-semibold text-blue-800 mb-2">stage</h3>
        <select
          value={stage}
          onChange={(e) => setstage(e.target.value)}
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
            onClick={handleSubmit}
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
