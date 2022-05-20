import { Card, CardRank, CardSuit, GamePlayer, PlayerCard } from "./types";

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

const initializeDeck = (): Array<Card> => {
  const cards: Array<Card> = [];
  // fill the deck
  ranks.map((rank) => {
    suits.map((suit) => {
      cards.push({ suit, rank, belongsTo: "deck" });
    });
  });
  //shuffle the deck
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }
  return cards;
};

class Deck {
  cards: Array<Card>;
  constructor() {
    this.cards = initializeDeck();
  }
  getCard(): Card | undefined {
    return this.cards.pop();
  }
}

// ranks compared only when suit is the same as per game rules
const rankCompare = (card1: PlayerCard, card2: PlayerCard): "red" | "blue" => {
  if (ranks.indexOf(card1.rank) > ranks.indexOf(card2.rank)) {
    return card1.belongsTo;
  } else {
    return card2.belongsTo;
  }
};

const compareCards = (
  first: PlayerCard,
  second: PlayerCard,
  trump: Card
): "red" | "blue" => {
  let winner = first.belongsTo;
  if (first.suit === second.suit) {
    winner = rankCompare(first, second);
  } else {
    if (second.suit === trump.suit) {
      winner = second.belongsTo;
    }
  }
  return winner;
};

export class Game {
  id: string;
  status: "waiting" | "playing" | "finished";
  players: Array<GamePlayer>;
  round: number;
  stage: "first" | "second";
  score: { red: number; blue: number };
  trickScore: { red: number; blue: number };
  lastTrickWinner: "red" | "blue" | undefined;
  lastRoundWinner: "red" | "blue" | undefined;
  gameWinner: "red" | "blue" | undefined;
  playsNext: "red" | "blue" | undefined;
  trick: Array<PlayerCard>;
  tricksPlayed: number;
  deck: Deck;
  trump: Card | undefined;
  faceUpCard: Card | undefined;

  constructor(id: string, players: [GamePlayer, GamePlayer]) {
    this.id = id;
    this.status = "waiting";
    if (Math.random() > 0.5) {
      players[0].color = "red";
      players[1].color = "blue";
    } else {
      players[0].color = "blue";
      players[1].color = "red";
    }
    this.playsNext = Math.random() > 0.5 ? "red" : "blue";
    this.players = players;
    this.score = { red: 0, blue: 0 };
    this.trickScore = { red: 0, blue: 0 };
    this.round = 1;
    this.stage = "first";
    this.deck = new Deck();
    this.trick = [];
    this.tricksPlayed = 0;
  }
  playCard(
    card: PlayerCard
  ): "success" | "failure" | "trick-scored" | "trick-scored-failure" {
    if (this.trick.length === 2) {
      return "failure";
    }
    if (this.trick.length === 1) {
      this.trick.push(card);
      this.playsNext = undefined;
      return this.scoreTrick();
    } else {
      this.trick.push(card);
      this.playsNext = card.belongsTo === "red" ? "blue" : "red";
      return "success";
    }
  }
  addScore(color: "red" | "blue") {
    color === "red" ? (this.score.red += 1) : (this.score.blue += 1);
  }
  addTrickScore(color: "red" | "blue") {
    color === "red" ? (this.trickScore.red += 1) : (this.trickScore.blue += 1);
  }
  takeCard(): Card | undefined {
    if (this.deck.cards.length === 26) {
      this.trump = this.deck.getCard();
      this.faceUpCard = this.trump;
      return this.trump;
    } else if (this.deck.cards.length < 26 && this.deck.cards.length % 2 == 0) {
      this.faceUpCard = this.deck.getCard();
      return this.faceUpCard;
    }
    return this.deck.getCard();
  }
  dealHands(): { red: Array<PlayerCard>; blue: Array<PlayerCard> } {
    const hands: { red: Array<PlayerCard>; blue: Array<PlayerCard> } = {
      red: [],
      blue: [],
    };
    if (this.deck.cards.length === 52) {
      for (let i = 0; i < 13; i++) {
        const card1 = this.takeCard();
        const card2 = this.takeCard();
        if (card1 && card2) {
          card1.belongsTo = "red";
          card2.belongsTo = "blue";
          hands.red.push(card1 as PlayerCard);
          hands.blue.push(card2 as PlayerCard);
        }
      }
    }
    return hands;
  }
  dealTrick() {
    if (this.lastTrickWinner && this.faceUpCard) {
      this.faceUpCard.belongsTo = this.lastTrickWinner;
    }
    const loserCard = this.takeCard();
    if (loserCard) {
      loserCard.belongsTo = this.lastTrickWinner === "red" ? "blue" : "red";
    }

    const winnerCard = this.faceUpCard;
    this.faceUpCard = this.takeCard();

    return {
      winnerCard: winnerCard as PlayerCard,
      loserCard: loserCard as PlayerCard,
    };
  }
  scoreTrick(): "trick-scored" | "trick-scored-failure" {
    let winner = undefined;
    if (this.trump && this.trick.length === 2) {
      winner = compareCards(this.trick[0], this.trick[1], this.trump);
      this.playsNext = winner;
      if (this.tricksPlayed === 13) {
        this.switchStage();
      }
      if (this.stage === "second") {
        this.addTrickScore(winner);
      }
      this.trick = [];
      this.lastTrickWinner = winner;
      this.tricksPlayed += 1;
      return "trick-scored";
    }
    return "trick-scored-failure";
  }
  scoreRound(): "round-scored" {
    const winner = this.trickScore.red > this.trickScore.blue ? "red" : "blue";
    this.addScore(winner);
    this.lastRoundWinner = winner;
    this.trickScore = { red: 0, blue: 0 };
    this.tricksPlayed = 0;
    this.round += 1;
    this.deck = new Deck();
    this.switchStage();
    this.playsNext = Math.random() > 0.5 ? "red" : "blue";

    return "round-scored";
  }
  scoreGame(): "red" | "blue" {
    const winner = this.score.red > this.score.blue ? "red" : "blue";
    this.status = "finished";
    this.playsNext = undefined;
    this.gameWinner = winner;
    return winner;
  }
  changeStatus(status: "waiting" | "playing" | "finished") {
    this.status = status;
  }
  switchStage() {
    this.stage === "first" ? (this.stage = "second") : (this.stage = "first");
  }
}
