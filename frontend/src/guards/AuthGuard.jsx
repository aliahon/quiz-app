import { Outlet, useNavigate } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import useAuth from "../hooks/useAuth";

export default function AuthGuard() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();
  if (isUserLoading) return <LoadingState />;
  if (!user) return navigate("/auth");

  return <Outlet />;
}
