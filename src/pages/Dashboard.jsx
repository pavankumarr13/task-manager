import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { summary } from "../assets/data";
import { LuClipboardEdit } from "react-icons/lu";
import { FaArrowsToDot, FaNewspaper } from "react-icons/fa6";
import { clsx } from "clsx";
import { PRIOTITYSTYELS, TASK_TYPE, TASK_TYPE_COLOR } from "../utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import axios from "../services/axiosConfig";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300 ">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Status</th>
        <th className="py-2 hidden md:block">Due date</th>
        {/* <th className="py-2 ">Due date</th> */}
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className="text-base text-black">{task.title}</p>
        </div>
      </td>

      {/* Status */}
      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span
            className={clsx(
              "text-base font-semibold  capitalize",
              TASK_TYPE_COLOR[task.stage]
            )}
          >
            {task.stage}
          </span>
        </div>
      </td>

      <td className="py-2 hidden md:inline-block">
        <span className="text-base text-red-400">1 week left</span>
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

const Dashboard = () => {
  const totals = summary.tasks;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Token is missing. Please log in.");
      dispatch(logout());
      //navigate("/login");
      return;
    }

    axios
      .post("/validate-token", { token })
      .then((response) => {
        if (response.data.valid) {
          setLoading(false);
        } else {
          toast.error(response.data.message || "Invalid token. Please log in.");
          dispatch(logout());
          // navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Token validation error:", error);
        toast.error("Invalid token. Please log in.");
        dispatch(logout());
        //navigate("/login");
      });
  }, [token]);

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-sm md:text-sm 2xl:text-lg text-gray-600">
            {label}
          </p>
          <span className="text-2xl font-semibold mb-5">{count}</span>
          {/* <span className="text-sm text-gray-400">{"110 last month"}</span> */}
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white mt-3",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  //Loader
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <TaskTable className="flex-1" tasks={summary.last10Task} />
      </div>
    </div>
  );
};

export default Dashboard;
