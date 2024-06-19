import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import axios from "../services/axiosConfig";
import { toast } from "sonner";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const submitHanndler = async (data) => {
    try {
      console.log(data);

      const response = await axios.post("/login", data);
      console.log(response.headers["authorization"]);
      const token = response.headers["authorization"];
      console.log(token);
      // Assuming token is in the 'authorization' header
      console.log(response.data.user);
      if (token && response.status === 200) {
        localStorage.setItem("token", token);
        toast.success("Login successful");
        dispatch(setCredentials(response.data.user));
        console.log(user);
        //navigate("/dashboard");
      } else {
        alert("Token not found in response");
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message);
    }
    user && navigate("/dashboard");
  }, [user, location]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto gap-0 md:gap-20  flex  items-center justify-center">
        {/* left-side */}
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
        {/* right-side */}
        <div className="w-full md:w-1/2 p-4 md:p-1 flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit(submitHanndler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 px-10 pt-14 pb-14"
          >
            <div>
              <p className="text-center text-2xl text-blue-600 font-bold">
                Welcome Back !
              </p>
              <p className="text-center text-sm text-gray-700">
                Please fill the details for Authentication
              </p>
            </div>
            <div className="flex flex-col gap-y-5">
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

              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Forget Password?
              </span>

              <Button
                type="submit"
                label="Login"
                className="w-full h-10 bg-blue-700 text-white rounded-full"
              />
            </div>
            <Link to="/register" className="text-center text-blue-600">
              Don't have an account? Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
