import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";
import { useInterval } from "@/hooks";

export type ProgressBarProps = {
  timePerFrame?: number;
  timeFinished: boolean;
  setTimeFinished: Dispatch<SetStateAction<boolean>>;
  currentQuestionId: string;
  durationInMs: number;
};

export const ProgressBar = ({
  durationInMs = 30000,
  timePerFrame = 10,
  currentQuestionId,
  setTimeFinished,
  timeFinished,
}: ProgressBarProps) => {
  const [timePercentage, setTimePercentage] = useState(0);

  const numberOfExecutions = durationInMs / timePerFrame;

  const addFraction = 100 / numberOfExecutions;

  useInterval(
    () => {
      if (timePercentage + addFraction < 100)
        setTimePercentage((time) => time + addFraction);
      else if (!timeFinished) setTimeFinished(true);
    },
    timeFinished ? null : timePerFrame
  );

  useEffect(() => {
    setTimePercentage(0);
  }, [currentQuestionId]);

  return (
    <div
      className={styles["progress-container"]}
      data-testid="progress-container"
    >
      <div
        className={styles["progress-bar"]}
        style={{ width: `${timePercentage}%` }}
      ></div>
    </div>
  );
};
