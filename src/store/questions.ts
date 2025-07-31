import { create } from "zustand";
import { type Question } from "../types.d";
import { persist } from "zustand/middleware";

interface QuestionsState {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goToNextQuestion: () => void;
  goToPrevQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<QuestionsState>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch("http://localhost:5173/data.json");
      const json = await res.json();

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      // Usar el structuredClone para clonar el objeto
      const newQuestions = structuredClone(questions);
      // Encontramos el indice de la pregunta
      const questonIndex = newQuestions.findIndex(q => q.id === questionId)
      // Obetenemos la información de la pregunta
      const questionInfo = newQuestions[questonIndex];
      // Averiguamos si el usuario ha seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
      // Cambiar esta informacion en la copia de la pregunta
      newQuestions[questonIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };
      // Actualizamos el estado de la pregunta
      set({ questions: newQuestions });
    },

    goToNextQuestion: () => {
      const { questions, currentQuestion } = get();
      const newQuestionIndex = currentQuestion + 1;

      if (newQuestionIndex < questions.length) {
        set({ currentQuestion: newQuestionIndex });
      }
    },

    goToPrevQuestion: () => {
      const { currentQuestion } = get();
      const newQuestionIndex = currentQuestion - 1;

      if (newQuestionIndex >= 0) {
        set({ currentQuestion: newQuestionIndex });
      }
    },

    reset: () => {
      set({ questions: [], currentQuestion: 0 });
    },
  };
}, { name: "questions" }));