type DictionaryEntry = { title: string; description: string };
type SubSection = { title: string; description: string };
type Section = {
  title: string;
  description: string;
  subSections?: Array<SubSection>;
};

export const dictionaryEntries: Array<DictionaryEntry> = [
  {
    title: "trick",
    description:
      "round or unit of play, which the number of determines the winner",
  },
  {
    title: "suits",
    description: "hearts (♥), diamonds (♦), clubs (♣) and spades (♠)",
  },
  {
    title: "trump",
    description:
      "A privileged suit in which, in the current round, all its cards rank higher than any plain card",
  },
  { title: "hand", description: "cards in your possesion which you can play" },
  {
    title: "lead suit",
    description: "suit of the first card played into the trick",
  },
  {
    title: "desireable card",
    description: "a card players should try to win during the trick",
  },
  {
    title: "draw a card",
    description: "take one card from the deck and put it in your hand",
  },
  { title: "stage", description: "each round consists of 2 stages" },
  { title: "round", description: "each game consists of 7 rounds" },
];

const playStages: Array<SubSection> = [
  {
    title: "First Stage",
    description: `In this stage, starting from the 27th card of the deck, one card is put face-up on top of the deck for each trick. The non-dealer plays any card for the first trick and the other player must follow suit if possible. Based on whether the face-up card is desireable players must try to either win or lose the trick on purpose. The following rules determine the winner of the trick:

  1. The highest trump suit card wins.
  2. If both cards are of the same suit then the higher card wins.
  3. If they are of different suit then the first player always wins unless bested by a card of the trump suit.

The winner of the trick takes the face-up card and places it in their hand. The loser takes the face-down card on top of the deck (the card below the face-up card taken by the winner) and places it in their hand without showing it to the opponent.

The next card in the deck is turned over and another trick of the first stage can begin. The winner of the previous trick plays first in the next trick (or stage if given trick has been the last trick of the first stage).`,
  },

  {
    title: "Second Stage",
    description: `In this stage the remaining 13 tricks are played. The winner of the last trick of the first stage leads the suit in the first trick in the second stage. The goal of this stage is to win as many tricks as possible. The stage ends when all the cards have been played.

  Scoring:
  Each trick that the winning player had (in the second stage) over 6 tricks is worth a point.
  For example 10 vs 3 tricks gives 4 points to the player who won 10 tricks.
  
After scoring the round, players can proceed to the next round. The player with the highest score after all the rounds wins the whole game.`,
  },
];

export const sections: Array<Section> = [
  {
    title: "About the game",
    description: `There are several variations of this game, the most important difference between them being whether all 26 tricks count or only the last 13. Another is whether trumps should be used or if the game should be about taking as many ("high play") - or as few ("low play") tricks as possible. While trumps or high/low makes little difference to how much luck is involved, the difference between counting all 26 tricks or only the last 13, beginning the so-called endgame as the hand is finished (beginning at the 14th trick), makes a large difference. When playing this game in two sections, the foreplay and the endgame, this version becomes the most skillful game of all for two players with a common card deck. This is because both players can calculate exactly which 13 cards the opponent has, and plan his or her play based on that knowledge. It isn't possible to know this earlier in the game.`,
  },
  {
    title: "Players and cards",
    description: `German Whist is a two player game using a standard deck of 52 cards ranked \n(low -> high) A  K Q J 10 9 8 7 6 5 4 3 2  in each suit.`,
  },
  {
    title: "The deal",
    description: `The initial dealer is chosen by a specified method, and the turn to deal alternates after each hand. Each player is dealt 13 cards, dealt one at a time while alternating between the players. \nThe 27th card is placed face-up. The suit of this face-up card is the trump suit for the entire round.`,
  },
  {
    title: "The play",
    description: `Each game consists of several rounds. Each round consists of two stages. Each stage consists of 13 tricks. \nScore is counted and given after each round.`,
    subSections: playStages,
  },
];
