/* eslint-disable @next/next/no-img-element */
import { Question } from "@/models";
import React from "react";

import styles from "@/styles/Quiz.module.scss";
import {
  Card,
  ProgressBar,
  QuestionResult,
  TimeFinishedCard,
} from "@/components";
import { useQuiz } from "@/hooks";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export type QuizPageProps = {
  questions: Question[];
  initialRandomImage: string | StaticImageData;
};

const QuizPage = ({ questions, initialRandomImage }: QuizPageProps) => {
  const {
    currentAlternatives,
    currentQuestion,
    incorrectAnswerAudioRef,
    correctAnswerAudioRef,
    selectedAlternative,
    setSelectedAlternative,
    correctAlternative,
    handleConfirmAnswer,
    currentRandomImage,
    actualQuestionIndex,
    timeFinished,
    showQuestionResult,
    setTimeFinished,
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
        <Image
          src={currentRandomImage}
          alt="random image"
          fill
          unoptimized
          data-testid="quiz-image"
        />
        <Image
          unoptimized
          fill
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
          <Card className={styles["question-card"]}>
            <h1>{currentQuestion.question.text}</h1>
            <div className={styles["progress-bar-container"]}>
              {!showQuestionResult && (
                <ProgressBar
                  timeFinished={timeFinished}
                  setTimeFinished={setTimeFinished}
                  currentQuestionId={currentQuestion.id}
                />
              )}
            </div>
            {!showQuestionResult ? (
              <div className={styles["alternatives-column"]}>
                {currentAlternatives.map((alternative) => {
                  return (
                    <button
                      data-testid="alternative"
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
                data-testid="confirm-button"
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
      fetch("https://picsum.photos/800/1200"),
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
