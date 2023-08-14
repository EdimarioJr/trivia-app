import React from "react";
import styles from "./QuestionResult.module.scss";

export type QuestionResultProps = {
  alternatives: string[];
  selectedAlternative: string;
  correctAlternative: string;
};

export const QuestionResult = ({
  alternatives,
  selectedAlternative,
  correctAlternative,
}: QuestionResultProps) => {
  const isSelectedAlternativeButWrong = (alternative: string) =>
    alternative === selectedAlternative && alternative !== correctAlternative;
  const isSelectedAlternativeAndCorrect = (alternative: string) =>
    alternative === selectedAlternative && alternative === correctAlternative;

  const isDifferentAlternativeAndCorrect = (alternative: string) =>
    alternative !== selectedAlternative && alternative === correctAlternative;

  return (
    <div className={styles["alternatives-column"]}>
      {alternatives.map((alternative) => {
        return (
          <button
            className={`${styles.alternative}
            ${
              isSelectedAlternativeButWrong(alternative) &&
              styles["alternative-answer-wrong"]
            }
            ${
              isSelectedAlternativeAndCorrect(alternative)
                ? styles["alternative-answer-correct"]
                : ""
            } 
            ${
              isDifferentAlternativeAndCorrect(alternative)
                ? styles["alternative-correct"]
                : ""
            }
            `}
            key={alternative}
          >
            {alternative}
          </button>
        );
      })}
    </div>
  );
};
