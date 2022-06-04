import styles from "../../../sass/components/CloseButton.module.scss";
import { BsX } from "react-icons/bs";
import { motion } from "framer-motion";

interface CloseButtonProps {
  clickHandler: (...args: unknown[]) => unknown;
  showAfter?: number;
  id?: string;
}

export function CloseButton({
  clickHandler,
  showAfter = 0,
  id,
}: CloseButtonProps) {
  return (
    <motion.button
      className={styles.button}
      id={id}
      onClick={clickHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: showAfter } }}
      exit={{ opacity: 0 }}
      style={window.innerWidth > 1200 ? { top: 0 } : { top: "10%" }}
    >
      <BsX />
    </motion.button>
  );
}
