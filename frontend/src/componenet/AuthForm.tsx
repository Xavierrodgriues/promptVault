import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthForm = () => {
  const [loginForm, setLoginForm] = useState(true);
  const [require2FA, setRequire2FA] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: object) => {
    const url = loginForm
      ? `${import.meta.env.VITE_BACKEND_ENDPOINT}auth/login`
      : `${import.meta.env.VITE_BACKEND_ENDPOINT}auth/register`;

    try {
      const response = await axios.post(url, data, { withCredentials: true });

      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 403 && error.response.data.message === "2FA token required") {
        // Backend says password correct but need OTP
        setRequire2FA(true);
        toast.info("Enter your 2FA code");
      } else if (axios.isAxiosError(error) && error.response) {
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-4">
              {/* Registration needs username */}
              {!loginForm && (
                <input
                  type="text"
                  {...register("username", { required: true })}
                  placeholder="Username"
                  className="border border-black h-10 rounded-2xl pl-4"
                />
              )}

              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="border border-black h-10 rounded-2xl pl-4"
              />

              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className="border border-black h-10 rounded-2xl pl-4"
              />

              {/* If backend requires OTP, show OTP input */}
              {require2FA && (
                <input
                  type="text"
                  {...register("token", { required: true })}
                  placeholder="Enter 2FA Code"
                  className="border border-black h-10 rounded-2xl pl-4"
                />
              )}
            </div>

            <div className="flex flex-col gap-4 items-center justify-center mt-5 bg-black text-white h-10 rounded-2xl">
              <button type="submit" className="cursor-pointer h-full w-full">
                {loginForm ? (require2FA ? "Verify 2FA" : "Login") : "Register"}
              </button>
            </div>

            <div className="mt-5 text-center">
              {loginForm ? "Not a member?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setLoginForm((prev) => !prev);
                  setRequire2FA(false);
                  reset();
                }}
                className="cursor-pointer text-gray-500"
              >
                {loginForm ? "Register Now" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
        <img src="/illustration.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default AuthForm;