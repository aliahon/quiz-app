import { useState } from "react";
import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import { useQuiz } from "../hooks/useQuiz";
import { SERVER_URL } from "../lib/config";
import { Navigate } from "react-router-dom/dist";
import QuizCountDown from "./components/QuizCountDown";
import useSession from "../hooks/useSession";

export default function Quiz() {
  const { data, isQuizLoading, answerQuestion, isAnswering, isFetching } =
    useQuiz();

  const { session } = useSession();

  const [selectedOption, setSelectedOption] = useState(null);

  const isLoading = isQuizLoading || isFetching;
  if (isLoading) return <LoadingState />;

  if (!data) return <Navigate to="/session" />;

  const { questionsCount, question, answeredCount } = data;
  if (!question) return <div>No question</div>;

  return (
    <>
      <div className="my-10 grid justify-between gap-3 grid-cols-[auto_auto] text-quiz-medium w-full container mx-auto">
        <progress
          className="appearance-none w-full h-[12px]"
          style={{ gridColumn: "1 / -1" }}
          max={questionsCount}
          value={answeredCount + 1}
        />
        <p>
          Question <strong>{answeredCount + 1}</strong> / {questionsCount}
        </p>
      </div>

      <div className="flex flex-col gap-10 justify-self-start w-full">
        <h4 className="text-quiz-medium text-xl font-semibold">
          {question?.question}
        </h4>
        <div className="space-y-3">
          {question?.images?.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center">
              {question.images.map((img) => (
                <img
                  src={SERVER_URL + img}
                  key={img}
                  alt={question.question + " image"}
                  className="max-w-96 object-cover"
                />
              ))}
            </div>
          )}
          {question.options && (
            <div className="flex flex-col gap-4">
              {Object.keys(question.options).map((key) => {
                return (
                  <Button
                    float
                    className={`text-lg font-medium py-4 bg-quiz-dark text-start disabled:bg-quiz-theme ${
                      selectedOption === key
                        ? "bg-quiz-accent text-quiz-darkest translate-x-5 hover:translate-x-5"
                        : ""
                    } ${
                      selectedOption !== key && selectedOption
                        ? "hover:translate-x-0 bg-quiz-theme"
                        : ""
                    }`}
                    key={key}
                    onClick={() => setSelectedOption(key)}
                  >
                    {question.options[key]}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        {session && <QuizCountDown session={session.session} />}
        <Button
          className="justify-self-end py-1 text-base bg-quiz-theme border-none"
          disabled={!selectedOption || isAnswering}
          onClick={() => {
            if (!selectedOption) return;
            answerQuestion({
              questionId: question._id,
              answer: selectedOption,
            });
            setSelectedOption(null);
          }}
        >
          {isAnswering
            ? "Répondant..."
            : answeredCount === questionsCount - 1
            ? "Terminer"
            : "Suivant"}
        </Button>
      </div>
    </>
  );
}
