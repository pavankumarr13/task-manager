import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { TASK_TYPE } from "../utils";
import { tasks } from "../assets/data";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import Toggle from "../components/Toggle/Toggle";
import TaskForm from "../components/TaskForm";
import axios from "../services/axiosConfig";
import { toast } from "sonner";
import TaskModal from "../components/TaskModal";

const Task = () => {
  const params = useParams();

  const [selected, setSelected] = useState("list");
  const [showForm, setShowForm] = useState(false); // sanjay
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleToggle = (e) => {
    setSelected(e.target.value);
  };

  //sanjay
  const handleAddTask = async (data) => {
    //setTasks([...tasks, task]);
    console.log(`Task to be added: ${data}`);
    // setLoading(true);
    // try {
    //   console.log(`Task to be added: ${task}`);
    //   const token = localStorage.getItem("token");
    //   const response = axios.post("/addTask", task, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: token,
    //     },
    //   });
    //   if (response.status === 200) {
    //     toast.success("Task created successfully");
    //     setLoading(false);
    //     setOpen(false);
    //   } else {
    //     toast.error("Task creation failed");
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   console.error("Task creation failed:", error);
    //   toast.error("Task creation failed");
    //   setLoading(false);
    // }
  };

  //pk
  const status = params?.status || "";

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

      {/* <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label="completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={tasks} />
        ) : (
          <div className="w-full">
            <Table tasks={tasks} />
          </div>
        )}
      </Tabs> */}

      {/* {sanjay} */}
      {showForm && (
        // <TaskForm addTask={handleAddTask} setShowForm={setShowForm} />
        <TaskModal open={showForm} onClose={() => setShowForm(false)} />
      )}

      {selected !== "list" ? (
        <BoardView tasks={tasks} />
      ) : (
        <div className="w-full">
          <Table tasks={tasks} />
        </div>
      )}

      {/* <AddTask open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default Task;
