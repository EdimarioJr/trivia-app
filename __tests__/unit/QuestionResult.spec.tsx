import { render, screen } from "@testing-library/react";

import { QuestionResult } from "../../src/components/QuestionResult";

describe("question result", () => {
  it("should render all of the alternatives", () => {
    const alternatives = ["Alternative 1", "Alternative 2", "Alternative 3"];

    render(
      <QuestionResult
        alternatives={alternatives}
        correctAlternative={alternatives[0]}
        selectedAlternative={alternatives[2]}
      />
    );

    expect(screen.getAllByRole("button").length).toBe(alternatives.length);
  });

  it("should have different styles for correct and incorrect answers", () => {
    const alternatives = ["Alternative 1", "Alternative 2", "Alternative 3"];

    const correctAnswerIndex = 0;
    const incorrectAnswerIndex = 2;

    render(
      <QuestionResult
        alternatives={alternatives}
        correctAlternative={alternatives[correctAnswerIndex]}
        selectedAlternative={alternatives[incorrectAnswerIndex]}
      />
    );

    const correctAnswer = screen.getByText(alternatives[correctAnswerIndex], {
      selector: "button",
    });
    const incorrectAnswer = screen.getByText(
      alternatives[incorrectAnswerIndex],
      {
        selector: "button",
      }
    );

    expect(correctAnswer.className).not.toEqual(incorrectAnswer.className);
  });
});
