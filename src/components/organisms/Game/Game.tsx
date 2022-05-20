import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocketContext from "../../../context/createContext";
import { useGameState } from "../../../hooks/useGameState";
import {
  addOpponentCard,
  addTrickCard,
  processGameResult,
  processRoundResult,
  processTrickResult,
  removeOpponentCard,
  resetDominantSuit,
  setDominantSuit,
  setFaceUpCard,
  setPlaysNext,
  setTrumpCard,
  switchStage,
} from "../../../redux/slices/gameSlice";
import {
  addCardToHand,
  addHand,
  emptyHand,
} from "../../../redux/slices/playerSlice";
import { GameCard } from "../../../redux/slices/types";
import { RootState } from "../../../redux/store";
import { GameTableInfo } from "../../atoms/GameTableInfo/GameTableInfo";
import { PlayArea } from "../../atoms/PlayBox/PlayArea";
import Score from "../../atoms/Score/Score";
import TrickHistory from "../../atoms/TrickHistory/TrickHistory";
import CardHand from "../../molecules/CardHand/CardHand";
import GameTable from "../../molecules/GameTable/GameTable";

interface GameProps {}

export function Game({}: GameProps) {
  const nickname = useSelector((state: RootState) => state.profile.nickname);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const isHost = useSelector((state: RootState) => state.player.isHost);
  const roundOver = useSelector(
    (state: RootState) =>
      state.game.trickScore.red === 7 || state.game.trickScore.blue === 7
  );
  const stageOver = useSelector(
    (state: RootState) => state.game.tricksPlayed === 13
  );
  useEffect(() => {
    socket?.on("opponent-played-card", (payload: GameCard<"red" | "blue">) => {
      dispatch(removeOpponentCard());
      dispatch(addTrickCard(payload));
      setTimeout(() => {
        dispatch(setDominantSuit(payload.suit));
      }, 1000);
    });

    return () => {
      socket?.off("opponent-played-card");
    };
  }, []);

  useEffect(() => {
    socket?.on("plays-next", (payload: "red" | "blue" | undefined) => {
      setTimeout(() => {
        dispatch(setPlaysNext(payload));
      }, 1000);
    });
    return () => {
      socket?.off("plays-next");
    };
  }, []);

  useEffect(() => {
    socket?.on("score-trick", (payload: "red" | "blue") => {
      dispatch(setPlaysNext(undefined));
      setTimeout(() => {
        dispatch(resetDominantSuit());
        dispatch(processTrickResult(payload));
      }, 3000);
    });
    return () => {
      socket?.off("score-trick");
    };
  }, []);

  useEffect(() => {
    socket?.on("take-faceup-card", (payload: GameCard<"red" | "blue">) => {
      setTimeout(() => {
        dispatch(addCardToHand(payload));
        dispatch(addOpponentCard());
      }, 3000);
    });
    return () => {
      socket?.off("take-faceup-card");
    };
  }, []);

  useEffect(() => {
    socket?.on("take-deck-card", (payload: GameCard<"red" | "blue">) => {
      setTimeout(() => {
        dispatch(addCardToHand(payload));
        dispatch(addOpponentCard());
      }, 3000);
    });
    return () => {
      socket?.off("take-deck-card");
    };
  }, []);

  useEffect(() => {
    socket?.on("new-faceup-card", (payload: GameCard<"deck"> | undefined) => {
      setTimeout(() => {
        dispatch(setFaceUpCard(payload));
      }, 3000);
    });
    return () => {
      socket?.off("new-faceup-card");
    };
  }, []);

  useEffect(() => {
    socket?.on("switch-stage", () => {
      dispatch(switchStage());
    });
    return () => {
      socket?.off("switch-stage");
    };
  }, []);

  useEffect(() => {
    socket?.on("round-result", (payload: "red" | "blue") => {
      dispatch(emptyHand());
      dispatch(processRoundResult(payload));
    });
    return () => {
      socket?.off("round-result");
    };
  }, []);

  useEffect(() => {
    socket?.on("game-result", (payload: "red" | "blue") => {
      alert(`GAME WINNER ${payload}`);
      dispatch(processGameResult(payload));
    });
    return () => {
      socket?.off("game-result");
    };
  }, []);

  useEffect(() => {
    socket?.on(
      "new-round",
      (payload: {
        hand: Array<GameCard<"red" | "blue">>;
        faceUpCard: GameCard<"deck">;
        firstToPlay: "red" | "blue";
      }) => {
        dispatch(addHand(payload.hand));
        dispatch(setFaceUpCard(payload.faceUpCard));
        dispatch(setTrumpCard(payload.faceUpCard));
        dispatch(setPlaysNext(payload.firstToPlay));
      }
    );
    return () => {
      socket?.off("new-round");
    };
  }, []);

  useEffect(() => {
    if (!isHost) {
      return;
    }
    if (stageOver) {
      socket?.emit("request-stage-switch");
    }
  }, [stageOver]);

  useEffect(() => {
    if (!isHost) {
      return;
    }
    if (roundOver) {
      setTimeout(() => {
        socket?.emit("request-round-result");
      }, 1000);
      setTimeout(() => {
        socket?.emit("request-new-round");
      }, 3000);
    }
  }, [roundOver]);

  return (
    <>
      <PlayArea>
        <GameTable />
      </PlayArea>
      <TrickHistory />
      <Score />
      <GameTableInfo type="stage" />
      <GameTableInfo type="playsNext" />
      <CardHand belongsTo="player" />
      <CardHand belongsTo="opponent" />
    </>
  );
}

export default Game;
