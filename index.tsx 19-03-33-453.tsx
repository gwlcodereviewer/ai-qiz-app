/**
 * Name: MOCK_HEADER_OPTIONS
 * Desc: Header options mock data
 */
export const MOCK_HEADER_OPTIONS = ["Age Group", "Difficultly Level", "Topic"];

/**
 * Name: MOCK_AGE_GROUPS
 * Desc: Age groups mock data
 */
export const MOCK_AGE_GROUPS = [
  {
    id: 1,
    value: "3 - 5 yr",
    image: "/child3.svg",
  },
  {
    id: 2,
    value: "6 - 8 yr",
    image: "/child6.svg",
  },
  {
    id: 3,
    value: "9 - 11 yr",
    image: "/child9.svg",
  },
  {
    id: 4,
    value: "12 - 14 yr",
    image: "/child12.svg",
  },
];

/**
 * Name: MOCK_DIFFICULTY_LEVEL
 * Desc: difficulty level mock data
 */
export const MOCK_DIFFICULTY_LEVEL = [
  {
    id: 1,
    value: "Easy",
    image: "/easyIcon.svg",
  },
  {
    id: 2,
    value: "Introvert",
    image: "/introvertIcon.svg",
  },
  {
    id: 3,
    value: "Advance",
    image: "/advanceIcon.svg",
  },
  {
    id: 4,
    value: "Hard",
    image: "/hardIcon.svg",
  },
];

/**
 * Name: MOCK_POPULAR_TOPICS
 * Desc: Popular topics mock data
 */
export const MOCK_POPULAR_TOPICS = [
  {
    id: 1,
    value: "Hiking in White Mountains",
  },
  {
    id: 2,
    value: "Crossword Puzzles",
  },
  {
    id: 3,
    value: "Painting",
  },
  {
    id: 4,
    value: "Wood Working",
  },
  {
    id: 5,
    value: "Pencil Sketching",
  },
  {
    id: 6,
    value: "Piano Playing",
  },
  {
    id: 7,
    value: "Singing",
  },
  {
    id: 8,
    value: "Clay Sculpting",
  },
];

/**
 * Name: MOCK_RESPONSE_STRUCTURE
 * Desc: Mock JSON structure for api request
 */
export const MOCK_RESPONSE_STRUCTURE = {
  questions: [
    {
      question: "Who was the first woman to win a Nobel Prize?",
      answers: [
        {
          id: "A",
          answer: "Marie Curie",
        },
        {
          id: "B",
          answer: "Rosalind Franklin",
        },
        {
          id: "C",
          answer: "Jane Goodall",
        },
        {
          id: "D",
          answer: "Margaret Thatcher",
        },
      ],
      correctAnswerId: "A",
    },
  ],
};
