import styles from ".././../../sass/components/Card.module.scss";
import { CardProps } from "./types";

export function Card({
  size = "small",
  belongsTo = "deck",
  suit,
  rank,
}: CardProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <img
        src={`/assets/cards/${suit}/${rank}.png`}
        alt="card"
        className={`${styles[size]}`}
      />
    </div>
  );
}
