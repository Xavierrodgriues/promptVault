import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthForm = () => {
  const [loginForm, setLoginForm] = useState(true);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: object) => {
    const url = loginForm
      ? "http://localhost:3000/auth/login"
      : "http://localhost:3000/auth/register";
    try {
      const response = await axios.post(url, data, { withCredentials: true });
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Error occurred");
      } else {
        toast.error("Network error");
      }
    }
  };

  return (
    <div className="bg-green-100 h-screen flex flex-col md:flex-row">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 h-full bg-white flex items-center justify-center">
        <div className="flex flex-col gap-5 items-center justify-center w-full max-w-md p-4">
          <h1 className="text-3xl text-center pt-4">Welcome to the App!</h1>
          <div>
            <p className="text-center">
              Simplify your workflow and boost your productivity.
            </p>
            <p className="text-center">Get started for free.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-4">
              {!loginForm && (
                <input
                  type="text"
                  defaultValue={"test"}
                  {...register("username", { required: true })}
                  placeholder="Username"
                  className="border border-black h-10 rounded-2xl pl-4"
                />
              )}
              <input
                type="email"
                defaultValue={"test@gmail.com"}
                {...register("email", { required: true })}
                placeholder="Email"
                className="border border-black h-10 rounded-2xl pl-4"
              />
              <input
                type="password"
                defaultValue={"testt"}
                {...register("password", { required: true })}
                placeholder="Password"
                className="border border-black h-10 rounded-2xl pl-4"
              />
            </div>

            <div className="flex flex-col gap-4 items-center justify-center mt-5 bg-black text-white h-10 rounded-2xl">
              <button type="submit" className="cursor-pointer h-full w-full">
                {loginForm ? "Login" : "Register"}
              </button>
            </div>

            <div className="mt-5 text-center">
              {loginForm ? "Not a member?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setLoginForm((prev) => !prev)}
                className="cursor-pointer text-gray-500"
              >
                {loginForm ? "Register Now" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Image Section (Hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
        <img src="/illustration.png" alt="Illustration" className="" />
      </div>
    </div>
  );
};

export default AuthForm;