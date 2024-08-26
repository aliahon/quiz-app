import dayjs from "dayjs";
import useSessionTimer from "../../hooks/useSessionTimer";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function SessionNotStarted({ session }) {
  const { remainingHours, remainingMinutes, remainingSeconds, totalDays } =
    useSessionTimer(session);
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      if (
        remainingHours <= 0 &&
        remainingMinutes <= 0 &&
        remainingSeconds <= 0.9 &&
        totalDays <= 0
      ) {
        await queryClient.invalidateQueries({
          queryKey: ["session"],
        });
      }
    })();
  }, [
    queryClient,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
    totalDays,
  ]);

  return (
    <div className="mt-16 flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16">
      <span className="text-xl sm:text-lgfont-semibold text-white text-center tracking-widest px-2">
        La session n’a pas encore commencé. Le temps restant est de
      </span>
      <div className="flex justify-center gap-3 sm:gap-8">
        <div className="flex flex-col gap-5 relative">
          <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-quiz-theme  rounded-lg">
            <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#343A40ff]"></div>
            <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-white">
              {totalDays.toFixed(0).padStart(2, '0')}
            </span>
            <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#343A40ff]"></div>
          </div>
          <span className="text-white text-xs sm:text-2xl text-center capitalize">
            {totalDays.toFixed(0) == 1 ? "Jour" : "Jours"}
          </span>
        </div>
        <div className="flex flex-col gap-5 relative">
          <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-quiz-theme  rounded-lg">
            <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#343A40ff]"></div>
            <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-white">
              {remainingHours.toFixed(0).padStart(2, '0')}
            </span>
            <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#343A40ff]"></div>
          </div>
          <span className="text-white text-xs sm:text-2xl text-center font-medium">
            {remainingHours.toFixed(0) == 1 ? "Heur" : "Heures"}
          </span>
        </div>
        <div className="flex flex-col gap-5 relative">
          <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-quiz-theme  rounded-lg">
            <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#343A40ff]"></div>
            <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-white">
              {remainingMinutes.toFixed(0).padStart(2, '0')}
            </span>
            <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#343A40ff]"></div>
          </div>
          <span className="text-white text-xs sm:text-2xl text-center capitalize">
            {remainingMinutes.toFixed(0) == 1 ? "Minute" : "Minutes"}
          </span>
        </div>
        <div className="flex flex-col gap-5 relative">
          <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-quiz-theme  rounded-lg">
            <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#343A40ff]"></div>
            <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-white">
              {Math.round(remainingSeconds).toString().padStart(2, '0')}
            </span>
            <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#343A40ff]"></div>
          </div>
          <span className="text-white text-xs sm:text-2xl text-center capitalize">
            {Math.round(remainingSeconds) == 1 ? "Second" : "Secondes"}
          </span>
        </div>
      </div>
    </div>
  );
}
