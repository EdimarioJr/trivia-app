/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components";
import { selectCorrectAnswers, selectResult } from "@/store";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/Result.module.scss";
import Link from "next/link";

const GOOD_RESULT_MINIMUM = 7;

const BAD_RESULT_MAXIMUM = 3;

type ResultStatus = "good" | "medium" | "bad";

const getResultStatus = (totalCorrectAnswers: number) => {
  if (totalCorrectAnswers >= GOOD_RESULT_MINIMUM) return "good";
  if (totalCorrectAnswers <= BAD_RESULT_MAXIMUM) return "bad";
  return "medium";
};

const getClassByResultStatus = (status: ResultStatus) => {
  switch (status) {
    case "good":
      return styles["good-result"];
    case "bad":
      return styles["bad-result"];
    default:
      return "";
  }
};

const ResultPage = () => {
  const badResultAudioRef = useRef<HTMLAudioElement | null>(null);
  const goodResultAudioRef = useRef<HTMLAudioElement | null>(null);

  const results = useSelector(selectResult);
  const totalCorrectAnswers = useSelector(selectCorrectAnswers);
  const resultStatus: ResultStatus = getResultStatus(totalCorrectAnswers);

  return (
    <section className={styles["page-container"]}>
      <h1 className={getClassByResultStatus(resultStatus)}>
        You got {totalCorrectAnswers} out of {results.length}!
      </h1>
      <Card className={styles["card-container"]}>
        {results.map((result, index) => {
          return (
            <div key={result.rightAnswer} className={styles["result-block"]}>
              <h4>Q{index + 1}</h4>
              <div className={styles["result-block__question-row"]}>
                <h5>{result.questionText}</h5>
              </div>
              <div className={styles["result-block__answer-row"]}>
                <div className={styles["result-block__answer"]}>
                  <h5>Your answer:</h5>
                  <div className={styles["result-block__answer-text"]}>
                    <p
                      className={
                        result.status === "correct"
                          ? styles["answer-correct"]
                          : styles["answer-incorrect"]
                      }
                    >
                      {result.answer}
                    </p>
                    {result.status === "correct" ? (
                      <img src="/success-icon.svg" alt="success icon" />
                    ) : (
                      <img src="/error-icon.svg" alt="error icon" />
                    )}
                  </div>
                </div>

                {result.status !== "correct" && (
                  <div className={styles["result-block__answer"]}>
                    <h5>Correct answer:</h5>
                    <p>{result.rightAnswer}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Card>
      <div className={styles["try-again-container"]}>
        <Link href="/">
          <button className={`primary-button-with-glow`}>
            Lets try again!
          </button>
        </Link>
      </div>
      <>
        <audio ref={badResultAudioRef} autoPlay={resultStatus === "bad"}>
          <source src="/sadtrombone.mp3" type="audio/mp3" />
        </audio>
        <audio ref={goodResultAudioRef} autoPlay={resultStatus === "good"}>
          <source src="/applause.wav" type="audio/wav" />
        </audio>
      </>
    </section>
  );
};

export default ResultPage;
