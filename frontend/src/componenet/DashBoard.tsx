import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const DashBoard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="bg-zinc-100 flex-1 p-5">
        {/* Main dashboard content */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;