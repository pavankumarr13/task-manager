import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const params = useParams();
  const task_id = params?.id;
  const [task, setTask] = useState({});

  return <div className="w-full py-4 grid grid-cols-1">TaskDetails</div>;
};

export default TaskDetails;
