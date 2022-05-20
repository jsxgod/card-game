import { HandwrittenHeader, Header } from "../../atoms/Typography/Headers";
import { MainGridBox } from "../../layout/grid";
import styles from "../../../sass/components/About.module.scss";
import { CloseButton } from "../../atoms/CloseButton/CloseButton";
import { Dispatch, SetStateAction } from "react";
import { closeSubMenus } from "../../../redux/slices/menuSlice";
import { useDispatch } from "react-redux";

type AboutProps = {};

export default function About({}: AboutProps) {
  const dispatch = useDispatch();

  return (
    <MainGridBox>
      <CloseButton clickHandler={() => dispatch(closeSubMenus())} />
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
