import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Answer, Question, Quiz } from "@/models";
import { RootState } from "./store";

type QuizState = Quiz & {
  actualQuestionIndex: number;
  quizFinished: boolean;
};

const initialState: QuizState = {
  questions: [],
  answers: [],
  actualQuestionIndex: 0,
  quizFinished: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers = [...state.answers, action.payload];
    },
    nextQuestion: (state) => {
      state.actualQuestionIndex++;
      if (state.actualQuestionIndex >= state.questions.length) {
        state.quizFinished = true;
      }
    },
    resetQuiz: (state) => {
      state.answers = [];
      state.actualQuestionIndex = 0;
      state.quizFinished = false;
    },
  },
});

export const { setQuestions, setAnswer, nextQuestion, resetQuiz } =
  quizSlice.actions;

export const selectAnswers = (state: RootState) => state.answers;

export const selectActualQuestionIndex = (state: RootState) =>
  state.actualQuestionIndex;

export const selectQuestions = (state: RootState) => state.questions;

export const selectCurrentQuestion = (state: RootState) =>
  state.questions[state.actualQuestionIndex];

export const selectCurrentAlternatives = createSelector(
  [selectCurrentQuestion],
  (question: Question) => {
    if (question) return [...question.incorrectAnswers, question.correctAnswer];

    return [];
  }
);

export const selectCorrectAlternative = createSelector(
  [selectCurrentQuestion],
  (question: Question) => {
    if (question) return question.correctAnswer;
    return "";
  }
);

export const selectTotalQuestions = (state: RootState) =>
  state.questions.length;

export const selectTotalAnswers = (state: RootState) => state.answers.length;

export const selectTotalCorrectAnsweredQuestions = (state: RootState) =>
  state.answers.reduce((total, answer) => {
    const question = state.questions.find(
      (question) => question.id === answer.questionId
    );
    return question?.correctAnswer === answer.answer ? total + 1 : total;
  }, 0);

export default quizSlice.reducer;
