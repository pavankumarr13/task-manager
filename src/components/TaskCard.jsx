import React from "react";
import { TASK_TYPE, formatDate } from "../utils";
import clsx from "clsx";
import { FaEye } from "react-icons/fa6";
import Button from "./Button";
import { MdDelete, MdEdit } from "react-icons/md";

const TaskCard = ({ task }) => {
  return (
    <div className="w-full h-fit bg-white shadow-md p-4 rounded">
      {/* <div className="w-full flex justify-between">
        <div
          className={clsx(
            "flex flex-1 gap-1 items-center text-sm font-medium",
            PRIOTITYSTYELS[task?.priority]
          )}
        >
          <span className="text-lg">{ICONS[task?.priority]}</span>
          <span className="uppercase">{task?.priority} Priority</span>
        </div>

        {user?.isAdmin && <TaskDialog task={task} />}
      </div> */}

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
          {formatDate(new Date(task?.date))}
        </span>
        <div className="border-t border-gray-300 my-2" />
        <div className="flex mt-2 gap-2 justify-end sm:justify-normal">
          <Button
            onClick={() => {}}
            label=""
            icon={<FaEye className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md px-3 sm:px-2 py-2 2xl:py-2.5"
          />
          <Button
            onClick={() => {}}
            label=""
            icon={<MdEdit className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-yellow-600 text-white rounded-md px-3 sm:px-2 py-2 2xl:py-2.5"
          />
          <Button
            onClick={() => {}}
            label=""
            icon={<MdDelete className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md px-3 sm:px-2 py-2 2xl:py-2.5"
          />
        </div>
      </>
    </div>
  );
};

export default TaskCard;
