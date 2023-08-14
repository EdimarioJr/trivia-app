import { render, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { ProgressBar } from "../../src/components";

const props = {
  durationInMs: 10,
  timeFinished: false,
  setTimeFinished: () => {},
  timePerFrame: 1,
  currentQuestionId: "abc",
};

describe("progress bar", () => {
  it("should call the finished time callback in the end of the duration", async () => {
    props.durationInMs = 10;

    const mockSetTimeFinished = jest.fn();

    props.setTimeFinished = mockSetTimeFinished;

    render(<ProgressBar {...props} />);

    await waitFor(
      () => {
        expect(mockSetTimeFinished).not.toHaveBeenCalled();
      },
      {
        timeout: props.durationInMs + 100,
      }
    );
  });
});
