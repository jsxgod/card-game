import { PlayBox } from "../../atoms/PlayBox/PlayBox";
import styles from "../../../sass/pages/PlayPage.module.scss";
import { Header } from "../../atoms/Typography/Headers";
import { BodyText } from "../../atoms/Typography/Paragraphs";
import { Card } from "../../atoms/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useWaitingDots } from "../../../hooks/useWaitingDots";
import { LobbyTab } from "../../../../pages/play/types";
import Input from "../../atoms/Input/Input";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/Button/Button";
import SocketContext from "../../../context/createContext";
import {
  addHand,
  setColor,
  setOpponentAvatar,
  setOpponentNickname,
  switchIsHost,
} from "../../../redux/slices/playerSlice";
import { GameCard } from "../../../redux/slices/types";
import {
  setFaceUpCard,
  setPlaysNext,
  setTrumpCard,
} from "../../../redux/slices/gameSlice";
import { useRouter } from "next/router";
import { useRandomCardGenerator } from "../../../hooks/useRandomCardGenerator";
import { CardRank, CardSuit } from "../../atoms/Card/types";
import { motion } from "framer-motion";

interface LobbyProps {
  openedTab: LobbyTab;
  handleOpenTab: Dispatch<SetStateAction<LobbyTab>>;
}

export function Lobby({ openedTab, handleOpenTab }: LobbyProps) {
  const [joinLink, setJoinLink] = useState<string>("");
  const nickname = useSelector((state: RootState) => state.profile.nickname);
  const avatar = useSelector((state: RootState) => state.profile.avatar);
  const opponentNickname = useSelector(
    (state: RootState) => state.player.opponentNickname
  );
  const opponentAvatar = useSelector(
    (state: RootState) => state.player.opponentAvatar
  );
  const isHost = useSelector((state: RootState) => state.player.isHost);
  const playerDots = useWaitingDots(1000);
  const linkDots = useWaitingDots(1000);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const randomCardGenerator = useRandomCardGenerator(500);

  useEffect(() => {
    if (socket) {
      setTimeout(() => {
        linkDots.setIsWaiting(false);
      }, Math.floor(Math.random() * (5000 - 3000)) + 5000);
    }
  }, []);

  useEffect(() => {
    socket?.on(
      "player-joined",
      (payload: {
        nickname: string;
        avatar: { rank: CardRank; suit: CardSuit };
      }) => {
        playerDots.setIsWaiting(false);
        randomCardGenerator.setIsWaiting(false);
        dispatch(setOpponentNickname(payload.nickname));
        dispatch(setOpponentAvatar(payload.avatar));
        socket.emit("send-data", {
          roomName: socket.id,
          nickname,
          avatar,
        });
      }
    );
    return () => {
      socket?.off("player-joined");
    };
  }, []);

  // receive opponent nickname (received only by the players that joins a lobby)
  useEffect(() => {
    socket?.on(
      "opponent-data",
      (payload: {
        nickname: string;
        avatar: { rank: CardRank; suit: CardSuit };
      }) => {
        dispatch(setOpponentNickname(payload.nickname));
        dispatch(setOpponentAvatar(payload.avatar));
        playerDots.setIsWaiting(false);
        randomCardGenerator.setIsWaiting(false);
      }
    );
    return () => {
      socket?.off("opponent-data");
    };
  }, []);

  useEffect(() => {
    socket?.on("game-creation-error", () => {
      alert("Error while creating game.");
    });
    socket?.on(
      "game-created",
      (payload: {
        color: "red" | "blue";
        hand: Array<GameCard<"red" | "blue">>;
        faceUpCard: GameCard<"deck">;
        firstToPlay: "red" | "blue";
      }) => {
        dispatch(setColor(payload.color));
        dispatch(addHand(payload.hand));
        dispatch(setFaceUpCard(payload.faceUpCard));
        dispatch(setTrumpCard(payload.faceUpCard));
        dispatch(setPlaysNext(payload.firstToPlay));
      }
    );
    socket?.on("render-game", (payload: string) => {
      setTimeout(() => {
        router.push(`/game?gameID=${payload}`);
      }, Math.floor(Math.random() * (3000 - 1000)) + 1000);
    });

    return () => {
      socket?.off("game-creation-error");
      socket?.off("game-created");
      socket?.off("render-game");
    };
  }, []);

  useEffect(() => {
    socket?.emit("create-room");
  }, []);

  const handleJoinLinkChanged = (value: string): void => {
    setJoinLink(value);
  };

  const handleJoinLobby = () => {
    const args = { roomID: joinLink, data: { nickname, avatar } };
    socket?.emit("join-room", args);
    dispatch(switchIsHost());
    handleOpenTab("play");
  };

  const handlePlayersReady = () => {
    if (!isHost) {
      return;
    }
    socket?.emit("players-ready", { roomID: socket.id });
  };

  return (
    <>
      {openedTab === "play" ? (
        <PlayBox>
          {!opponentNickname && (
            <>
              <div className={styles.row}>
                <Header
                  as="h3"
                  content={`Go ahead and share your game\ninvitation code:`}
                />
              </div>
              <div className={styles.row}>
                <Header
                  as="h5"
                  content={`${
                    linkDots.isWaiting
                      ? linkDots.dots
                      : socket
                      ? socket?.id
                      : "server error"
                  }`}
                />
              </div>
            </>
          )}
          <div className={styles[!opponentNickname ? "row" : "column"]}>
            <motion.div className={styles.player} layout>
              <Card
                size="fitLayout"
                suit={avatar.suit}
                rank={avatar.rank}
                belongsTo="deck"
              />
              <div className={styles["absolute-wrapper"]}>
                <BodyText>{nickname}</BodyText>
              </div>
            </motion.div>
            <motion.div className={styles.player} layout>
              <Card
                size="fitLayout"
                suit={
                  randomCardGenerator.isWaiting
                    ? randomCardGenerator.card.suit
                    : opponentAvatar
                    ? opponentAvatar.suit
                    : randomCardGenerator.card.suit
                }
                rank={
                  randomCardGenerator.isWaiting
                    ? randomCardGenerator.card.rank
                    : opponentAvatar
                    ? opponentAvatar.rank
                    : randomCardGenerator.card.rank
                }
                belongsTo="deck"
              />
              <div className={styles["absolute-wrapper"]}>
                <BodyText>
                  {playerDots.isWaiting ? playerDots.dots : opponentNickname}
                </BodyText>
              </div>
            </motion.div>
          </div>
          {isHost && opponentNickname && (
            <div className={styles.column}>
              <Button
                content="START"
                disabled={opponentNickname === ""}
                handleOnClick={handlePlayersReady}
              />
            </div>
          )}
          {!isHost && opponentNickname && (
            <div className={styles.column}>
              <Header content="Waiting..." as="h4" />
            </div>
          )}
        </PlayBox>
      ) : (
        <PlayBox>
          <div className={styles.row}>
            <Header
              as="h3"
              content={`Go ahead and enter the game\ninvitation code:`}
            />
          </div>
          <div className={styles.row}>
            <Input
              textSize="h5"
              value={joinLink}
              handleOnChange={handleJoinLinkChanged}
              placeholder={". . ."}
            />
          </div>

          <div className={styles.row}>
            <div className={styles["button-wrapper"]}>
              <Button
                content="JOIN"
                disabled={joinLink === ""}
                handleOnClick={handleJoinLobby}
              />
            </div>
          </div>
        </PlayBox>
      )}
    </>
  );
}
