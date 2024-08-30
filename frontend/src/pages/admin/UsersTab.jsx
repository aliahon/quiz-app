import { useState } from "react";
import Button from "../../components/Button";
import LoadingState from "../../components/LoadingState";
import useUser from "../../hooks/useUser";
import AddUserDialog from "../../components/AddUserDialog";
import UpdateUserDialog from "../../components/UpdateUserDialog";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AiOutlineEdit } from "react-icons/ai";

export default function UsersTab() {
  const { users, isLoadingUsers, deleteUser, isDeletingUser } = useUser();
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  //add user dialog
  const handleCloseAddUserDialog = () => {
    setIsAddUserDialogOpen(false);
  };

  const handleCloseDeleteUserDialog = () => {
    setIsDeleteUserDialogOpen(false);
    setSelectedUser(null);
  };

  const handleOpenAddUserDialog = () => {
    setIsAddUserDialogOpen(true);
  };

//update user dialog
  const handleCloseUpdateUserDialog = () => {
    setIsAddUserDialogOpen(false);
  };

  const handleOpenUpdateUserDialog = () => {
    setIsUpdateUserDialogOpen(true);
  };

  const handleOpenDeleteUserDialog = (user) => {
    setSelectedUser(user);
    setIsDeleteUserDialogOpen(true);
  };

  const handleDelete = () => {
    handleCloseDeleteUserDialog();
    if (selectedUser) {
      deleteUser(selectedUser._id).catch(error => {
        console.error("Failed to delete user:", error);
        // Optionally handle the error, e.g., show a notification
      });
    }
  };

  if (isLoadingUsers) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="mb-5 py-2 px-3 text-sm hover:bg-white  hover:text-[#343A40ff] hover:font-semibold"
          onClick={handleOpenAddUserDialog}
        >
          Ajouter un candidat
        </Button>
        <AddUserDialog open={isAddUserDialogOpen} onClose={handleCloseAddUserDialog} />
      </div>
      <div className="relative overflow-x-auto border border-quiz-dark sm:rounded-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-slate-400 text-slate-900">
            <tr>
              <th scope="col" className="px-6 py-3">Nom du candidat</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Nom d&apos;utilisateur</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={handleOpenUpdateUserDialog}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </button>
                  <UpdateUserDialog open={isUpdateUserDialogOpen} onClose={handleCloseUpdateUserDialog}  />
                  <button
                    disabled={isDeletingUser}
                    onClick={() => handleOpenDeleteUserDialog(user)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog for confirmation (delete)*/}
      <Dialog
        open={isDeleteUserDialogOpen}
        onClose={handleCloseDeleteUserDialog}
        aria-labelledby="responsive-dialog-title"
        fullScreen={fullScreen}
      >
        <DialogTitle id="responsive-dialog-title" className="text-white bg-quiz-dark">
          Confirmer la suppression
        </DialogTitle>
        <DialogContent className="flex flex-col gap-5 w-[500px] bg-quiz-dark">
          <DialogContentText >
            <p className="text-white">Êtes-vous sûr de vouloir supprimer <span className="font-bold text-lg text-red-500">{selectedUser?.username}</span> ?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="text-white text-sm bg-quiz-dark">
          <Button onClick={handleCloseDeleteUserDialog} className="px-3 py-2 text-white text-base bg-quiz-dark">
            Annuler
          </Button>
          <Button onClick={handleDelete} className="px-3 py-2 text-base bg-quiz-dark text-red-500 hover:bg-red-600 hover:border-white hover:text-white border-red-600" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
