export type CardRank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";

export type Card = {
  rank: CardRank;
  suit: CardSuit;
  belongsTo: "red" | "blue" | "deck";
};

export type PlayerCard = {
  belongsTo: "red" | "blue";
} & Card;

export interface GameProps {
  players: [GamePlayer, GamePlayer];
}

export type GamePlayer = {
  socket: string;
  color: "red" | "blue" | undefined;
};
