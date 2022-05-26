import { Dispatch, SetStateAction } from "react";
import styles from "../../../sass/components/Input.module.scss";

interface InputProps {
  value: string;
  placeholder?: string;
  handleOnChange: (param: string) => void;
  textSize?: TextSize;
  invalid?: boolean;
}

type TextSize = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const tagToFontSize = (tag: TextSize): string => {
  switch (tag) {
    case "p":
      return "1rem";
    case "h1":
      return "8rem";
    case "h2":
      return "6rem";
    case "h3":
      return "4rem";
    case "h4":
      return "3rem";
    case "h5":
      return "2rem";
    case "h6":
      return "1.5rem";
  }
};

export function Input({
  value,
  placeholder = "type here...",
  textSize = "p",
  handleOnChange,
  invalid = false,
}: InputProps) {
  return (
    <input
      className={styles[`custom-input${invalid ? "-invalid" : ""}`]}
      value={value}
      onChange={(event) => handleOnChange(event.target.value)}
      type={"text"}
      style={{ fontSize: tagToFontSize(textSize) }}
      autoFocus={true}
      placeholder={placeholder}
    />
  );
}

export default Input;
