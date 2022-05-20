interface GameTableProps {}
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import styles from "../../../sass/components/GameTable.module.scss";
import { Card } from "../../atoms/Card/Card";
import { ReverseCard } from "../../atoms/Card/ReverseCard";
import { CardSuit } from "../../atoms/Card/types";
import { PlayBox } from "../../atoms/PlayBox/PlayBox";
import { Header } from "../../atoms/Typography/Headers";
import { AnimatePresence, motion } from "framer-motion";

export function GameTable({}: GameTableProps) {
  const playerColor = useSelector((state: RootState) => state.player.color);
  const trickCards = useSelector((state: RootState) => state.game.currentTrick);
  const trumpCard = useSelector((state: RootState) => state.game.trumpCard);
  const faceUpCard = useSelector((state: RootState) => state.game.faceUpCard);
  const gameStage = useSelector((state: RootState) => state.game.stage);
  const gameOver = useSelector((state: RootState) => state.game.gameOver);
  const tricksPlayed = useSelector(
    (state: RootState) => state.game.tricksPlayed
  );
  const isDraggingCard = useSelector(
    (state: RootState) => state.player.isDraggingCard
  );

  const mapSuit = (suit: CardSuit): "♦" | "♥" | "♠" | "♣" => {
    if (suit === "hearts") {
      return "♥";
    } else if (suit === "diamonds") {
      return "♦";
    } else if (suit === "clubs") {
      return "♣";
    }
    return "♠";
  };

  return (
    <PlayBox padding={false}>
      <div className={styles["info-area-wrapper"]}></div>
      <div
        id={"play-cards-area-wrapper"}
        className={`${
          playerColor
            ? `${styles["play-cards-area-wrapper"]} ${
                isDraggingCard && styles[`${playerColor}-hover-shadow`]
              }`
            : styles["play-cards-area-wrapper"]
        }`}
      >
        <div className={styles["opponent-trick-card-wrapper"]}>
          <motion.div className={styles["card-wrapper"]}>
            {playerColor === "red"
              ? trickCards.blue && (
                  <Card
                    size="medium"
                    rank={trickCards.blue.rank}
                    suit={trickCards.blue.suit}
                    belongsTo={"blue"}
                  />
                )
              : playerColor === "blue" &&
                trickCards.red && (
                  <Card
                    size="medium"
                    rank={trickCards.red.rank}
                    suit={trickCards.red.suit}
                    belongsTo={"red"}
                  />
                )}
          </motion.div>
        </div>
        <div className={styles["player-trick-card-wrapper"]}>
          <div className={styles["card-wrapper"]}>
            <AnimatePresence>
              {playerColor === "red"
                ? trickCards.red && (
                    <Card
                      size="medium"
                      rank={trickCards.red.rank}
                      suit={trickCards.red.suit}
                      belongsTo={playerColor}
                    />
                  )
                : playerColor === "blue" &&
                  trickCards.blue && (
                    <Card
                      size="medium"
                      rank={trickCards.blue.rank}
                      suit={trickCards.blue.suit}
                      belongsTo={playerColor}
                    />
                  )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className={styles["deck-area-wrapper"]}>
        <div className={styles["trump-wrapper"]}>
          <Header as="h4" content="trump" />
          <span
            style={
              trumpCard && ["hearts", "diamonds"].includes(trumpCard.suit)
                ? { color: "#f50206" }
                : trumpCard && ["clubs", "spades"].includes(trumpCard.suit)
                ? { color: "#080808" }
                : {}
            }
          >
            {trumpCard && <Header as="h2" content={mapSuit(trumpCard.suit)} />}
          </span>
        </div>
        <div className={styles["deck-wrapper"]}>
          <div className={styles["card-wrapper"]}>
            {gameStage === "first" && (
              <ReverseCard belongsTo="deck" size="fitLayout" />
            )}
          </div>
          <div className={styles["card-wrapper"]}>
            {faceUpCard && (
              <Card
                key={faceUpCard.rank + faceUpCard.suit}
                rank={faceUpCard.rank}
                suit={faceUpCard.suit}
                belongsTo={faceUpCard.belongsTo}
                size="fitLayout"
              />
            )}
          </div>
        </div>
        {!gameOver && (
          <div className={styles["info-wrapper"]}>
            <Header
              as="h3"
              content={(
                13 -
                tricksPlayed +
                (gameStage === "second" ? 13 : 0)
              ).toString()}
            />
            <Header as="h5" content="tricks left in this stage" />
          </div>
        )}
      </div>
    </PlayBox>
  );
}

export default GameTable;
