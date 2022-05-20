import { Game } from "./game";
import { GamePlayer } from "./types";

export const games: Array<Game | undefined> = [];

export const findGameById = (id: string): Game | undefined => {
  return games.find((game) => game?.id === id);
};

export const findGameBySocketID = (socketID: string): Game | undefined => {
  return games.find((game) =>
    game?.players.find((player) => player.socket === socketID)
  );
};

export const createNewGame = (
  id: string,
  players: [GamePlayer, GamePlayer]
): Game => {
  const game = new Game(id, players);
  games.push(game);
  return game;
};

export default games;
