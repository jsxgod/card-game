import styles from ".././../../sass/components/Card.module.scss";
import { ReverseCardProps } from "./types";
import { motion } from "framer-motion";

export function ReverseCard({
  size = "small",
  belongsTo = "deck",
}: ReverseCardProps): JSX.Element {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "10%", opacity: 0 }}
    >
      <img
        src={`/assets/cards/reverse/${belongsTo}.png`}
        alt="card"
        className={`${styles[size]}`}
      />
    </motion.div>
  );
}
