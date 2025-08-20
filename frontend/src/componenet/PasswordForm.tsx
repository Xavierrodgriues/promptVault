import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

interface ApiResponse {
  message: string;
  data?: object;
}

const PasswordForm = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { textTheme } = useTheme();

  // Handle password update
  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put<ApiResponse>(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}settings/update-password/`,
        { password },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setPassword("");
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      toast.error(error.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6">
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleUpdatePassword} className="flex flex-col">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full border p-2 rounded-lg mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-yellow-300 ${textTheme} cursor-pointer font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-yellow-400 disabled:opacity-50 text-sm sm:text-base`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;