import express, { Express, Request, Response } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
import games, { createNewGame, findGameBySocketID } from "./games";
import { CardRank, CardSuit, GamePlayer, PlayerCard } from "./types";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app: Express = express();
  app.use(express.json());
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on("connection", (socket: socketio.Socket) => {
    console.log("connection --- " + socket.id);

    // click play in main menu
    socket.on("create-room", (...args) => {
      socket.join(`game-${socket.id}`);
    });

    // join room & leave own room created on create-room
    socket.on(
      "join-room",
      (args: {
        roomID: string;
        data: { nickname: string; avatar: { rank: CardRank; suit: CardSuit } };
      }) => {
        const roomName = "game-" + args.roomID;
        const room = io.sockets.adapter.rooms.get(roomName);
        if (room !== undefined) {
          if (room?.size < 2) {
            socket.leave("game-" + socket.id);
            socket.join(roomName);
            socket.to(roomName).emit("player-joined", {
              nickname: args.data.nickname,
              avatar: args.data.avatar,
              gameID: roomName,
            });
            socket.emit("joined-lobby", {
              status: "success",
              gameID: roomName,
            });
          } else {
            socket.emit("joined-lobby", { status: "failure", gameID: "" });
          }
        } else {
          socket.emit("joined-lobby", { status: "failure", gameID: "" });
        }
      }
    );

    socket.on(
      "send-data",
      (args: {
        roomName: string;
        nickname: string;
        avatar: { rank: CardRank; suit: CardSuit };
      }) => {
        socket.to("game-" + args.roomName).emit("opponent-data", {
          nickname: args.nickname,
          avatar: args.avatar,
        });
      }
    );

    // only emitted by the host
    socket.on("players-ready", (args: { roomID: string }) => {
      const gameID = "game-" + args.roomID;
      const room = io.sockets.adapter.rooms.get(gameID);
      let opponentSocketID: string | undefined = undefined;
      if (room) {
        const otherMembers: Array<string> = Array.from(room).filter(
          (roomMember) => roomMember !== socket.id
        );
        if (otherMembers.length === 1) {
          opponentSocketID = otherMembers[0];
        }
      }
      if (opponentSocketID === undefined) {
        console.log("game-creation-error");
        io.in(gameID).emit("game-creation-error");
      } else {
        const hostPlayer: GamePlayer = {
          color: undefined,
          socket: socket.id,
        };
        const opponent: GamePlayer = {
          color: undefined,
          socket: opponentSocketID,
        };
        const game = createNewGame(gameID, [hostPlayer, opponent]);
        const hands = game.dealHands(); // takes 26 cards
        const firstFaceUpCard = game.takeCard(); // takes 27th card (trump and first faceUp card)
        const hostColor = game.players[0].color;
        const opponentColor = game.players[1].color;

        const hostPayload = {
          color: hostColor,
          hand: hostColor === "red" ? hands.red : hands.blue,
          faceUpCard: firstFaceUpCard,
          firstToPlay: game.playsNext,
        };

        const opponentPayload = {
          color: opponentColor,
          hand: opponentColor === "red" ? hands.red : hands.blue,
          faceUpCard: firstFaceUpCard,
          firstToPlay: game.playsNext,
        };

        if (game !== undefined) {
          io.to(socket.id).emit("game-created", hostPayload);
          io.to(opponentSocketID).emit("game-created", opponentPayload);
          io.in(gameID).emit("render-game", gameID);
        }
      }
    });

    //user played card
    socket.on("play-card", (args: PlayerCard) => {
      const game = findGameBySocketID(socket.id);
      if (!game) {
        return;
      }
      const tricksPlayedUpToNow = game.tricksPlayed;
      const response = game.playCard(args);

      if (response === "success") {
        socket.to(game.id).emit("opponent-played-card", args);
        io.in(game.id).emit("plays-next", game.playsNext);
      } else if (response === "trick-scored") {
        socket.to(game.id).emit("opponent-played-card", args);
        io.in(game.id).emit("score-trick", game.lastTrickWinner);

        //opponent
        const opponent = game.players.filter(
          (player) => player.socket !== socket.id
        )[0];

        // dealing cards post trick
        if (tricksPlayedUpToNow >= 13 && tricksPlayedUpToNow < 26) {
          // [14-26) dont deal
          //io.to(game.id).emit("plays-next", game.playsNext);
        } else if (tricksPlayedUpToNow < 13) {
          // [1-13] deal
          const trickDealCards = game.dealTrick();
          const winningColor = trickDealCards.winnerCard.belongsTo;

          if (opponent.color === winningColor) {
            io.to(opponent.socket).emit(
              "take-faceup-card",
              trickDealCards.winnerCard
            );
            io.to(socket.id).emit("take-deck-card", trickDealCards.loserCard);
          } else {
            io.to(socket.id).emit(
              "take-faceup-card",
              trickDealCards.winnerCard
            );
            io.to(opponent.socket).emit(
              "take-deck-card",
              trickDealCards.loserCard
            );
          }

          io.in(game.id).emit("new-faceup-card", game.faceUpCard);
          //io.to(game.id).emit("plays-next", game.playsNext);
        }
      }
    });

    socket.on("request-plays-next", () => {
      const game = findGameBySocketID(socket.id);
      if (!game || game.status === "finished") {
        return;
      }
      io.in(game.id).emit("plays-next", game.playsNext);
      //socket.emit("plays-next", game.playsNext);
    });

    //stage switch
    socket.on("request-stage-switch", () => {
      const game = findGameBySocketID(socket.id);
      if (!game) {
        return;
      }
      io.in(game.id).emit("switch-stage");
    });

    //round results
    socket.on("request-round-result", () => {
      const game = findGameBySocketID(socket.id);
      if (!game) {
        return;
      }
      game.scoreRound();
      io.in(game.id).emit("round-result", game.lastRoundWinner);
    });

    //game results
    socket.on("request-game-result", () => {
      const game = findGameBySocketID(socket.id);
      if (!game) {
        return;
      }
      game.scoreGame();
      io.in(game.id).emit("game-result", game.gameWinner);
    });

    // request new round data
    socket.on("request-new-round", () => {
      const game = findGameBySocketID(socket.id);
      if (!game) {
        return;
      }
      if (game.score.red === 4 || game.score.blue === 4) {
        game.scoreGame();
        io.in(game.id).emit("game-result", game.gameWinner);
        return;
      }
      const hands = game.dealHands(); // takes 26 cards
      const firstFaceUpCard = game.takeCard(); // takes 27th card (trump and first faceUp card)

      const socketColor = game.players.filter(
        (player) => player.socket === socket.id
      )[0].color;

      const hostPayload = {
        hand: socketColor === "red" ? hands.red : hands.blue,
        faceUpCard: firstFaceUpCard,
        firstToPlay: game.playsNext,
      };

      const opponentPayload = {
        hand: socketColor === "red" ? hands.blue : hands.red,
        faceUpCard: firstFaceUpCard,
        firstToPlay: game.playsNext,
      };

      const room = io.sockets.adapter.rooms.get(game.id);
      let opponentSocketID: string | undefined = undefined;
      if (room) {
        const otherMembers: Array<string> = Array.from(room).filter(
          (roomMember) => roomMember !== socket.id
        );
        if (otherMembers.length === 1) {
          opponentSocketID = otherMembers[0];
        }
      }
      if (opponentSocketID) {
        io.to(socket.id).emit("new-round", hostPayload);
        io.to(opponentSocketID).emit("new-round", opponentPayload);
      }
    });

    // disconnecting
    socket.on("disconnecting", () => {
      console.log("disconnecting");
      const emitID = Array.from(socket.rooms.keys()).find(
        (id) => id !== socket.id
      );
      if (emitID) {
        io.in(emitID).emit("opponent-disconnected", socket.id);
      }
    });

    // disconnect
    socket.on("disconnect", () => {
      const game = findGameBySocketID(socket.id);
      if (game) {
        io.in(game.id).emit("opponent-disconnected");
        const idx = games.findIndex((g) => g?.id === game.id);
        games.splice(idx, 1);
      }
      const emitID = Array.from(socket.rooms.keys()).find(
        (id) => id !== socket.id
      );
      if (emitID) {
        io.in(emitID).emit("opponent-disconnected", socket.id);
      }
      console.log("client disconnected");
    });
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
