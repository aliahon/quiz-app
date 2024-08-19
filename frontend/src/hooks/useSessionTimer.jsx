import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

export default function useSessionTimer(session) {
  const startTime = dayjs(session.startTime);
  const endTime = dayjs(session.endTime);
  const now = dayjs();
  const [remainingStartTime, setRemainingStartTime] = useState(
    startTime.diff(now)
  );
  const [remainingEndTime, setRemainingEndTime] = useState(endTime.diff(now));

  //   console.log(remainingEndTime / 1000);

  const totalEndSeconds = remainingEndTime / 1000;
  const totalEndMinutes = Math.floor(totalEndSeconds / 60);
  const totalEndHours = Math.floor(totalEndMinutes / 60);

  const totalSeconds = remainingStartTime / 1000;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const remainingSeconds = totalSeconds % 60;
  const remainingMinutes = totalMinutes % 60;
  const remainingHours = totalHours % 24;

  const remainingEndSeconds = totalEndSeconds % 60;
  const remainingEndMinutes = totalEndMinutes % 60;
  const remainingEndHours = totalEndHours % 24;

  const intervalId = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (startTime.isAfter(dayjs())) {
        setRemainingStartTime(
          (remainingStartTime) => remainingStartTime - 1000
        );
      }
      if (startTime.isBefore(dayjs()) || endTime.isAfter(dayjs())) {
        setRemainingEndTime((remainingEndTime) => remainingEndTime - 1000);
      }
    }, 1000);
    return () => clearInterval(intervalId.current);
  }, [remainingStartTime, remainingEndTime, totalSeconds, startTime, endTime]);

  return {
    remainingHours,
    remainingMinutes,
    remainingSeconds,
    totalDays,
    remainingEndHours,
    remainingEndMinutes,
    remainingEndSeconds,
  };
}
