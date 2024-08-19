import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NotFound from "../components/NotFound";

export default function CandidateMiddleware() {
  const { user } = useAuth();
  if (user.user.role !== "user") return <NotFound />;
  return <Outlet />;
}
