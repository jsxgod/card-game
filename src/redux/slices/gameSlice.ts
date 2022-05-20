import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardSuit } from "../types";
import { GameCard } from "./types";

type GameState = {
  score: { red: number; blue: number };
  trickScore: { red: number; blue: number };
  faceUpCard: GameCard<"deck"> | undefined;
  trumpCard: GameCard<"deck"> | undefined;
  dominantSuit: CardSuit | undefined;
  round: number;
  stage: "first" | "second";
  gameOver: boolean;
  gameWinner: "red" | "blue" | undefined;
  roundWinner: "red" | "blue" | undefined;
  lastTrickWinner: "red" | "blue" | undefined;
  tricksPlayed: number;
  currentTrick: {
    red: GameCard<"red"> | undefined;
    blue: GameCard<"blue"> | undefined;
  };
  trickWinnerHistory: Array<{ trickNumber: number; winner: "red" | "blue" }>;
  playsNext: "red" | "blue" | undefined;
  opponentCards: Array<number>;
};

const generateRandomNumberArray = (size: number): Array<number> => {
  const arr: Array<number> = [];
  for (let i = 1; i <= size; i++) {
    arr.push(i);
  }
  //randomize
  arr
    .map((value) => ({ value, strength: Math.random() }))
    .sort((a, b) => a.strength - b.strength)
    .map(({ value }) => value);

  return arr;
};

const initialState: GameState = {
  score: { red: 0, blue: 0 },
  trickScore: { red: 0, blue: 0 },
  faceUpCard: undefined,
  trumpCard: undefined,
  dominantSuit: undefined,
  round: 1,
  stage: "first",
  gameWinner: undefined,
  gameOver: false,
  roundWinner: undefined,
  lastTrickWinner: undefined,
  tricksPlayed: 0,
  trickWinnerHistory: [],
  currentTrick: { red: undefined, blue: undefined },
  playsNext: undefined,
  opponentCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    .map((value) => ({ value, strength: Math.random() }))
    .sort((a, b) => a.strength - b.strength)
    .map(({ value }) => value),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementScore: (
      state,
      action: PayloadAction<{ type: "trick" | "round"; color: "red" | "blue" }>
    ) => {
      action.payload.type === "trick"
        ? (state.trickScore[action.payload.color] += 1)
        : (state.score[action.payload.color] += 1);
    },
    resetTrickScore: (state) => {
      state.trickScore = { red: 0, blue: 0 };
      state.currentTrick = { red: undefined, blue: undefined };
    },
    setFaceUpCard: (
      state,
      action: PayloadAction<GameCard<"deck"> | undefined>
    ) => {
      state.faceUpCard = action.payload;
    },
    setTrumpCard: (state, action: PayloadAction<GameCard<"deck">>) => {
      state.trumpCard = action.payload;
    },
    setDominantSuit: (state, action: PayloadAction<CardSuit>) => {
      console.log(`setting dominant suit to: ${action.payload}`);
      state.dominantSuit = action.payload;
    },
    resetDominantSuit: (state) => {
      state.dominantSuit = undefined;
    },
    addTrickCard: (state, action: PayloadAction<GameCard<"red" | "blue">>) => {
      if (action.payload.belongsTo === "red") {
        state.currentTrick.red = action.payload as GameCard<"red">;
      } else {
        state.currentTrick.blue = action.payload as GameCard<"blue">;
      }
    },
    processTrickResult: (state, action: PayloadAction<"red" | "blue">) => {
      state.tricksPlayed += 1;
      state.lastTrickWinner = action.payload;
      state.trickWinnerHistory.push({
        trickNumber: state.tricksPlayed,
        winner: state.lastTrickWinner,
      });

      if (state.stage === "second") {
        state.trickScore[action.payload] += 1;
      }

      state.currentTrick = { red: undefined, blue: undefined };
      state.playsNext = state.lastTrickWinner;
    },
    processRoundResult: (state, action: PayloadAction<"red" | "blue">) => {
      state.score[action.payload] += 1;

      state.trickScore = { red: 0, blue: 0 };
      state.currentTrick = { red: undefined, blue: undefined };
      state.stage = "first";
      state.tricksPlayed = 0;
      state.trickWinnerHistory = [];
      state.round += 1;
      if (!(state.score.red === 4 || state.score.blue === 4)) {
        state.opponentCards = generateRandomNumberArray(13);
      }
    },
    processGameResult: (state, action: PayloadAction<"red" | "blue">) => {
      state.gameWinner = action.payload;
      state.gameOver = true;
    },
    switchStage: (state) => {
      state.stage === "first"
        ? (state.stage = "second")
        : (state.stage = "first");
    },
    removeOpponentCard: (state) => {
      const length = state.opponentCards.length;
      if (length > 0) {
        state.opponentCards.splice(Math.floor(Math.random() * length), 1);
      }
    },
    addOpponentCard: (state) => {
      const length = state.opponentCards.length;
      if (state.stage === "first" && length === 12) {
        state.opponentCards.push(14 + state.tricksPlayed);
      }
    },
    setPlaysNext: (
      state,
      action: PayloadAction<"red" | "blue" | undefined>
    ) => {
      state.playsNext = action.payload;
    },
    resetGame: (state) => {
      state = initialState;
    },
  },
});

export const {
  addTrickCard,
  incrementScore,
  resetGame,
  resetTrickScore,
  processRoundResult,
  processTrickResult,
  processGameResult,
  setFaceUpCard,
  setTrumpCard,
  setDominantSuit,
  resetDominantSuit,
  switchStage,
  removeOpponentCard,
  addOpponentCard,
  setPlaysNext,
} = gameSlice.actions;

export default gameSlice.reducer;
