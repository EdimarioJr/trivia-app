import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";
import { useInterval } from "@/hooks";

export type ProgressBarProps = {
  fractionProgressBar: number;
  timeFinished: boolean;
  setTimeFinished: Dispatch<SetStateAction<boolean>>;
  timePerFrame: number;
  currentQuestionId: string;
};

export const ProgressBar = ({
  fractionProgressBar,
  timePerFrame,
  currentQuestionId,
  setTimeFinished,
  timeFinished,
}: ProgressBarProps) => {
  const [timePercentage, setTimePercentage] = useState(0);

  useInterval(
    () => {
      if (timePercentage + fractionProgressBar < 100)
        setTimePercentage((time) => time + fractionProgressBar);
      else setTimeFinished(true);
    },
    timeFinished ? null : timePerFrame
  );

  useEffect(() => {
    setTimePercentage(0);
  }, [currentQuestionId]);

  return (
    <div className={styles["progress-container"]}>
      <div
        className={styles["progress-bar"]}
        style={{ width: `${timePercentage}%` }}
      ></div>
    </div>
  );
};
