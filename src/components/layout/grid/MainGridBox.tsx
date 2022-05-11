import { ReactNode } from "react";
import styles from "../../../sass/components/MainGridBox.module.scss";

type MainGridBoxProps = { children?: ReactNode };

export function MainGridBox({ children }: MainGridBoxProps): JSX.Element {
  return <div className={styles.wrapper}>{children}</div>;
}

export default MainGridBox;
