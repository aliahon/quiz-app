import Button from "../../components/Button";
import useSessionTimer from "../../hooks/useSessionTimer";

export default function QuizCountDown({ session }) {
  const { remainingEndMinutes, remainingEndHours, remainingEndSeconds } =
    useSessionTimer(session);

  if (
    remainingEndMinutes <= 0 &&
    remainingEndHours <= 0 &&
    remainingEndSeconds <= 0
  ) {
    return <Button className="text-base py-1 text-center">00:00</Button>;
  }

  return (
    <Button className="text-base py-1 text-center">
      {remainingEndHours.toFixed() > 0 && "0" + remainingEndHours + " : "}
      {remainingEndMinutes.toFixed(0) < 10 && "0"}
      {remainingEndMinutes} : {remainingEndSeconds.toFixed(0) < 10 && "0"}
      {remainingEndSeconds.toFixed(0)}
    </Button>
  );
}
