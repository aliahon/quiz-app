import axios from "../lib/axios";

export const getAllQuizQuestions = async () => {
  const response = await axios.get("/quiz");
  return response.data;
};

export const answerQuestion = async (questionId, answer) => {
  const response = await axios.post("/quiz/answer", { questionId, answer });
  return response.data;
};
