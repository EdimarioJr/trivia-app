import QuizPage from "@/pages/quiz";
import { screen, waitFor } from "@testing-library/react";
import { questionsFixture } from "../../fixtures/questions";
import { renderWithReduxProvider } from "../../src/utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ResultPage from "@/pages/resultado";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ url: "image2" }),
  })
);

describe("result page", () => {
  it("Render the correct responses", () => {
    const questions = [questionsFixture[0]];

    renderWithReduxProvider(<ResultPage />, {
      preloadedState: {
        questions: [questionsFixture[0]],
        answers: [
          {
            id: "answer",
            questionId: questionsFixture[0].id,
            answer: questionsFixture[0].correctAnswer,
          },
        ],
        actualQuestionIndex: 0,
        quizFinished: true,
      },
    });

    const response = questions[0].correctAnswer;

    userEvent.click(screen.getByText(new RegExp(response, "i")));

    expect(screen.getByText(response)).toBeInTheDocument();
  });
});
