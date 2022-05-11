import { useState } from "react";
import styles from "../../../sass/components/Profile.module.scss";
import { Card } from "../../atoms/Card/Card";
import Input from "../../atoms/Input/Input";
import { Header } from "../../atoms/Typography/Headers";
//import inputStyles from "../../../sass/components/Input.module.scss";

export function Profile() {
  const [nickname, setNickname] = useState("Player");

  const handleChangeNickname = () => {
    // use redux here
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["item-wrapper"]}>
        <Header as="h5" content="nickname" />
      </div>
      <div className={styles["item-wrapper-right"]}>
        <Input
          value={nickname}
          handleOnChange={setNickname}
          handleOnBlur={handleChangeNickname}
        />
      </div>
      <div className={styles["item-wrapper"]}>
        <Header as="h5" content="avatar" />
      </div>
      <div className={styles["item-wrapper-right"]}>
        <Card belongsTo="deck" size="fitLayout" rank="K" suit="spades" />
      </div>
    </div>
  );
}

export default Profile;
