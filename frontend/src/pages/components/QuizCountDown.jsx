import { useEffect, useRef } from "react";
import Button from "../../components/Button";
import useSessionTimer from "../../hooks/useSessionTimer";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function QuizCountDown({ session }) {
  const { remainingEndMinutes, remainingEndHours, remainingEndSeconds } =
    useSessionTimer(session);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout} = useAuth();


  useEffect(() => {
    (async () => {
      if (
        remainingEndHours <= 0 &&
        remainingEndMinutes <= 0 &&
        remainingEndSeconds <= 0
      ) {
        //window.location.reload();
        await logout();
      }
    })();
  }, [
    queryClient,
    remainingEndHours,
    remainingEndMinutes,
    remainingEndSeconds,
    logout,
  ]);

  const minuteCircle = useRef();

  if (
    remainingEndMinutes <= 0 &&
    remainingEndHours <= 0 &&
    remainingEndSeconds <= 0
  ) {
    return (
      <div className="flex gap-2 items-center justify-center">
        <div className="flex gap-1 shadow-lg">
          <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
            0
          </span>
          <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
            0
          </span>
        </div>
        <span className="text-[#FBFAF8] text-[8px] sm:text-[16px]">:</span>
        <div className="flex gap-1">
          <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
            0
          </span>
          <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
            0
          </span>
        </div>
        <span className="text-[#FBFAF8] text-[8px] sm:text-[16px]">:</span>
        <div className="flex gap-1">
          <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
            0
          </span>
          <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
            0
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="flex gap-1 shadow-lg">
        <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
          {remainingEndHours > 10 ? remainingEndSeconds.toString().charAt(0) : "0"}
        </span>
        <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
          {remainingEndHours > 10 ? remainingEndHours.toString().charAt(1) : remainingEndHours.toString().charAt(0)}
        </span>
      </div>
      <span className="text-[#FBFAF8] text-[8px] sm:text-[16px]">:</span>
      <div className="flex gap-1">
        <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
          {remainingEndMinutes > 10 ? remainingEndSeconds.toString().charAt(0) : "0"}
        </span>
        <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
          {remainingEndMinutes > 10 ? remainingEndMinutes.toString().charAt(1) : remainingEndMinutes.toString().charAt(0)}
        </span>
      </div>
      <span className="text-[#FBFAF8] text-[8px] sm:text-[16px]">:</span>
      <div className="flex gap-1">
        <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
          {remainingEndSeconds > 10 ? remainingEndSeconds.toString().charAt(0) : "0"}
        </span>
        <span className="bg-quiz-theme  font-semibold text-[#FBFAF8] text-[8px] sm:text-[16px] py-1 px-2  rounded drop-shadow-xl">
          {remainingEndSeconds > 10 ? remainingEndSeconds.toString().charAt(1) : remainingEndSeconds.toString().charAt(0)}
        </span>
      </div>
    </div>
  );
}

