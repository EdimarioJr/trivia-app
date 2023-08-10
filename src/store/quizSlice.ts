import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Answer, Question, Quiz } from "@/models";
import { RootState } from "./store";

type QuizState = Quiz & {
  actualQuestionIndex: number;
  quizFinished: boolean;
};

export type Result = {
  questionText: string;
  rightAnswer: string;
  answer: string;
  status: "correct" | "incorrect";
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
      if (state.actualQuestionIndex + 1 >= state.questions.length) {
        state.quizFinished = true;
      } else {
        state.actualQuestionIndex++;
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
    if (question)
      return [...question.incorrectAnswers, question.correctAnswer].sort(
        () => 0.5 - Math.random()
      );

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

export const selectQuizFinished = (state: RootState) => state.quizFinished;

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

export const selectResult = (state: RootState): Result[] => {
  const questionsObject: Record<Question["id"], Question> =
    state.questions.reduce((questionObj, question) => {
      (questionObj as Record<Question["id"], Question>)[question.id] = question;

      return questionObj;
    }, {});

  return state.answers.map((answer) => {
    const question = questionsObject[answer.questionId];

    return {
      questionText: question.question.text,
      rightAnswer: question.correctAnswer,
      answer: answer.answer,
      status:
        question.correctAnswer === answer.answer ? "correct" : "incorrect",
    };
  });
};

export const selectCorrectAnswers = createSelector(
  [selectResult],
  (results: Result[]) => {
    return results.reduce(
      (total, result) => (result.status === "correct" ? (total += 1) : total),
      0
    );
  }
);

export default quizSlice.reducer;
