import { ReactNode } from "react";
import styles from "../../../sass/components/Curtain.module.scss";
import { motion } from "framer-motion";

type CurtainProps = { direction: string; children?: ReactNode };

export function Curtain({ direction, children }: CurtainProps) {
  return (
    <motion.div
      className={styles.curtain}
      initial={{ top: "-100%" }}
      animate={{
        top: 0,
        transition: { duration: 0.6, ease: [0, 0.55, 0.45, 1] },
      }}
      exit={{
        top: "-100%",
        transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
      }}
    >
      {children}
    </motion.div>
  );
}
