import { Question } from "./question";

export type Answer = {
  id: string;
  answer: string;
  questionId: Question["id"];
};
