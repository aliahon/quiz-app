import { Navigate } from "react-router-dom/dist";
import LoadingState from "../components/LoadingState";
import useSession from "../hooks/useSession";
import dayjs from "dayjs";

export default function Quiz() {
  const { session, isSessionLoading } = useSession();
  console.log(session);
  const isSessionStarted = (session) => {
    return session.startTime && new Date(session.startTime) < new Date();
  };

  const calculateRemainingTime = (session) => {
    if (!session || !session.startTime) return null;
    const startTime = dayjs(session.startTime);
    const now = dayjs();
    const remainingTime = startTime.diff(now);

    if (remainingTime <= 0) return "Session started";

    const remainingSeconds = remainingTime / 1000;
    const remainingMinutes = remainingSeconds / 60;
    const remainingHours = remainingMinutes / 60;
    const remainingDays = remainingHours / 24;

    if (remainingMinutes < 60) {
      return `${Math.floor(remainingMinutes)} minutes ( ${dayjs(
        session.startTime
      ).format("DD/MM/YYYY HH:mm")} )`;
    } else if (remainingHours < 24) {
      return `${Math.floor(remainingHours)} heures ( ${dayjs(
        session.startTime
      ).format("DD/MM/YYYY HH:mm")} )`;
    } else {
      return `${Math.floor(remainingDays)} jours ( ${dayjs(
        session.startTime
      ).format("DD/MM/YYYY HH:mm")} )`;
    }
  };

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
    return (
      <p className="px-3 py-2 text-lg mt-5">
        La session n&apos;est pas commencée, le temps restant est de{" "}
        {calculateRemainingTime(session.session)}
      </p>
    );
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
