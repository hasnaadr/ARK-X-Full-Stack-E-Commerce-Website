import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./sideBar";
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    <div className="flex  justify-center">
      <Sidebar />

      <div className="w-full px-4 pb-8">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/sign-in" />
  );
}
