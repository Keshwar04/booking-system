import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-slate-200 py-4 px-8 h-screen w-full overflow-scroll scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
