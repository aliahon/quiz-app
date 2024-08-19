import dayjs from "dayjs";
import useSessionTimer from "../../hooks/useSessionTimer";

export default function SessionNotStarted({ session }) {
  const { remainingHours, remainingMinutes, remainingSeconds, totalDays } =
    useSessionTimer(session);

  return (
    <p className="px-3 py-2 text-lg mt-5">
      La session n&apos;est pas commencée, le temps restant est de{" "}
      {`${totalDays.toFixed(0)} jours, ${remainingHours.toFixed(
        0
      )} heures, ${remainingMinutes.toFixed(0)} minutes, ${Math.round(
        remainingSeconds
      )} secondes ( ${dayjs(session.startTime).format("DD/MM/YYYY HH:mm")} )`}
    </p>
  );
}
