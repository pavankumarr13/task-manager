import React from "react";
import CloudIcon from "./CloudIcon";

const NoTaskComponent = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <CloudIcon />
    <p className="text-gray-500 text-lg mt-4">
      No tasks available at the moment.
    </p>
  </div>
);

export default NoTaskComponent;
