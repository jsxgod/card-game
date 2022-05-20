import { MainGridBox } from "../../src/components/layout/grid";
import { PlayArea } from "../../src/components/atoms/PlayBox/PlayArea";
import { Lobby } from "../../src/components/organisms/Lobby/Lobby";
import styles from "../../src/sass/pages/PlayPage.module.scss";
import { Header } from "../../src/components/atoms/Typography/Headers";
import { Dispatch, SetStateAction, useState } from "react";
import { LobbyTab } from "./types";

export default function PlayPage() {
  const [openedTab, setOpenedTab] = useState<LobbyTab>("play");
  return (
    <MainGridBox>
      <PlayArea>
        <TabSelection openedTab={openedTab} handleOpenTab={setOpenedTab} />
        <Lobby openedTab={openedTab} handleOpenTab={setOpenedTab} />
      </PlayArea>
    </MainGridBox>
  );
}

interface TabSelectionProps {
  openedTab: LobbyTab;
  handleOpenTab: Dispatch<SetStateAction<LobbyTab>>;
}

function TabSelection({ openedTab, handleOpenTab }: TabSelectionProps) {
  return (
    <div className={styles["tab-selection-wrapper"]}>
      <div
        className={
          styles[`tab-wrapper${openedTab === "play" ? "-active" : ""}`]
        }
        onClick={() => handleOpenTab("play")}
      >
        <Header as="h6" content="play" />
      </div>
      <div
        className={
          styles[`tab-wrapper${openedTab === "join" ? "-active" : ""}`]
        }
        onClick={() => handleOpenTab("join")}
      >
        <Header as="h6" content="join" />
      </div>
    </div>
  );
}
