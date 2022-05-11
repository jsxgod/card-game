import { Dispatch, SetStateAction } from "react";
import { SubMenuType } from "../../../pages/types";
import styles from "../../sass/components/MainMenu.module.scss";
import { Header } from "../atoms/Typography/Headers";

type MainMenuProps = {
  handleOpenSubmenu: Dispatch<SetStateAction<SubMenuType>>;
};

export function MainMenu({ handleOpenSubmenu }: MainMenuProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles["item-wrapper"]}>
        <Header as="h1" content="Play" />
      </div>
      <div
        className={styles["item-wrapper"]}
        onClick={() => handleOpenSubmenu("profile")}
      >
        <Header as="h1" content="Profile" />
      </div>
      <div
        className={styles["item-wrapper"]}
        onClick={() => handleOpenSubmenu("howto")}
      >
        <Header as="h1" content="How to" />
      </div>
      <div className={styles["item-wrapper"]}>
        <Header content="About" as="h3" />
      </div>
    </div>
  );
}

export default MainMenu;
