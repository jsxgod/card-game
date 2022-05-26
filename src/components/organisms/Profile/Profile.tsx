import { useSelector } from "react-redux";
import { useRandomCardGenerator } from "../../../hooks/useRandomCardGenerator";
import {
  updateProfileAvatar,
  updateProfileNickname,
} from "../../../redux/actions/profileActions";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import styles from "../../../sass/components/Profile.module.scss";
import { Card } from "../../atoms/Card/Card";
import Input from "../../atoms/Input/Input";
import { Header } from "../../atoms/Typography/Headers";
import { motion } from "framer-motion";

export function Profile() {
  const dispatch = useAppDispatch();
  const nickname = useSelector((state: RootState) => state.profile.nickname);
  const avatar = useSelector((state: RootState) => state.profile.avatar);
  const randomCardGenerator = useRandomCardGenerator(1000, "manual");

  const handleChangeNickname = (value: string) => {
    dispatch(updateProfileNickname(value));
    window.localStorage.setItem("whist-card-game-nickname", value);
  };

  const handleChangeAvatar = () => {
    if (randomCardGenerator.isWaiting) {
      const card = randomCardGenerator.card;
      randomCardGenerator.setIsWaiting(false);
      dispatch(updateProfileAvatar(card));
      window.localStorage.setItem(
        "whist-card-game-avatar",
        JSON.stringify(card)
      );
    } else {
      randomCardGenerator.setIsWaiting(true);
    }
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{
        transform: "translateX(-130%)",
      }}
      animate={{
        transform: "translateX(0%)",
        transition: { duration: 0.6, ease: [0, 0.55, 0.45, 1] },
      }}
      exit={{
        transform: "translateX(-130%)",
        transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
      }}
    >
      <div className={styles["item-wrapper"]}>
        <Header as="h5" content="nickname" />
      </div>
      <div className={styles["item-wrapper-right"]}>
        <Input
          textSize="h5"
          value={nickname}
          handleOnChange={handleChangeNickname}
        />
      </div>
      <div className={styles["item-wrapper"]}>
        <Header as="h5" content="avatar" />
      </div>
      <div
        className={styles["item-wrapper-right"]}
        onClick={() => handleChangeAvatar()}
      >
        <Card
          belongsTo="deck"
          size="fitLayout"
          rank={
            randomCardGenerator.isWaiting
              ? randomCardGenerator.card.rank
              : avatar.rank
          }
          suit={
            randomCardGenerator.isWaiting
              ? randomCardGenerator.card.suit
              : avatar.suit
          }
        />
      </div>
    </motion.div>
  );
}

export default Profile;
