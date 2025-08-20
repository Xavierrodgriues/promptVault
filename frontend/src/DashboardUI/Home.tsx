import Calendar from "../componenet/Calender";
import Clock from "../componenet/Clock";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

type Data = [{
  title: string;
  tags: string[];
}];


const tagColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-red-100 text-red-700",
];


const Home = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [data, setData] = useState<Data>();
  const [totalPrompts, setTotalPrompts] = useState<number>(0);
  const navigate = useNavigate();
  const {activeTheme, textTheme} = useTheme();

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}prompts`, {
        withCredentials: true
      });

      setData(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Error fetching data:", err);
        toast.error(err.response?.data?.message || "Error fetching data");
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred");
      }
    }
  }

  const getTotalPrompts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}prompts/count`, {
        withCredentials: true
      });
      setTotalPrompts(response.data.total);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Error fetching total prompts:", err);
        toast.error(err.response?.data?.message || "Error fetching total prompts");
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred");
      }
    }
  }

  useEffect(() => {
    getData();
    getTotalPrompts();
  }, []);


  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl lg:text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-2 cursor-context-menu">
            <img
              src="https://api.dicebear.com/7.x/identicon/svg"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:block font-semibold">Mr./ Mrs. {user.username}</span>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Card */}
          <div className={`${activeTheme} shadow-md text-white rounded-lg p-6 flex flex-col md:flex-row justify-between items-center`}>
            <div className="max-w-md cursor-context-menu">
              <h2 className="text-lg font-semibold mb-2">Hello {user.username}!</h2>
              <p className="mb-4 text-sm">
                Have you stored your prompt today? If not, then what are you waiting for, go lock something amazing !
              </p>
              <button onClick={() => navigate("/dashboard/prompt-editor")} className={`bg-yellow-300 cursor-pointer hover:bg-yellow-400 ${textTheme} font-semibold px-4 py-2 rounded-md`}>
                Add Prompt
              </button>
            </div>
            <div className="mt-4 md:mt-0">
              <Clock /> {/* Fancy clock here */}
            </div>
          </div>

          {/* Recruitment Progress */}
          <div className="bg-white rounded-lg p-6 shadow-md border-1 border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Community Prompts</h3>
              <button onClick={() => navigate("/dashboard/my-prompts")} className={`${textTheme} font-medium cursor-pointer`}>View All</button>
            </div>

            <div className="space-y-4">
              {data?.map((person, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${idx}`}
                      alt="Random User"
                      className="w-8 h-8 rounded-full"
                    />

                    <div>
                      <p className="font-medium">{person.title}</p>
                      <p className="text-sm flex flex-wrap gap-2">
                        {person.tags.map((tag, i) => {
                          const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
                          return (
                            <span
                              key={i}
                              className={`px-2 py-1 rounded-full text-[10px] font-medium ${randomColor}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="bg-white p-4 rounded-lg shadow">
            <Calendar />
          </div>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <img
              src="https://api.dicebear.com/7.x/identicon/svg"
              alt="Mr Smith"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h4 className="font-semibold">Mr./Mrs. {user.username}</h4>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Joining Date:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
              <p>
                <strong>Prompts:</strong> {totalPrompts} Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
