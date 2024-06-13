import React, { useState } from "react";
import { TASK_TYPE, formatDate } from "../utils";
import clsx from "clsx";
import { FaEye } from "react-icons/fa6";
import Button from "./Button";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "../services/axiosConfig";
import { toast } from "sonner";
import EditModel from "./EditModel";
import ViewTaskDetails from "./ViewTaskDetails";

const TaskCard = ({ task, onTaskDelete, onTaskUpdate }) => {
  const [showEditForm, setShowEditForm] = useState(false); // to open edit form
  const [showViewForm, setShowViewForm] = useState(false); // to open view form
  const token = localStorage.getItem("token");
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`/task/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        onTaskDelete();
        // window.location.reload();
        // navigate("/tasks");
      })
      .catch((err) => {
        console.log(err);
        toast.error(res.data.message);
      });
  };

  return (
    <div className="w-full h-fit bg-white shadow-md p-4 rounded">
      <>
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "w-[16px] h-[16px] rounded-full",
              TASK_TYPE[task.stage]
            )}
          />
          <h4 className="line-clamp-1 text-black text-base">{task?.title}</h4>
        </div>
        <span className="text-sm text-gray-600 ml-6">
          {formatDate(new Date(task?.due))}
        </span>
        <div className="border-t border-gray-300 my-2" />
        <div className="flex mt-2 gap-2 justify-end sm:justify-normal">
          <Button
            onClick={() => {
              setShowViewForm(true);
            }}
            label=""
            icon={<FaEye className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md px-3 sm:px-2 py-2 2xl:py-2.5"
          />
          <Button
            onClick={() => {
              setShowEditForm(true);
            }}
            label=""
            icon={<MdEdit className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-yellow-600 text-white rounded-md px-3 sm:px-2 py-2 2xl:py-2.5"
          />
          <Button
            onClick={() => handleDelete(task._id)}
            label=""
            icon={<MdDelete className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md px-3 sm:px-2 py-2 2xl:py-2.5"
          />
        </div>
        {showEditForm && (
          <EditModel
            title={task.title}
            description={task.description}
            due={task.due}
            stage={task.stage}
            id={task._id}
            onClose={() => setShowEditForm(false)}
            onTaskUpdate={onTaskUpdate}
          />
        )}
        {showViewForm && (
          <ViewTaskDetails
            title={task.title}
            description={task.description}
            due={task.due}
            stage={task.stage}
            onClose={() => {
              setShowViewForm(false);
            }}
          />
        )}
      </>
    </div>
  );
};

export default TaskCard;
