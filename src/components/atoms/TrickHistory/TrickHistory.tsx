import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import styles from "../../../sass/components/TrickHistory.module.scss";
import { Header } from "../Typography/Headers";

interface TrickHistoryProps {}

export function TrickHistory({}: TrickHistoryProps) {
  const history = useSelector(
    (state: RootState) => state.game.trickWinnerHistory
  );

  return (
    <div className={styles.wrapper}>
      {history.map((trick, i) => (
        <div key={"trick-history-entry-" + i} className={styles["row-wrapper"]}>
          <div className={styles["flex-center-wrapper"]}>
            <span className={styles["trick-number"]}>{i + 1}</span>
          </div>
          <div className={styles["flex-center-wrapper"]}>
            <span
              className={`${styles["trick-winner"]} ${
                trick.winner === "red" ? styles["red-bg"] : styles["blue-bg"]
              }`}
            ></span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrickHistory;
