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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export type UseQuizProps = {
  questions: Question[];
  initialRandomImage: string;
};

const TIME_PER_FRAME = 10; // ms
const TIME_PER_QUESTION = 1000 * 30; // 30 segundos

const NUMBER_OF_EXECUTIONS = TIME_PER_QUESTION / TIME_PER_FRAME;

const FRACTION_PROGRESS_BAR = 100 / NUMBER_OF_EXECUTIONS;

const TIME_SHOW_QUESTION_ANSWER = 2000;

export const useQuiz = ({ questions, initialRandomImage }: UseQuizProps) => {
  const dispatch = useDispatch();
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
      const response = await fetch("https://picsum.photos/400/800");

      setCurrentRandomImage(response.url);
    };

    if (currentQuestion?.id) getRandomImage();
  }, [currentQuestion?.id]);

  return {
    actualQuestionIndex,
    currentAlternatives,
    timeFinished,
    showQuestionResult,
    handleConfirmAnswer,
    setTimeFinished,
    currentRandomImage,
    FRACTION_PROGRESS_BAR,
    currentQuestion,
    incorrectAnswerAudioRef,
    correctAnswerAudioRef,
    TIME_PER_FRAME,
    selectedAlternative,
    setSelectedAlternative,
    correctAlternative,
  };
};
