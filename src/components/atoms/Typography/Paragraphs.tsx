import { ReactNode } from "react";
import paragraphStyles from "../../../sass/components/Paragraphs.module.scss";

type ParagraphProps = { children: ReactNode };

export function BodyText({ children }: ParagraphProps): JSX.Element {
  return <p className={paragraphStyles["body-text"]}>{children}</p>;
}
export function DictionaryEntryDescription({
  children,
}: ParagraphProps): JSX.Element {
  return (
    <p className={paragraphStyles["dictionary-entry-description"]}>
      {children}
    </p>
  );
}
