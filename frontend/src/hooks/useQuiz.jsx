import { useQuery } from "@tanstack/react-query";
import {
  getAllQuizQuestions,
  answerQuestion as answerQuestionApi,
} from "../api/quiz";
import useSession from "./useSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useQuiz() {
  const { session, isSessionLoading } = useSession();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data,
    isLoading: isQuizLoading,
    isFetching,
  } = useQuery({
    queryKey: ["get-question"],
    queryFn: () => {
      if (!session?.session?.isActive && !isSessionLoading) {
        return Promise.resolve(null);
      }

      return getAllQuizQuestions();
    },
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { mutate: answerQuestion, isPending: isAnswering } = useMutation({
    mutationFn: ({ questionId, answer }) =>
      answerQuestionApi(questionId, answer),
    onSuccess: async ({ session }) => {
      if (session?.isFinished) {
        await queryClient.invalidateQueries({ queryKey: ["session"] });
        navigate("/session");
      }
      queryClient.removeQueries({ queryKey: ["get-question"] });
    },
    onError: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      navigate("/session");
      queryClient.removeQueries({ queryKey: ["get-question"] });
    },
  });

  const skip = () =>
    queryClient.invalidateQueries({ queryKey: ["get-question"] });

  return { data, isQuizLoading, answerQuestion, isAnswering, isFetching, skip };
}
