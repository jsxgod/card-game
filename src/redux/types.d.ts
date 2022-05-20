type CardSuit = "hearts" | "diamonds" | "clubs" | "spades";

type CardRank =
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

export type PlayingCard = { suit: CardSuit; rank: CardRank };
