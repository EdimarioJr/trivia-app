import { Question } from "@/models";

export const questionsFixture: Question[] = [
  {
    category: "geography",
    id: "622a1c357cc59eab6f94fe3e",
    correctAnswer: "The Hudson",
    incorrectAnswers: ["The Jackson", "The Mississippi", "The Rio Grande"],
    question: { text: "On which River does the City of New York stand?" },
    tags: [
      "rivers",
      "new_york",
      "bodies_of_water",
      "usa",
      "cities",
      "geography",
    ],
    type: "text_choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
  },
  {
    category: "film_and_tv",
    id: "646338e001d576cfac3aa2f3",
    correctAnswer: "Will Smith",
    incorrectAnswers: ["Tom Cruise", "Brad Pitt", "George Clooney"],
    question: {
      text: "In the 1997 movie 'Independence Day,' which actor won the MTV Movie Award for 'Best Kiss' with Vivica Fox?",
    },
    tags: ["actors", "film", "film_and_tv"],
    type: "text_choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
  },
  {
    category: "history",
    id: "622a1c347cc59eab6f94f9cf",
    correctAnswer: "Warren Harding",
    incorrectAnswers: ["Theodore Roosevelt", "Andrew Jackson ", "Gerald Ford"],
    question: {
      text: "Who was the 29th president of the USA, in term during the period 1921–1923?",
    },
    tags: ["usa", "presidents", "people", "history"],
    type: "text_choice",
    difficulty: "hard",
    regions: [],
    isNiche: false,
  },
  {
    category: "geography",
    id: "645cb0e67d263fd50970438d",
    correctAnswer: "Indochina",
    incorrectAnswers: ["Malay", "Malacca", "Sunda"],
    question: {
      text: "Cambodia, Laos, and Vietnam are located on what peninsula?",
    },
    tags: ["countries", "peninsulas", "southeast_asia", "asia", "geography"],
    type: "text_choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
  },
  {
    category: "food_and_drink",
    id: "622a1c367cc59eab6f95022c",
    correctAnswer: "Grapefruit & Tangerine ",
    incorrectAnswers: [
      "Apple & Banana",
      "Peach & Nectarine",
      "Durian & Jackfruit",
    ],
    question: {
      text: "Which two fruits are crossed to make an ugly fruit?",
    },
    tags: ["food", "food_and_drink"],
    type: "text_choice",
    difficulty: "hard",
    regions: [],
    isNiche: false,
  },
  {
    category: "geography",
    id: "62374206cb85f7ce9e949da2",
    correctAnswer: "Moscow",
    incorrectAnswers: ["St Petersburg", "Kazan", "Vladivostok"],
    question: { text: "What is the capital city of Russia?" },
    tags: ["geography"],
    type: "text_choice",
    difficulty: "easy",
    regions: [],
    isNiche: false,
  },
  {
    category: "music",
    id: "62506493e12f6dec240bdfbd",
    correctAnswer: "C.W. McCall",
    incorrectAnswers: ["Vicki Sue Robinson", "Sugarhill Gang", "Falco"],
    question: {
      text: "'Convoy' was a one hit wonder in 1975 by which artist?",
    },
    tags: ["songs", "one_hit_wonders", "music"],
    type: "text_choice",
    difficulty: "hard",
    regions: [],
    isNiche: false,
  },
  {
    category: "film_and_tv",
    id: "622a1c347cc59eab6f94fadb",
    correctAnswer: "Tom Hanks",
    incorrectAnswers: [
      "Daniel Day-Lewis",
      "Laurence Fishburne",
      "Anthony Hopkins",
    ],
    question: {
      text: "Who won the 1993 Academy Award for Best Leading Actor for playing the role of Andrew Beckett in Philadelphia?",
    },
    tags: ["academy_awards", "acting", "film", "film_and_tv"],
    type: "text_choice",
    difficulty: "hard",
    regions: [],
    isNiche: false,
  },
  {
    category: "society_and_culture",
    id: "6477bb12550bc819ad646b59",
    correctAnswer: "Alexa",
    incorrectAnswers: ["Siri", "Cortana", "Amazon Assistant"],
    question: { text: "Which virtual assistant is produced by Amazon? " },
    tags: ["ai", "brands", "society_and_culture", "technology"],
    type: "text_choice",
    difficulty: "easy",
    regions: [],
    isNiche: false,
  },
  {
    category: "science",
    id: "622a1c3a7cc59eab6f95102a",
    correctAnswer: "Saturn",
    incorrectAnswers: ["Neptune", "Jupiter", "Venus"],
    question: { text: "What is the sixth planet from our sun?" },
    tags: ["science"],
    type: "text_choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
  },
];