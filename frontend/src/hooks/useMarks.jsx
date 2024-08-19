import { useQuery } from "@tanstack/react-query";
import { getUserMarks } from "../api/user";

export function useMarks() {
  const { data: marks, isLoading: isMarksLoading } = useQuery({
    queryKey: ["marks"],
    queryFn: getUserMarks,
  });

  return { marks, isMarksLoading };
}
