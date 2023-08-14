import { Question } from "@/models";
import {
  nextQuestion,
  selectActualQuestionIndex,
  selectCorrectAlternative,
  selectCurrentAlternatives,
  selectCurrentQuestion,
  selectQuizFinished,
  setAnswer,
  setQuestions,
} from "@/store/quizSlice";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export type UseQuizProps = {
  questions: Question[];
  initialRandomImage: string | StaticImageData;
};

export const TIME_SHOW_QUESTION_ANSWER = 2000;

export const useQuiz = ({ questions, initialRandomImage }: UseQuizProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedAlternative, setSelectedAlternative] = useState("");
  const [currentRandomImage, setCurrentRandomImage] =
    useState(initialRandomImage);
  const [showQuestionResult, setShowQuestionResult] = useState(false);
  const [timeFinished, setTimeFinished] = useState(false);

  const correctAnswerAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAnswerAudioRef = useRef<HTMLAudioElement | null>(null);

  const actualQuestionIndex = useSelector(selectActualQuestionIndex);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const currentAlternatives = useSelector(selectCurrentAlternatives);
  const correctAlternative = useSelector(selectCorrectAlternative);
  const quizFinished = useSelector(selectQuizFinished);

  const handleConfirmAnswer = () => {
    dispatch(
      setAnswer({
        id: selectedAlternative,
        answer: selectedAlternative,
        questionId: currentQuestion.id,
      })
    );

    const answerIsCorrect = correctAlternative === selectedAlternative;

    if (correctAnswerAudioRef.current && answerIsCorrect) {
      correctAnswerAudioRef.current.play();
    } else if (incorrectAnswerAudioRef.current)
      incorrectAnswerAudioRef.current.play();

    setShowQuestionResult(true);

    setTimeout(() => {
      setShowQuestionResult(false);
      dispatch(nextQuestion());
      setSelectedAlternative("");
    }, TIME_SHOW_QUESTION_ANSWER);
  };

  useEffect(() => {
    dispatch(setQuestions(questions));
  }, [dispatch, questions]);

  useEffect(() => {
    const getRandomImage = async () => {
      const response = await fetch("https://picsum.photos/800/1200");

      setCurrentRandomImage(response.url);
    };

    if (currentQuestion?.id && actualQuestionIndex >= 1) getRandomImage();
  }, [currentQuestion?.id, actualQuestionIndex]);

  useEffect(() => {
    if (quizFinished) {
      router.push("/resultado");
    }
  }, [quizFinished, router]);

  return {
    actualQuestionIndex,
    currentAlternatives,
    timeFinished,
    showQuestionResult,
    handleConfirmAnswer,
    setTimeFinished,
    currentRandomImage,
    currentQuestion,
    incorrectAnswerAudioRef,
    correctAnswerAudioRef,
    selectedAlternative,
    setSelectedAlternative,
    correctAlternative,
  };
};
