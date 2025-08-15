import { useState } from "react";
import {
  Home,
  Users,
  ClipboardList,
  BarChart2,
  Calendar,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router"; // use react-router-dom here
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    {
      label: "My Prompts",
      icon: <Users size={18} />,
      path: "/dashboard/my-prompts",
    },
    {
      label: "Prompt Editor",
      icon: <ClipboardList size={18} />,
      path: "/dashboard/prompt-editor",
    },
    {
      label: "Search by Tags",
      icon: <BarChart2 size={18} />,
      path: "/dashboard/TagSearch",
    },
    {
      label: "Calendar",
      icon: <Calendar size={18} />,
      path: "/dashboard/calendar",
    },
    {
      label: "Settings",
      icon: <Settings size={18} />,
      path: "/dashboard/settings",
    },
  ];

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.info(response.data.message);
      localStorage.removeItem("user");
     
      navigate("/");
      setIsOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error occurred");
      } else {
        toast.error("Network error");
      }
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden p-4 bg-indigo-900 text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-indigo-900 text-white w-64 lg:w-1/6 flex flex-col justify-between transform transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo & Close */}
        <div className="flex items-center justify-between p-5 font-bold text-lg tracking-wide">
          <span>
            Twit<span className="text-yellow-400">HR</span>
          </span>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1">
          {menuItems.map((item, idx) => (
            <NavLink
              to={item.path}
              end={item.path === "/dashboard"} // only exact match for dashboard
              key={idx}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors
                 hover:bg-indigo-700 ${isActive ? "bg-indigo-700" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Premium Box */}
        <div className="bg-indigo-800 m-3 p-4 rounded-lg text-sm">
          <p className="mb-2 font-semibold">Use our Premium Features Now!</p>
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-indigo-900 font-semibold px-3 py-1 rounded-md"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
