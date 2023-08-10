/* eslint-disable @next/next/no-img-element */
import { Question } from "@/models";
import {
  nextQuestion,
  selectActualQuestionIndex,
  selectCorrectAlternative,
  selectCurrentAlternatives,
  selectCurrentQuestion,
  setAnswer,
  setQuestions,
} from "@/store/quizSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "@/styles/Quiz.module.scss";
import {
  Card,
  ProgressBar,
  QuestionResult,
  TimeFinishedCard,
} from "@/components";
import { useQuiz } from "@/hooks";
import Link from "next/link";

export type QuizPageProps = {
  questions: Question[];
  initialRandomImage: string;
};

const QuizPage = ({ questions, initialRandomImage }: QuizPageProps) => {
  const {
    currentAlternatives,
    currentQuestion,
    incorrectAnswerAudioRef,
    correctAnswerAudioRef,
    timePerFrame,
    selectedAlternative,
    setSelectedAlternative,
    correctAlternative,
    handleConfirmAnswer,
    currentRandomImage,
    actualQuestionIndex,
    timeFinished,
    showQuestionResult,
    setTimeFinished,
    fractionProgressBar,
  } = useQuiz({ questions, initialRandomImage });

  return currentQuestion ? (
    <main className={styles["page-container"]}>
      <audio ref={incorrectAnswerAudioRef}>
        <source src="/error-sound-fx.wav" type="audio/wav" />
      </audio>
      <audio ref={correctAnswerAudioRef}>
        <source src="/success-sound.wav" type="audio/wav" />
      </audio>
      <div className={styles["image-section"]}>
        <img src={currentRandomImage} alt="random image" />
        <img
          src={currentRandomImage}
          alt="random image blurred"
          className={styles["blurred-image"]}
        />
      </div>
      <div className={styles["question-section"]}>
        <h4>
          Question {actualQuestionIndex + 1} of {questions.length}
        </h4>
        {timeFinished ? (
          <TimeFinishedCard />
        ) : (
          <Card style={{ width: "1000px", zIndex: 1 }}>
            <h1>{currentQuestion.question.text}</h1>
            <div className={styles["progress-bar-container"]}>
              {!showQuestionResult && (
                <ProgressBar
                  timeFinished={timeFinished}
                  setTimeFinished={setTimeFinished}
                  fractionProgressBar={fractionProgressBar}
                  timePerFrame={timePerFrame}
                  currentQuestionId={currentQuestion.id}
                />
              )}
            </div>
            {!showQuestionResult ? (
              <div className={styles["alternatives-column"]}>
                {currentAlternatives.map((alternative) => {
                  return (
                    <button
                      className={`${styles.alternative} ${
                        alternative === selectedAlternative &&
                        styles["alternative-selected"]
                      }`}
                      key={alternative}
                      onClick={() => setSelectedAlternative(alternative)}
                    >
                      {alternative}
                    </button>
                  );
                })}
              </div>
            ) : (
              <QuestionResult
                alternatives={currentAlternatives}
                selectedAlternative={selectedAlternative}
                correctAlternative={correctAlternative}
              />
            )}

            <div className={`${styles["confirm-row"]}`}>
              <button
                className={`${styles["confirm-button"]} ${
                  selectedAlternative
                    ? styles["show-confirm-button"]
                    : styles["hide-confirm-button"]
                } `}
                onClick={() =>
                  selectedAlternative ? handleConfirmAnswer() : null
                }
              >
                Confirm
              </button>
            </div>
          </Card>
        )}
      </div>
    </main>
  ) : (
    <div className={styles["no-questions-container"]}>
      <h1>No questions in our database!</h1>
      <h2>Please go back to homepage</h2>
      <Link href="/">
        <button className={`primary-button-with-glow`}>Go back</button>
      </Link>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const [resQuestions, resRandomImage] = await Promise.all([
      fetch(`https://the-trivia-api.com/v2/questions`),
      fetch("https://picsum.photos/300/600"),
    ]);

    const questions = await resQuestions.json();

    const randomImage = resRandomImage.url;

    return {
      props: { questions: questions || [], initialRandomImage: randomImage },
    };
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default QuizPage;
