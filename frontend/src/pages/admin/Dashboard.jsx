import { FaUsers } from "react-icons/fa6";
import { MdQuiz } from "react-icons/md";
import { AiFillFile } from "react-icons/ai";
import { useState } from "react";
import loadable from "../../utils/loadable";
const UsersTab = loadable(() => import("./UsersTab"));
const QuizzesTab = loadable(() => import("./QuizzesTab"));
const SessionsTab = loadable(() => import("./SessionsTab"));

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="p-3 pb-0 flex gap-4 w-min rounded-lg">
          <button
            className={`pb-3 ${
              activeTab === "users" ? "border-b-4 border-quiz-theme" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers size={35} />
          </button>
          <button
            className={`pb-3 ${
              activeTab === "quizzes" ? "border-b-4 border-quiz-theme" : ""
            }`}
            onClick={() => setActiveTab("quizzes")}
          >
            <MdQuiz size={35} />
          </button>
          <button
            className={`pb-3 ${
              activeTab === "sessions" ? "border-b-4 border-quiz-theme" : ""
            }`}
            onClick={() => setActiveTab("sessions")}
          >
            <AiFillFile size={35} />
          </button>
        </div>
      </div>
      <div className="mt-3">
        {activeTab === "users" && <UsersTab />}
        {activeTab === "quizzes" && <QuizzesTab />}
        {activeTab === "sessions" && <SessionsTab />}
      </div>
    </>
  );
}
