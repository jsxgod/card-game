import styles from "../../../sass/components/CloseButton.module.scss";
import { BsX } from "react-icons/bs";
import { motion } from "framer-motion";

interface CloseButtonProps {
  clickHandler: (...args: unknown[]) => unknown;
  showAfter?: number;
}

export function CloseButton({ clickHandler, showAfter = 0 }: CloseButtonProps) {
  return (
    <motion.button
      className={styles.button}
      onClick={clickHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: showAfter } }}
      exit={{ opacity: 0 }}
    >
      <BsX />
    </motion.button>
  );
}
