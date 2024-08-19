import NotFound from "../components/NotFound";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

export default function AdminMiddleware() {
  const { user } = useAuth();
  if (user.user.role !== "admin") return <NotFound />;
  return <Outlet />;
}
