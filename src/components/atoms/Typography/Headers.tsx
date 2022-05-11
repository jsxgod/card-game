import styles from "../../../sass/components/Headers.module.scss";

type HeaderProps = {
  content: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function Header({ content, as: Tag = "h3" }: HeaderProps): JSX.Element {
  return <Tag className={styles[`header-${Tag}`]}>{content}</Tag>;
}

export function HandwrittenHeader({
  content,
  as: Tag = "h1",
}: HeaderProps): JSX.Element {
  return <Tag className={styles["handwritten-header"]}>{content}</Tag>;
}
