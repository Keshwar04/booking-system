import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
