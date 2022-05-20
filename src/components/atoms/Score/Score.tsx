import { Header } from "../Typography/Headers";
import styles from "../../../sass/components/Score.module.scss";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

interface ScoreProps {}

export function Score({}: ScoreProps) {
  const roundScore = useSelector((state: RootState) => state.game.score);
  const trickScore = useSelector((state: RootState) => state.game.trickScore);
  const playerColor = useSelector((state: RootState) => state.player.color);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Header as="h5" content="Score" />
      </div>
      <div className={styles["score-box"]}>
        <div
          className={`${
            playerColor
              ? playerColor === "red"
                ? styles["score-row-blue"]
                : styles["score-row-red"]
              : styles["score-row"]
          }`}
        >
          <div className={styles["box-flex-center"]}>
            {playerColor === "red" ? roundScore.blue : roundScore.red}
          </div>
          <div className={styles["box-flex-center"]}>
            {playerColor === "red" ? trickScore.blue : trickScore.red}
          </div>
        </div>
        <div
          className={`${
            playerColor
              ? playerColor === "red"
                ? styles["score-row-red"]
                : styles["score-row-blue"]
              : styles["score-row"]
          }`}
        >
          <div className={styles["box-flex-center"]}>
            {playerColor ? roundScore[playerColor] : 0}
          </div>
          <div className={styles["box-flex-center"]}>
            {playerColor ? trickScore[playerColor] : 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Score;
