import { IoIosLogOut } from "react-icons/io";
import useAuth from "../hooks/useAuth";

function Header() {
  const { logout, user } = useAuth();
  return (
    <header className="app-header gap-10 justify-center flex flex-col items-center relative">
      <img
        src="https://www.cmac-thyssen.com/wp-content/uploads/logo-cmac-thyssen.svg"
        alt="cmac logo"
        className="w-80"
      />
      <h1 className="text-center text-5xl font-bold">ÉVALUATION THÉORIQUE</h1>
      {user && (
        <button className="absolute top-3 right-3" onClick={logout}>
          <IoIosLogOut size={30} />
        </button>
      )}
    </header>
  );
}

export default Header;
