import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

interface ApiResponse {
  message: string;
  data?: object;
}

const UsernameForm = () => {
  // Handle username update
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {textTheme} = useTheme();

  const handleUpdateUsername = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put<ApiResponse>(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}settings/update-username/`,
        { username },
        { withCredentials: true }
      );

    toast.success(res.data.message);
      setUsername("");
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
    toast.error(error.response?.data?.message || "Error updating username");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Change Username</h2>
      <form onSubmit={handleUpdateUsername}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter new username"
          className="w-full border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-yellow-300 ${textTheme} cursor-pointer font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 disabled:opacity-50`}
        >
          {loading ? "Updating..." : "Update Username"}
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;
