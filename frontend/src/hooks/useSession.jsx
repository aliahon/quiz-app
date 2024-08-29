import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import {
  getUserSessoion,
  createSession as createSessionApi,
  startSession as startSessionApi,
  createAdminSession as createAdminSessionApi,
} from "../api/session";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom/dist";

export default function useSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: () => {
      if (user.user.role === "admin") {
        return Promise.resolve({ session: null });
      } else {
        return getUserSessoion(user.user._id);
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { mutate: createSession, isPending: isCreatingSession } = useMutation({
    mutationFn: () => createSessionApi(user.user._id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const { mutate: startSession, isPending: isStartingSession } = useMutation({
    mutationFn: () => startSessionApi(session.session._id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await queryClient.refetchQueries({ queryKey: ["quiz"] });
      navigate("/quiz-start");
    },
  });

  const { mutate: createAdminSession, isPending: isCreatingAdminSession } =
    useMutation({
      mutationFn: ({ startTime, endTime }) =>
        createAdminSessionApi({ startTime, endTime }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["session"] });
          toast.success("Session a été bien ajouté!");
        },
    
        onError:(err)=>{
            toast.error(err.message || "Session n'a pas été bien ajouté!")
        }
      // onSuccess: async () => {
      //   await queryClient.invalidateQueries({ queryKey: ["session"] });
      // },
    });
    
  
    

  return {
    session,
    isSessionLoading,
    createSession,
    isCreatingSession,
    startSession,
    isStartingSession,
    createAdminSession,
    isCreatingAdminSession,
  };
}
