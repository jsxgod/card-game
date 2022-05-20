import { ReactNode } from "react";
import styles from "../../../sass/components/Curtain.module.scss";

type CurtainProps = { direction: string; children?: ReactNode };

export function Curtain({ direction, children }: CurtainProps) {
  return <div className={styles.curtain}>{children}</div>;
}
