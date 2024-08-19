import { useState } from "react";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingState from "./LoadingState";
import { BiLoader } from "react-icons/bi";

export default function StartScreen() {
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLogging, user, isUserLoading, loginError } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ credentials, password });
  };

  if (isUserLoading) return <LoadingState />;

  if (!isUserLoading && user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg text-slate-400 font-extralight font-mono">
        Vueillez entrer votre nom d&apos;utilisateur et mot de passe pour
        continuer
      </h2>
      {loginError && <p className="text-red-500">{loginError}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="w-full outline-none px-3 text-slate-900 py-4 rounded-md border-2 border-none"
          value={credentials}
          onChange={(e) => setCredentials(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full outline-none px-3 text-slate-900 py-4 rounded-md border-2 border-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={isLogging}
          className="flex items-center gap-2 justify-center text-lg"
        >
          {isLogging ? (
            <>
              <BiLoader className="animate-spin" /> Chargement
            </>
          ) : (
            "Connexion"
          )}
        </Button>
      </form>
    </div>
  );
}
