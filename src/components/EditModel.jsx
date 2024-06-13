import React, { useEffect } from "react";
import AddTaskInput from "./AddTaskInput/AddTaskInput";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { getTodayDate } from "../utils";
import axios from "../services/axiosConfig";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const EditModel = ({
  title,
  description,
  due,
  stage,
  id,
  onClose,
  onTaskUpdate,
}) => {
  const { user } = useSelector((state) => state.auth);
  const email = user.email;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
      description: description,
      dueDate: due,
      stage: stage,
    },
  });

  const submitHanndler = async (data) => {
    try {
      console.log(`Task to be added: ${data.category}`);
      console.log(`due date is ${data.dueDate}`);
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `/task/updateTask/${id}`,
        { ...data, email },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        onClose();
        onTaskUpdate();
        // added();
      } else {
        toast.error("Task update failed");
        onClose();
        onTaskUpdate();
      }
    } catch (error) {
      console.error("Task update failed:", error);
      toast.error("Task update failed");
    }
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      <div className="fixed top-0 right-0 left-0 bottom-0 z-[1000] bg-[rgba(0,0,0,0.7)]"></div>
      <div className="absolute top-2/3 mt-0 sm:mt-20 md:mt-14 lg:mt-1 md:top-[60%] right-1/2 translate-x-1/2 -translate-y-1/2 md:-translate-y-[60%] bg-white w-[300px] md:w-[450px] flex justify-center items-center p-4 rounded-sm z-[1000] overflow-y-auto">
        <button
          className="absolute top-10 right-10 text-red-600 text-base  p-2 border w-6 h-6 text-center flex justify-center items-center rounded-sm font-bold cursor-pointer"
          onClick={onClose}
        >
          X
        </button>
        <form
          onSubmit={handleSubmit(submitHanndler)}
          className=" w-full md:w-[400px] flex flex-col gap-y-8 px-10 pt-14 pb-14"
        >
          <div>
            <p className="text-center text-2xl text-blue-600 font-bold">
              Task Form
            </p>
            <p className="text-center text-sm text-gray-700">
              Feel free to edit the task details
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <AddTaskInput
              title="Title"
              type="text"
              name="title"
              defaultValue={title}
              placeholder="Enter task title"
              className="w-full rounded-full"
              register={register("title", { required: "Title is required!" })}
              error={errors.title ? errors.title.message : ""}
            />
            <AddTaskInput
              title="Description"
              type="text"
              name="description"
              defaultValue={description}
              placeholder="Enter task description"
              className="w-full rounded-full"
              register={register("description", {
                required: "Description is required!",
              })}
              error={errors.description ? errors.description.message : ""}
            />
            <AddTaskInput
              title="Due date"
              type="date"
              name="dueDate"
              defaultValue={due}
              placeholder="Enter task description"
              className="w-full rounded-full"
              min={getTodayDate()}
              register={register("dueDate", {
                required: "Due is required!",
                min: { value: getTodayDate(), message: "Invalid date" },
              })}
              error={errors.dueDate ? errors.dueDate.message : ""}
            />

            <select
              className="w-full h-[44px] rounded-lg border border-gray-300 px-3 py-2 text-base"
              id="stage"
              defaultValue={stage}
              {...register("stage", { required: true })}
            >
              <option value="" disabled>
                Status
              </option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.category && <span>This field is required</span>}
            <div className="border-b-[1px] my-2 mt-3 border-gray-300" />

            <button
              type="submit"
              className="w-full h-10 bg-blue-700 text-white rounded-full"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modalRoot")
  );
};

export default EditModel;
