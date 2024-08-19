import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import {
  getAllUsers,
  addUser as addUserApi,
  deleteUser as deleteUserApi,
  getUserMarks,
} from "../api/user";
import useAuth from "./useAuth";

export default function useUser() {
  const queryClient = useQueryClient();
  const { user, isUserLoading } = useAuth();

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      if (!isUserLoading && user.user.role === "admin") {
        return getAllUsers();
      }
      return Promise.resolve(null);
    },
    staleTime: 60 * 60 * 24 * 7,
  });

  const { data: marks, isLoading: isMarksLoading } = useQuery({
    queryKey: ["marks"],
    queryFn: getUserMarks,
    staleTime: 60 * 60 * 24 * 7,
  });

  const { mutate: addUser, isPending: isAddingUser } = useMutation({
    mutationFn: (user) => addUserApi(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("Utilisateur a été bien ajouté!");
    },

    onError:()=>{
      toast.error("Utilisateur n'a pas été bien ajouté!")
    }
  });

  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: (id) => deleteUserApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.error("Utilisateur a été bien supprimé!");
    },
  });

  return {
    users,
    isLoadingUsers,
    addUser,
    isAddingUser,
    deleteUser,
    isDeletingUser,
    marks,
    isMarksLoading,
  };
}
