import { MenuCard } from "../src/components/atoms/Card/MenuCard";
import { MainGridBox } from "../src/components/layout/grid/";
import MainMenu from "../src/components/molecules/MainMenu";
import { useState } from "react";
import { SubMenuType } from "./types";
import { HowTo, Profile } from "../src/components/organisms";

export default function MainPage() {
  const [subMenuOpened, setSubMenuOpened] = useState<SubMenuType>();

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
      {subMenuOpened !== "profile" && (
        <MenuCard suit="spades" rank="K" belongsTo="deck" />
      )}
      <MainMenu handleOpenSubmenu={setSubMenuOpened} />
      {subMenuOpened === "profile" ? (
        <Profile />
      ) : (
        subMenuOpened === "howto" && (
          <HowTo handleOpenSubmenu={setSubMenuOpened} />
        )
      )}
    </MainGridBox>
  );
}
