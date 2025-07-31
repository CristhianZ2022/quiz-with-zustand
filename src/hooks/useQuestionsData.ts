import { useQuestionsStore } from "../store/questions";

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { correctAnswer, userSelectedAnswer } = question;
    if (correctAnswer === userSelectedAnswer) correct++;
    else if (userSelectedAnswer === undefined) unanswered++;
    else incorrect++;
  });

  return { correct, incorrect, unanswered };
};