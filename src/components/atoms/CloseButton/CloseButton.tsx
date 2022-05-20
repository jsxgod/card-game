import styles from "../../../sass/components/CloseButton.module.scss";
import { BsX } from "react-icons/bs";

interface CloseButtonProps {
  clickHandler: (...args: unknown[]) => unknown;
}

export function CloseButton({ clickHandler }: CloseButtonProps) {
  return (
    <button className={styles.button} onClick={clickHandler}>
      <BsX />
    </button>
  );
}
