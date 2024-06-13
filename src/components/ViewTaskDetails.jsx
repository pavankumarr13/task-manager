import clsx from "clsx";
import React from "react";
import ReactDOM from "react-dom";
import { TASK_TYPE_COLOR } from "../utils";

const ViewTaskDetails = ({ title, description, due, stage, onClose }) => {
  return ReactDOM.createPortal(
    <div>
      <div className="fixed top-0 right-0 left-0 bottom-0 z-[1000] bg-[rgba(0,0,0,0.7)]"></div>
      <div className="absolute top-2/3 md:top-[60%] right-1/2 translate-x-1/2 -translate-y-1/2 md:-translate-y-[60%] bg-white w-[300px] md:w-[450px] flex justify-center items-center p-4 rounded-sm z-[1000] overflow-y-auto">
        <button
          className="absolute top-10 right-10 text-red-600 text-base p-2 border w-6 h-6 text-center flex justify-center items-center rounded-sm font-bold cursor-pointer"
          onClick={onClose}
        >
          X
        </button>
        <div className="w-full md:w-[400px] flex flex-col gap-y-8 px-10 pt-14 pb-14">
          <div>
            <p className="text-center text-2xl text-blue-600 font-bold">
              Task Details
            </p>
            <p className="text-center text-sm text-gray-700">
              Here are the details of the task
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="font-bold">Title:</p>
              <p>{title}</p>
            </div>
            <div>
              <p className="font-bold">Description:</p>
              <p>{description}</p>
            </div>
            <div>
              <p className="font-bold ">Due Date:</p>
              <p className="text-red-600">{due}</p>
            </div>
            <div>
              <p className="font-bold">Status:</p>
              <p className={clsx("capitalize", TASK_TYPE_COLOR[stage])}>
                {stage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modalRoot")
  );
};

export default ViewTaskDetails;
