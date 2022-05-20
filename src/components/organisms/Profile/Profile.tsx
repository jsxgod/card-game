import { useSelector } from "react-redux";
import { useGenerateRandomCard } from "../../../hooks/useGenerateRandomCard";
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

export function Profile() {
  const dispatch = useAppDispatch();
  const nickname = useSelector((state: RootState) => state.profile.nickname);
  const avatar = useSelector((state: RootState) => state.profile.avatar);
  const randomCardGenerator = useGenerateRandomCard(1000, "manual");

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
    <div className={styles.wrapper}>
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
    </div>
  );
}

export default Profile;
