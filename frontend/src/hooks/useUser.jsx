import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import {
  getAllUsers,
  getUser,
  updateUser as updateUserApi,
  addUser as addUserApi,
  deleteUser as deleteUserApi,
  getUserMarks,
} from "../api/user";
import useAuth from "./useAuth";

export default function useUser(userId) {
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

  const { data: oneUser, isLoading: isLoadingUser } = useQuery(
    ['oneUser', userId], // Query key includes id
    () => getUser(userId), // Query function
    {
      enabled: !!userId, // Only fetch when id is available
      staleTime: 60 * 60 * 24 * 7 // Define stale time
    }
  );

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
  

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: (user) => updateUserApi(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("Utilisateur a été bien modifié!");
    },

    onError:()=>{
      toast.error("Utilisateur n'a pas été bien modifié!")
    }
  });

  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: (id) => deleteUserApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Utilisateur a été bien supprimé!");
    },
    onError: () => {
      toast.error("Utilisateur n'a pas été bien supprimé!");
    }
  });

  return {
    users,
    isLoadingUsers,
    oneUser,
    isLoadingUser,
    addUser,
    isAddingUser,
    updateUser,
    isUpdatingUser,
    deleteUser,
    isDeletingUser,
    marks,
    isMarksLoading,
  };
}
