import { useState } from "react";
import Button from "../../components/Button";
import LoadingState from "../../components/LoadingState";
import useUser from "../../hooks/useUser";
import AddUserDialog from "../../components/AddUserDialog";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function UsersTab() {
  const { users, isLoadingUsers, deleteUser, isDeletingUser } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser._id);
    }
    handleClose();
  };

  if (isLoadingUsers) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="mb-5 py-2 px-3 text-sm"
          onClick={() => setOpen(true)}
        >
          Ajouter un candidat
        </Button>
        <AddUserDialog open={open} onClose={handleClose} />
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
                  <button
                    disabled={isDeletingUser}
                    onClick={() => handleClickOpen(user)}
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
      <Dialog
        fullScreen={fullScreen}
        open={Boolean(selectedUser)}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
