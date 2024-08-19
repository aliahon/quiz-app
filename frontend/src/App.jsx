import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import StartScreen from "./components/StartScreen";

export default function App() {
  return (
    <div className="container mx-auto text-quiz-light font-display grid justify-center py-20 gap-4">
      <Header />
      <Outlet />
    </div>
  );
}
