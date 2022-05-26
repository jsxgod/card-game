import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import styles from "../../sass/components/MainMenu.module.scss";
import { Header } from "../atoms/Typography/Headers";
import { useDispatch, useSelector } from "react-redux";
import { closeSubMenus, openSubMenu } from "../../redux/slices/menuSlice";
import { RootState } from "../../redux/store";
import type { SubMenu } from "../../redux/slices/types";

type MainMenuProps = {};

export function MainMenu({}: MainMenuProps): JSX.Element {
  const dispatch = useDispatch();
  const openedSubMenu = useSelector(
    (state: RootState) => state.menu.subMenuOpened
  );
  const nickname = useSelector((state: RootState) => state.profile.nickname);

  const handleOpenSubMenu = (subMenu: SubMenu): void => {
    if (openedSubMenu === subMenu) {
      dispatch(closeSubMenus());
    } else {
      dispatch(openSubMenu(subMenu));
    }
  };
  const handleClickPlay = () => {
    if (nickname === "") {
      dispatch(openSubMenu("profile"));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Link href={nickname !== "" ? "/play" : ""}>
        <div className={styles["item-wrapper"]} onClick={handleClickPlay}>
          <Header as="h1" content="Play" />
        </div>
      </Link>
      <div
        className={styles["item-wrapper"]}
        onClick={() => handleOpenSubMenu("profile")}
      >
        <Header as="h1" content="Profile" />
      </div>
      <div
        className={styles["item-wrapper"]}
        onClick={() => handleOpenSubMenu("howto")}
      >
        <Header as="h1" content="How to" />
      </div>
      <div
        className={styles["item-wrapper"]}
        onClick={() => handleOpenSubMenu("about")}
      >
        <Header content="About" as="h3" />
      </div>
    </div>
  );
}

export default MainMenu;
