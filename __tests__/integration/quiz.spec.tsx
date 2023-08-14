import QuizPage from "@/pages/quiz";
import { screen, waitFor } from "@testing-library/react";
import { questionsFixture } from "../../fixtures/questions";
import { renderWithReduxProvider } from "../../src/utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { TIME_SHOW_QUESTION_ANSWER } from "@/hooks";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    url: "image2",
  })
);

describe("quiz page", () => {
  it("Render the random images when changes the question", async () => {
    const questions = questionsFixture;
    const initialRandomImage = "image1";
    jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(async () => {});

    renderWithReduxProvider(
      <QuizPage questions={questions} initialRandomImage={initialRandomImage} />
    );

    userEvent.click(
      screen.getByText(new RegExp(questions[0].correctAnswer, "i"), {
        selector: "button",
      })
    );
    const confirmButton = screen.getByTestId("confirm-button");

    expect(confirmButton).toBeInTheDocument();
    userEvent.click(confirmButton);

    await waitFor(
      () =>
        expect(
          screen.queryByTestId("quiz-image")?.attributes.getNamedItem("src")
            ?.value
        ).toBe("image2"),
      { timeout: TIME_SHOW_QUESTION_ANSWER + 500 }
    );
  });

  it("Render the first and next question", async () => {
    const questions = questionsFixture;

    jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(async () => {});

    renderWithReduxProvider(
      <QuizPage questions={questions} initialRandomImage={"image1"} />
    );

    expect(screen.getAllByTestId("alternative")).toHaveLength(4);
    const alternatives = [
      ...questions[0].incorrectAnswers,
      questions[0].correctAnswer,
    ];

    alternatives.forEach((alternative) =>
      expect(screen.getByText(new RegExp(alternative, "i"))).toBeInTheDocument()
    );

    userEvent.click(
      screen.getByText(new RegExp(questions[0].correctAnswer, "i"), {
        selector: "button",
      })
    );
    const confirmButton = screen.getByTestId("confirm-button");

    expect(confirmButton).toBeInTheDocument();
    userEvent.click(confirmButton);

    await waitFor(
      () => {
        const alternatives = [
          ...questions[1].incorrectAnswers,
          questions[1].correctAnswer,
        ];

        alternatives.forEach((alternative) =>
          screen.getByText(new RegExp(alternative, "i"))
        );
      },
      { timeout: TIME_SHOW_QUESTION_ANSWER + 500 }
    );
  });

  it("Should play audio when answer a question", async () => {
    const questions = [questionsFixture[0]];
    const playAudioStub = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(async () => {});

    renderWithReduxProvider(
      <QuizPage questions={questions} initialRandomImage={"image"} />
    );

    userEvent.click(
      screen.getByText(new RegExp(questions[0].correctAnswer, "i"), {
        selector: "button",
      })
    );

    const confirmButton = screen.getByTestId("confirm-button");
    userEvent.click(confirmButton);

    await waitFor(() => {
      expect(playAudioStub).toHaveBeenCalled();
    });
  });
});
