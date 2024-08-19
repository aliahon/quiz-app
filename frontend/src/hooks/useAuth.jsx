import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, loginApi, logoutApi } from "../api/auth";
import axios from "../lib/axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    retry: false,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 60,
  });

  const userRole = user?.user.role;

  const {
    mutate: login,
    isPending: isLogging,
    error: loginError,
  } = useMutation({
    mutationFn: ({ credentials, password }) => loginApi(credentials, password),
    onSuccess: async (data) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: async () => {
      axios.defaults.headers.common["Authorization"] = null;
      queryClient.removeQueries();
      navigate("/auth");
    },
  });

  useEffect(() => {
    if (userRole === "admin") navigate("/admin");
    if (userRole === "user" && pathname === "/") {
      navigate("/session");
    }
  }, [userRole, navigate, pathname]);

  return {
    login,
    isLogging,
    user,
    isUserLoading,
    logout,
    isLoggingOut,
    loginError,
  };
}
