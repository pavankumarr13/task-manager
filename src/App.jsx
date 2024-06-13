import React, { Fragment, useEffect, useRef, useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Task from "./pages/Task";
import TaskDetails from "./pages/TaskDetails";
import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/Register";
import Sidebar from "./pages/Sidebar";
import { Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import Navbar from "./components/Navbar";
import { setOpenSidebar } from "./redux/slices/authSlice";
import Footer from "./components/Footer/Footer";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/3  md:w-1/4 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar className="z-10" />
      <div className="flex-1 overflow-y-auto z-0">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
        <Footer className="w-2/3 md:w-3/4 z-[1]" />
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);

  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {
          <div
            ref={(node) => {
              mobileMenuRef.current = node;
            }}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform z-50",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => {
              closeSidebar();
              console.log(mobileMenuRef.current);
            }}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 relative">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose
                    size={25}
                    className="absolute right-5 top-6"
                    onClick={() => {
                      closeSidebar();
                    }}
                  />
                </button>
              </div>

              <div className="-mt-5 absolute top-5 ">
                <Sidebar />
              </div>
            </div>
          </div>
        }
      </Transition>
    </>
  );
};

const App = () => {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/completed/:status" element={<Task />} />
          <Route path="/in-progress/:status" element={<Task />} />
          <Route path="/todo/:status" element={<Task />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
};

export default App;
