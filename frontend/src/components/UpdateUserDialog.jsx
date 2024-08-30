import {
    DialogContent,
    Dialog as DialogMui,
    DialogTitle,
    TextField,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import useUser from "../hooks/useUser";
  import { useParams } from "react-router-dom";
  
  export default function Dialog(props) {
    const {id} = useParams();
    const { isUpdatingUser, updateUser, isLoadingUser, oneUser } = useUser(id);
    const { onClose, open } = props;
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });

    useEffect(() => {
        if (oneUser) {
          setInputs({
            name: oneUser.name,
            username: oneUser.username,
            email: oneUser.email,
            password: '',
            passwordConfirm: ''
          });
        }
      }, [oneUser]);
    
    const resetForm= ()=>setInputs({
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setError("");
      if (inputs.password !== inputs.passwordConfirm) {
        setError("le mot de passe et la confirmation ne sont pas identique");
        return;
      }
      if (
        inputs.username === "" ||
        inputs.name === "" ||
        inputs.email === "" ||
        inputs.password === "" ||
        inputs.passwordConfirm === ""
      ) {
        setError("Veuillez remplir tous les champs");
        return;
      }
      updateUser({ id, ...inputs });
      resetForm();
      setEmailError('');
  
    };
    const [emailError, setEmailError] = useState('');
    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  
    return (
      <DialogMui
        onClose={onClose}
        open={open}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle className="text-white bg-quiz-dark">
          Modifier un condidat
        </DialogTitle>
  
        <DialogContent className="flex flex-col gap-5 w-[500px] bg-quiz-dark">
          {error.length > 0 && <p className="text-red-400 text-sm">{error}</p>}
  
          <TextField
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            required
            className="text-quiz-light placeholder:text-quiz-light"
            fullWidth
            InputProps={{
              style: {
                color: "#f1f5f9",
              },
            }}
            variant="standard"
            type="text"
            placeholder="Nom utilisateur"
          />
  
          <TextField
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            required
            className="text-quiz-light placeholder:text-quiz-light"
            fullWidth
            InputProps={{
              style: {
                color: "#f1f5f9",
              },
            }}
            variant="standard"
            type="text"
            placeholder="Nom complet"
          />
  
          <TextField 
            value={inputs.email}
            onChange={(e) => {
              setInputs({ ...inputs, email: e.target.value });
    
              if (validateEmail(e.target.value)) {
                setEmailError('');
              } else {
                setEmailError('Invalid email address');
              }
            }}
            required
            className="text-quiz-light placeholder:text-quiz-light"
            fullWidth
            InputProps={{
              style: {
                color: "#f1f5f9",
              },
            }}
            variant="standard"
            type="email"
            placeholder="Email"
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            required
            className="text-quiz-light placeholder:text-quiz-light"
            fullWidth
            InputProps={{
              style: {
                color: "#f1f5f9",
              },
            }}
            variant="standard"
            type="password"
            placeholder="Mot de passe"
          />
          <TextField
            value={inputs.passwordConfirm}
            onChange={(e) =>
              setInputs({ ...inputs, passwordConfirm: e.target.value })
            }
            required
            className="text-quiz-light placeholder:text-quiz-light"
            fullWidth
            InputProps={{
              style: {
                color: "#f1f5f9",
              },
            }}
            variant="standard"
            type="password"
            placeholder="Confirmer le mot de passe"
          />
          <button
            className="text-slate-200 bg-slate-800 py-2 px-4 rounded-md hover:bg-slate-900"
            type="submit"
            disabled={isUpdatingUser}
          >
            {isUpdatingUser ? "Modification en cours..." : "Modifier"}
          </button>
        </DialogContent>
      </DialogMui>
    );
  }
  