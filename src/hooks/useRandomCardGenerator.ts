import { useState } from "react";
import { CardRank, CardSuit } from "../components/atoms/Card/types";
import { GameCard } from "../redux/slices/types";
import { useInterval } from "./useInterval";

const ranks: ReadonlyArray<CardRank> = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const suits: ReadonlyArray<CardSuit> = [
  "hearts",
  "diamonds",
  "clubs",
  "spades",
];

export function useRandomCardGenerator(
  ms: number,
  start: "manual" | "auto" = "auto"
) {
  const [card, setCard] = useState<GameCard<"deck">>({
    belongsTo: "deck",
    rank: "K",
    suit: "spades",
  });
  const [isWaiting, setIsWaiting] = useState(start === "auto");

  const getRandomCard = (): GameCard<"deck"> => {
    const randomRank = ranks[Math.floor(ranks.length * Math.random())];
    const randomSuit = suits[Math.floor(suits.length * Math.random())];
    return { belongsTo: "deck", rank: randomRank, suit: randomSuit };
  };

  useInterval(
    () => {
      const newCard = getRandomCard();
      setCard(newCard);
    },
    isWaiting ? ms : null
  );

  return { card, isWaiting, setIsWaiting };
}
