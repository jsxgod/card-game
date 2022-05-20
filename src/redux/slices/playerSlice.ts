import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardRank, CardSuit } from "../types";
import { GameCard } from "./types";

type PlayerState = {
  gameID: string | undefined;
  color: "red" | "blue" | undefined;
  hand: Array<GameCard<"red" | "blue">>;
  isHost: boolean;
  opponentNickname: string;
  opponentAvatar: { rank: CardRank; suit: CardSuit } | undefined;
  isDraggingCard: GameCard<"red" | "blue"> | undefined;
};

const initialState: PlayerState = {
  gameID: undefined,
  color: undefined,
  hand: [],
  isHost: true,
  opponentNickname: "",
  opponentAvatar: undefined,
  isDraggingCard: undefined,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setGameID: (state, action: PayloadAction<string>) => {
      state.gameID = action.payload;
    },
    setColor: (state, action: PayloadAction<"red" | "blue">) => {
      state.color = action.payload;
    },
    addCardToHand: (state, action: PayloadAction<GameCard<"red" | "blue">>) => {
      if (state.hand.length < 13 && action.payload.belongsTo === state.color) {
        state.hand.push(action.payload);
      } else {
        // do nothing - hand at max capacity or wrong color
      }
    },
    addHand: (
      state,
      action: PayloadAction<Array<GameCard<"red" | "blue">>>
    ) => {
      if (state.hand.length === 0) {
        if (action.payload.every((card) => card.belongsTo === state.color)) {
          state.hand = action.payload;
        }
      }
    },
    emptyHand: (state) => {
      state.hand = [];
    },
    removeCardFromHand: (
      state,
      action: PayloadAction<GameCard<"red" | "blue">>
    ) => {
      const temp = state.hand.slice();
      state.hand = temp.filter(
        (card) =>
          !(
            card.rank == action.payload.rank &&
            card.suit === action.payload.suit
          )
      );
    },
    switchIsHost: (state) => {
      state.isHost = !state.isHost;
    },
    setOpponentNickname: (state, action: PayloadAction<string>) => {
      state.opponentNickname = action.payload;
    },
    setOpponentAvatar: (
      state,
      action: PayloadAction<{ rank: CardRank; suit: CardSuit }>
    ) => {
      state.opponentAvatar = action.payload;
    },
    setIsDraggingCard: (
      state,
      action: PayloadAction<GameCard<"red" | "blue"> | undefined>
    ) => {
      state.isDraggingCard = action.payload;
    },
  },
});

export const {
  setGameID,
  setColor,
  addHand,
  emptyHand,
  addCardToHand,
  removeCardFromHand,
  switchIsHost,
  setOpponentNickname,
  setOpponentAvatar,
  setIsDraggingCard,
} = playerSlice.actions;

export default playerSlice.reducer;
