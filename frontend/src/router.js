import { createBrowserRouter } from "react-router-dom";
import loadable from "./utils/loadable";
// import App from "./App";
// import StartScreen from "./components/StartScreen";

const App = loadable(() => import("./App"));
const StartScreen = loadable(() => import("./components/StartScreen"));
const AuthGuard = loadable(() => import("./guards/AuthGuard"));
const StartQuiz = loadable(() => import("./pages/StartQuiz"));
const Quiz = loadable(() => import("./pages/Quiz"));
const Dashboard = loadable(() => import("./pages/admin/Dashboard"));

const CandidateMiddleware = loadable(() =>
  import("./middlewares/CandidateMiddleware")
);
const AdminMiddleware = loadable(() => import("./middlewares/AdminMiddleware"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/auth",
        Component: StartScreen,
      },
      {
        index: "/",
        Component: AuthGuard,
        children: [
          {
            path: "/session",
            Component: CandidateMiddleware,
            children: [
              {
                index: true,
                Component: StartQuiz,
              },
            ],
          },
          {
            path: "/quiz-start",
            Component: Quiz,
          },
          {
            path: "/admin",
            Component: AdminMiddleware,
            children: [
              {
                index: true,
                Component: Dashboard,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: "Not found",
      },
    ],
  },
]);

export default router;
