import { MenuCardProps } from "./types";
import styles from "../../../sass/components/Card.module.scss";

export function MenuCard({
  belongsTo = "deck",
  suit,
  rank,
}: MenuCardProps): JSX.Element {
  return (
    <div className={styles["menu-card-wrapper"]}>
      <img
        src={`/assets/cards/${suit}/${rank}.png`}
        alt="card"
        className={`${styles["fitLayout"]}`}
      />
    </div>
  );
}
