export type CardSize = "small" | "medium" | "big" | "fitLayout";

export type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";

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

export type CardOwner = "red" | "blue" | "deck";

interface Card {
  rank: CardRank;
  suit: CardSuit;
  belongsTo: CardOwner;
  shows: "front" | "back";
}

export interface ReverseCardProps {
  size: CardSize;
  belongsTo: CardOwner;
}

type CardProps = {
  size: CardSize;
  suit: CardSuit;
  rank: CardRank;
  belongsTo: CardOwner;
};
