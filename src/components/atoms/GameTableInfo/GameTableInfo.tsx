import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import styles from "../../../sass/components/GameTableInfo.module.scss";
import { Header } from "../Typography/Headers";
interface GameTableInfoProps {
  type: "stage" | "playsNext";
}

export function GameTableInfo({ type }: GameTableInfoProps) {
  const playsNext = useSelector((state: RootState) => state.game.playsNext);
  const stage = useSelector((state: RootState) => state.game.stage);
  return (
    <div
      className={`${styles.wrapper} ${
        type === "stage" ? styles.top : styles.bottom
      }`}
    >
      <div className={styles["title-box"]}>
        {type === "stage" ? (
          <Header as="h5" content="Stage" />
        ) : (
          type === "playsNext" && <Header as="h5" content="Plays" />
        )}
      </div>
      <div
        className={`${styles["info-box"]} ${
          playsNext && type === "playsNext"
            ? playsNext === "red"
              ? styles["text-color-red"]
              : styles["text-color-blue"]
            : ""
        }`}
      >
        <div className={styles.box}>
          {type === "stage" ? (
            <Header as="h5" content={stage} />
          ) : (
            type === "playsNext" && (
              <Header as="h5" content={playsNext ? playsNext : ""} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
