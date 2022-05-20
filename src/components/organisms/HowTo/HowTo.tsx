import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { closeSubMenus } from "../../../redux/slices/menuSlice";
import styles from "../../../sass/components/HowTo.module.scss";
import { CloseButton } from "../../atoms/CloseButton/CloseButton";
import { Header } from "../../atoms/Typography/Headers";
import {
  BodyText,
  DictionaryEntryDescription,
} from "../../atoms/Typography/Paragraphs";
import { dictionaryEntries, sections } from "./data";
import { DictionaryEntryProps, SectionProps } from "./types";

type HowToProps = {};

export function HowTo({}: HowToProps) {
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.wrapper}>
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
      <CloseButton clickHandler={() => dispatch(closeSubMenus())} />
    </>
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
