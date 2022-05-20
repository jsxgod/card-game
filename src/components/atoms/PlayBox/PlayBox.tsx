import { ReactNode } from "react";
import styles from "../../../sass/components/Play.module.scss";

interface PlayBoxProps {
  children?: ReactNode;
  padding?: boolean;
}

export function PlayBox({ children, padding = true }: PlayBoxProps) {
  return (
    <div
      className={
        padding ? styles.playBox : `${styles.playBox} ${styles["no-padding"]}`
      }
    >
      {children}
    </div>
  );
}
