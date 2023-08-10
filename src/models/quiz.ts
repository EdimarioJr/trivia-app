import { Answer } from "./answer";
import { Question } from "./question";

export type Quiz = {
  questions: Question[];
  answers: Answer[];
};
