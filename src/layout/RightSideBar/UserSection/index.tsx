import { useSelector } from "react-redux";
import {
  Avatar,
  Notification,
  OrderDiscussion,
  SettingBlack,
} from "~/components/UI/Icon";
import styles from "./styles.module.css";
import { RootState } from "~/app/store";

export const UserSection = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const name = auth.user?.name;
  return (
    <div className={styles["user-container"]}>
      <div className={styles["user-container__function"]}>
        <OrderDiscussion size={45} />
        <Notification size={45} />
        <SettingBlack size={45} />
      </div>
      <Avatar className={styles["user-container__avatar"]} size={45} />
    </div>
  );
};
