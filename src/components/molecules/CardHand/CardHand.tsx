import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import styles from "../../../sass/components/CardHand.module.scss";
import { Card } from "../../atoms/Card/Card";
import { AnimatePresence, motion } from "framer-motion";
import {
  removeCardFromHand,
  setIsDraggingCard,
} from "../../../redux/slices/playerSlice";
import { addTrickCard } from "../../../redux/slices/gameSlice";
import { ReverseCard } from "../../atoms/Card/ReverseCard";
import { GameCard } from "../../../redux/slices/types";
import SocketContext from "../../../context/createContext";

interface CardHandProps {
  belongsTo: "player" | "opponent";
}

export function CardHand({ belongsTo }: CardHandProps) {
  const color = useSelector((state: RootState) => state.player.color);
  const cards = useSelector((state: RootState) => state.player.hand);
  const opponentCards = useSelector(
    (state: RootState) => state.game.opponentCards
  );
  const playsNext = useSelector((state: RootState) => state.game.playsNext);
  const dominantSuit = useSelector(
    (state: RootState) => state.game.dominantSuit
  );
  const mustFollowSuit = useSelector(
    (state: RootState) =>
      state.game.dominantSuit &&
      state.player.hand.filter((card) => card.suit === state.game.dominantSuit)
        .length > 0
  );
  const [clicked, setClicked] = useState<GameCard<"red" | "blue"> | undefined>(
    undefined
  );
  const [isGrabbing, setIsGrabbing] = useState(false);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const handlePlayCard = (
    card: GameCard<"red" | "blue">,
    target: HTMLElement
  ) => {
    const isProperTarget = target.closest("#play-cards-area-wrapper");
    if (isProperTarget) {
      dispatch(removeCardFromHand(card));
      dispatch(addTrickCard(card));
      socket?.emit("play-card", card);
    }
    setTimeout(() => {
      setIsGrabbing(false);
      dispatch(setIsDraggingCard(undefined));
    }, 100);
  };

  return (
    <>
      {color && (
        <motion.div
          className={`${
            belongsTo === "player"
              ? `${styles["player-wrapper"]} ${
                  color === "red"
                    ? `${styles["red-outline"]} `
                    : `${styles["blue-outline"]}`
                }`
              : `${styles["opponent-wrapper"]} ${
                  color === "red"
                    ? `${styles["blue-outline"]} `
                    : `${styles["red-outline"]}`
                }`
          } ${color !== playsNext && styles["no-pointer-events"]}`}
          layout
        >
          {belongsTo === "player" ? (
            cards.map((card, i) => (
              <motion.div
                key={"card-" + card.rank + "-" + card.suit}
                drag={
                  playsNext === color &&
                  (mustFollowSuit
                    ? dominantSuit
                      ? card.suit === dominantSuit
                      : true
                    : true)
                }
                dragSnapToOrigin={true}
                dragConstraints={false}
                whileDrag={{
                  cursor: "grabbing",
                  zIndex: 9999,
                  pointerEvents: "none",
                }}
                onDragStart={() => {
                  setIsGrabbing(true);
                  dispatch(setIsDraggingCard(card));
                }}
                onDragEnd={(event: MouseEvent) =>
                  handlePlayCard(card, event.target as HTMLElement)
                }
                className={`${styles["card-wrapper"]} ${
                  clicked
                    ? clicked.rank === card.rank && clicked.suit === card.suit
                      ? styles["selected-card"]
                      : ""
                    : ""
                } ${
                  playsNext === color &&
                  (mustFollowSuit
                    ? dominantSuit
                      ? card.suit === dominantSuit
                      : true
                    : true)
                    ? styles.hover
                    : styles["cant-play"]
                }`}
                onMouseUp={() => {
                  if (!isGrabbing) {
                    clicked?.rank === card.rank && clicked?.suit === card.suit
                      ? setClicked(undefined)
                      : setClicked(card);
                  }
                }}
              >
                {
                  <Card
                    size="big"
                    belongsTo={card.belongsTo}
                    rank={card.rank}
                    suit={card.suit}
                  />
                }
              </motion.div>
            ))
          ) : (
            <AnimatePresence>
              {opponentCards.map((value, i) => (
                <motion.div
                  id={"opponent-card-" + i}
                  key={"opponent-card-" + value}
                  className={styles["card-wrapper"]}
                >
                  <ReverseCard
                    size="big"
                    belongsTo={color === "red" ? "blue" : "red"}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </>
  );
}

export default CardHand;
