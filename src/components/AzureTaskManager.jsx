import React from "react";
import Spinner from "./Spinner/Spinner";

const AzureTaskManager = () => {
  return (
    <div className="h-full w-full lg:w-2/3 hidden md:flex flex-col  justify-center items-center">
      <div className="w-full md:max-w-lg 2xl:max-w-3xl  md:flex flex-col gap-5 justify-center items-center md:gap-y-10 2xl:-mt-20">
        <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
          Manage Your tasks !
        </span>
        <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-5xl 2xl:text-6xl font-black text-center text-blue-700">
          <span>Azure-Based</span>
          <span>Task-Manager</span>
        </p>
        <Spinner />
      </div>
    </div>
  );
};

export default AzureTaskManager;
