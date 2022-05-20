import {
  HandwrittenHeader,
  Header,
} from "../../src/components/atoms/Typography/Headers";
import { MainGridBox } from "../../src/components/layout/grid";
import styles from "../../src/sass/components/About.module.scss";

export default function About() {
  return (
    <MainGridBox>
      <div className={styles.wrapper}>
        <Header as="h2" content={`Hope You enjoyed your stay on the`} />
      </div>
      <div className={styles.wrapper}>
        <Header as="h2" content="site" />
      </div>
      <div className={styles.wrapper}>
        <Header as="h2" content="by" />
      </div>
      <div className={styles.wrapper}>
        <HandwrittenHeader as="h1" content="Kacper" />
      </div>
      <div className={styles.wrapper}>
        <HandwrittenHeader as="h1" content="Smyczyk" />
      </div>
    </MainGridBox>
  );
}
