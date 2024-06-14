import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import Toggle from "../components/Toggle/Toggle";
import axios from "../services/axiosConfig";
import { toast } from "sonner";
import TaskModal from "../components/TaskModal";
import { useSelector } from "react-redux";
import NoTaskComponent from "../components/NoTaskComponent";

const Task = () => {
  const { user } = useSelector((state) => state.auth);
  const email = user.email;
  const params = useParams();
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState("list");
  const [showForm, setShowForm] = useState(false); // sanjay
  const [EditForm, setEditForm] = useState(false); // to open edit form
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadTasks, setReloadTasks] = useState(false); // for deleting task
  const [added, setAdded] = useState(false); // for adding task
  const status = params?.status || "";
  const handleToggle = (e) => {
    setSelected(e.target.value);
  };

  //sanjay
  // const handleAddTask = async (data) => {
  //   //setTasks([...tasks, task]);
  //   console.log(`Task to be added: ${data}`);
  //   // setLoading(true);
  //   // try {
  //   //   console.log(`Task to be added: ${task}`);
  //   //   const token = localStorage.getItem("token");
  //   //   const response = axios.post("/addTask", task, {
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //       authorization: token,
  //   //     },
  //   //   });
  //   //   if (response.status === 200) {
  //   //     toast.success("Task created successfully");
  //   //     setLoading(false);
  //   //     setOpen(false);
  //   //   } else {
  //   //     toast.error("Task creation failed");
  //   //     setLoading(false);
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Task creation failed:", error);
  //   //   toast.error("Task creation failed");
  //   //   setLoading(false);
  //   // }
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .get("/task/", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          email: email,
        },
      })
      .then((res) => {
        setTasks(filterTask(status, res.data.message));
        setLoading(false);
        setReloadTasks(false);
        setAdded(false);
        setEditForm(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
        setReloadTasks(false);
        setAdded(false);
        setEditForm(false);
      });
  }, [reloadTasks, status, added, EditForm]);

  //pk
  console.log(tasks);
  console.log(`status: ${status}`);
  const filterTask = (status, tasks) => {
    if (status === "completed") {
      return tasks.filter((task) => task.stage === status);
    } else if (status === "in progress") {
      return tasks.filter((task) => task.stage === "in-progress");
    } else if (status === "todo") {
      return tasks.filter((task) => task.stage === status);
    } else {
      return tasks;
    }
  };

  // if (tasks.length === 0) {
  //   return (
  //     <div className="w-full h-full mt-32 justify-center items-center">
  //       <NoTaskComponent />
  //     </div>
  //   );
  // }

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        <Toggle
          className="hidden md:block"
          onOptionsChange={handleToggle}
          selected={selected}
          setLoading={setLoading}
        />

        {!status && (
          <Button
            onClick={() => {
              setOpen(true);
              setShowForm(true);
            }}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md px-3 py-2 2xl:py-2.5"
          />
        )}
      </div>

      {/* {sanjay} */}
      {showForm && (
        // <TaskForm addTask={handleAddTask} setShowForm={setShowForm} />
        <TaskModal
          open={showForm}
          onClose={() => setShowForm(false)}
          added={() => setAdded(!added)}
        />
      )}

      {selected !== "list" ? (
        <BoardView
          tasks={tasks}
          onTaskDelete={() => setReloadTasks(!reloadTasks)}
          onTaskUpdate={() => setEditForm(!EditForm)}
        />
      ) : (
        <div className="w-full">
          <Table
            tasks={tasks}
            onTaskDelete={() => setReloadTasks(!reloadTasks)}
            onTaskUpdate={() => setEditForm(!EditForm)}
          />
        </div>
      )}

      {/* <AddTask open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default Task;
