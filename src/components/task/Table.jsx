import clsx from "clsx";
import {
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { TASK_TYPE, TASK_TYPE_COLOR } from "../../utils";
import { FaEye } from "react-icons/fa6";
import Button from "../Button";

const Table = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300 ">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2 hidden sm:table-cell">Status</th>
        <th className="py-2 hidden md:flex">Due date</th>
        <th className="py-2  md:visible text-center md:text-center">
          Operations
        </th>
        {/* <th className="py-2 ">Due date</th> */}
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-1 ">
          <div
            className={clsx("w-4 h-4 rounded-full ", TASK_TYPE[task.stage])}
          />

          <div className="text-xs text-black ">{task.title}</div>
        </div>
      </td>

      {/* Status */}
      <td className="py-2 hidden sm:table-cell">
        <div className="flex gap-1 items-center">
          <span
            className={clsx(
              "text-xs font-semibold  capitalize",
              TASK_TYPE_COLOR[task.stage]
            )}
          >
            {task.stage}
          </span>
        </div>
      </td>

      <td className="py-2 hidden md:table-cell">
        <span className="text-base text-red-400">1 week left</span>
      </td>

      <td className="p-2 flex justify-center my-auto items-center md:table-cell md:align-middle md:text-center">
        <div className="flex  gap-1 justify-end sm:justify-center">
          <Button
            onClick={() => {}}
            label=""
            icon={<FaEye className="text-xs" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md px-2 py-1 2xl:py-2"
          />
          <Button
            onClick={() => {}}
            label=""
            icon={<MdEdit className="text-xs" />}
            className="flex flex-row-reverse gap-1 items-center bg-yellow-600 text-white rounded-md px-2 py-1 2xl:py-2"
          />
          <Button
            onClick={() => {}}
            label=""
            icon={<MdDelete className="text-xs" />}
            className="flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md px-2 py-1 2xl:py-2"
          />
        </div>
      </td>
      {/* <td className="py-2 hidden md:inline-block">
        <span className="text-base text-gray-600">1 week left</span>
      </td> */}
    </tr>
  );
  return (
    <>
      <div className="w-full  bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
