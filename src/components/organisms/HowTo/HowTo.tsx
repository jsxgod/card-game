import { Dispatch, SetStateAction } from "react";
import { SubMenuType } from "../../../../pages/types";
import styles from "../../../sass/components/HowTo.module.scss";
import { Header } from "../../atoms/Typography/Headers";
import {
  BodyText,
  DictionaryEntryDescription,
} from "../../atoms/Typography/Paragraphs";
import { dictionaryEntries, sections } from "./data";
import { DictionaryEntryProps, SectionProps } from "./types";

type HowToProps = {
  handleOpenSubmenu: Dispatch<SetStateAction<SubMenuType>>;
};

export function HowTo({ handleOpenSubmenu }: HowToProps) {
  return (
    <div
      className={styles.wrapper}
      onMouseLeave={() => handleOpenSubmenu(undefined)}
    >
      <span
        className={styles["close-zone"]}
        onMouseEnter={() => handleOpenSubmenu(undefined)}
      ></span>
      <div className={styles["title-wrapper"]}>
        <Header as="h1" content="How to play" />
      </div>
      <div className={styles["sections-container"]}>
        {sections.map((section) => (
          <>
            <Section
              key={"section-" + section.title}
              title={section.title}
              description={section.description}
            />
            {section.subSections &&
              section.subSections.map((subSection) => (
                <SubSection
                  key={"sub-section-" + subSection.title}
                  title={subSection.title}
                  description={subSection.description}
                />
              ))}
          </>
        ))}
      </div>
      <div className={styles["dictionary-wrapper"]}>
        <div className={styles["dictionary-header-wrapper"]}>
          <Header as="h4" content="Dictionary" />
        </div>
        {dictionaryEntries.map((entry) => (
          <DictionaryEntry
            key={entry.title}
            title={entry.title}
            description={entry.description}
          />
        ))}
      </div>
    </div>
  );
}
export default HowTo;

function Section({ title, description }: SectionProps) {
  return (
    <div className={styles.section}>
      <Header as="h4" content={"#"} />
      <Header as="h4" content={title} />
      <BodyText>{description}</BodyText>
    </div>
  );
}
function SubSection({ title, description }: SectionProps) {
  return (
    <div className={styles.section}>
      <Header as="h5" content={""} />
      <Header as="h5" content={title} />
      <BodyText>{description}</BodyText>
    </div>
  );
}

function DictionaryEntry({ title, description }: DictionaryEntryProps) {
  return (
    <div className={styles.entry}>
      <div className={styles["entry-title"]}>
        <BodyText>{title}</BodyText>
      </div>
      <div className={styles["entry-description"]}>
        <DictionaryEntryDescription>{description}</DictionaryEntryDescription>
      </div>
    </div>
  );
}
