import styles from ".././../../sass/components/Card.module.scss";
import { CardProps } from "./types";
import { motion } from "framer-motion";

export function Card({
  size = "small",
  belongsTo = "deck",
  suit,
  rank,
}: CardProps): JSX.Element {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img
        src={`/assets/cards/${suit}/${rank}.png`}
        alt="card"
        className={`${styles[size]}`}
      />
    </motion.div>
  );
}
