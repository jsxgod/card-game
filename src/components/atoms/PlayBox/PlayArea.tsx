import { ReactNode } from "react";
import styles from "../../../sass/components/Play.module.scss";

interface PlayAreaProps {
  children?: ReactNode;
}

export function PlayArea({ children }: PlayAreaProps) {
  return <div className={styles.playArea}>{children}</div>;
}
