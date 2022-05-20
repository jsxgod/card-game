import styles from "../../../sass/components/Button.module.scss";

interface ButtonProps {
  content: string;
  disabled?: boolean;
  handleOnClick?: (params: unknown) => unknown;
}

export function Button({
  content,
  disabled = false,
  handleOnClick,
}: ButtonProps) {
  return (
    <button
      className={styles["default-button"]}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {content}
    </button>
  );
}
