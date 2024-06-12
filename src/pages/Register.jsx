import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AzureTaskManager from "../components/AzureTaskManager";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../services/axiosConfig";

const Register = () => {
  const { isRegistered, setIsRegistered } = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const submitHanndler = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        navigate("/login");
      }
      alert(response.data.message);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto gap-0 md:gap-20  flex  items-center justify-center">
        {/* left-side */}
        <AzureTaskManager />
        {/* right-side */}
        <div className="w-full md:w-1/2 p-4 md:p-1 flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit(submitHanndler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-5 px-10 pt-14 pb-14"
          >
            <div>
              <p className="text-center text-2xl text-green-600 font-bold">
                Welcome !
              </p>
              <p className="text-center text-sm text-gray-700">
                Please fill the credentials to register
              </p>
            </div>
            <div className="flex flex-col gap-y-3">
              <Input
                placeholder="username"
                type="text"
                name="username"
                label="Username"
                className="w-full rounded-full"
                register={register("username", {
                  required: "Username is required!",
                })}
                error={errors.username ? errors.username.message : ""}
              />
              <Input
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Input
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <Input
                placeholder="confirm password"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                className="w-full rounded-full"
                register={register("confirmPassword", {
                  required: "Confirm Password is required!",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                error={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
              />

              <Button
                type="submit"
                label="Register"
                className="w-full h-10 bg-blue-700 text-white rounded-full"
              />
            </div>
            <Link to="/login" className="text-center text-blue-600">
              Alredy have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
