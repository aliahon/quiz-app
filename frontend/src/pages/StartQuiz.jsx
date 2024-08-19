import { Navigate } from "react-router-dom/dist";
import LoadingState from "../components/LoadingState";
import useSession from "../hooks/useSession";
import SessionNotStarted from "./components/SessionNotStarted";

const isSessionStarted = (session) => {
  return session.startTime && new Date(session.startTime) < new Date();
};

export default function Quiz() {
  const { session, isSessionLoading } = useSession();

  if (isSessionLoading) {
    return <LoadingState />;
  }

  if (!isSessionLoading && !session) {
    return <p className="px-3 py-2 text-lg mt-5">Aucune session trouvée</p>;
  }

  if (!isSessionLoading && session?.expiredSession) {
    return (
      <div className="w-full mt-10 text-center">
        <h2 className="text-2xl font-bold">Votre session a expiré</h2>
        <p className="text-lg bg-quiz-theme py-4 px-8 rounded-full mt-4">
          Votre note est de{" "}
          <strong>
            {" "}
            {session.expiredSession.fullMark} / {session.totalMarks}
          </strong>
        </p>
      </div>
    );
  }

  if (
    !isSessionLoading &&
    session?.session?.isActive &&
    !isSessionStarted(session.session)
  ) {
    return <SessionNotStarted session={session.session} />;
  }

  // console.log(
  //   !isSessionLoading &&
  //     session?.session?.isActive &&
  //     !session.session.isFinished
  // );

  if (
    !isSessionLoading &&
    session?.session?.isActive &&
    !session.session.isFinished
  ) {
    return <Navigate to="/quiz-start" />;
  }
}
