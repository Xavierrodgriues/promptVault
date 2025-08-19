import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";

const DashBoard = () => {
  const {bodyTheme} = useTheme();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className={`${bodyTheme} flex-1 p-5`}>
        {/* Main dashboard content */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;