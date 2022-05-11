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
  suit: CardSuit;
  rank: CardRank;
  belongsTo: CardOwner;
  shows: "front" | "back";
}

type CardProps = {
  size: CardSize;
  suit: CardSuit;
  rank: CardRank;
  belongsTo: CardOwner;
};

export type MenuCardProps = {
  suit: CardSuit;
  rank: CardRank;
  belongsTo: CardOwner;
};
