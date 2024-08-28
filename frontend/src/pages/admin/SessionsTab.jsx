import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/fr";
import { renderTimeViewClock } from "@mui/x-date-pickers";
import Button from "../../components/Button";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function SessionsTab() {
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  

  const { createAdminSession, isCreatingAdminSession } = useSession();

  const handleStartSession = () => {
    if(startTime.isAfter(endTime)){
      return toast.error("L'heure de démarrage doit être antérieure à l'heure de terminaison")
    }
    if(!startTime.isAfter(dayjs())){
      return toast.error("L'heure de démarrage doit être antérieure à l'heure acteuille")
    }

    createAdminSession({ startTime: startTime.$d, endTime: endTime.$d });
  };

  const datePickerSx = {
    "& .MuiInputBase-root": {
      outline: "none",
      color: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      "&:hover": {
        border: "1px solid #e2e8f0",
      },
      "&:focus": {
        outline: "none",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Veuillez sépcifier le temp de demarage de la session d&apos;examen</p>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <label className="gap-2 w-full flex flex-col">
          <p className="text-sm text-slate-400 font-medium">
            Heure de démarrage
          </p>
          <DateTimePicker
            sx={datePickerSx}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
          />
        </label>
        <label className="gap-2 w-full flex flex-col">
          <p className="text-sm text-slate-400 font-medium">
            Heure de terminaison
          </p>
          <DateTimePicker
            sx={datePickerSx}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
          />
        </label>
        <Button
          className="justify-self-start py-2 px-3 text-base hover:bg-white  hover:text-[#343A40ff] hover:font-semibold"
          onClick={handleStartSession}
          disabled={isCreatingAdminSession}
        >
          {isCreatingAdminSession ? "Chargement..." : "Valider"}
        </Button>
      </LocalizationProvider>
    </div>
  );
}
