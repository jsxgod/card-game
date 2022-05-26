import { MenuCard } from "../src/components/atoms/Card/MenuCard";
import { MainGridBox } from "../src/components/layout/grid/";
import MainMenu from "../src/components/molecules/MainMenu";
import { useEffect } from "react";
import { About, HowTo, Profile } from "../src/components/organisms";
import { Curtain } from "../src/components/atoms/Curtain/Curtain";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileAvatar,
  updateProfileNickname,
} from "../src/redux/actions/profileActions";
import { RootState } from "../src/redux/store";
import { AnimatePresence } from "framer-motion";

export default function MainPage() {
  const dispatch = useDispatch();
  const subMenuOpened = useSelector(
    (state: RootState) => state.menu.subMenuOpened
  );

  useEffect(() => {
    const localNickname = localStorage.getItem("whist-card-game-nickname");
    const localAvatar = localStorage.getItem("whist-card-game-avatar");
    if (localNickname) {
      dispatch(updateProfileNickname(localNickname));
    }
    if (localAvatar) {
      dispatch(updateProfileAvatar(JSON.parse(localAvatar)));
    }
  }, []);

  return (
    <MainGridBox>
      <span
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "100%",
          backgroundColor: "black",
          zIndex: "0",
        }}
      ></span>
      <MenuCard />
      <MainMenu />
      <AnimatePresence>
        {subMenuOpened === "profile" ? (
          <Profile />
        ) : subMenuOpened === "howto" ? (
          <HowTo />
        ) : (
          subMenuOpened === "about" && (
            <Curtain direction="down">
              <About />
            </Curtain>
          )
        )}
      </AnimatePresence>
    </MainGridBox>
  );
}
