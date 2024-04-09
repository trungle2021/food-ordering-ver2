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
  const auth = useSelector((state: RootState) => state.auth)
  console.log(auth)
  return (
    <div className={styles["user-container"]}>
      <div className={styles["user-container__function"]}>
        <OrderDiscussion size={25} />
        <Notification size={25} />
        <SettingBlack size={25} />
      </div>
      <Avatar className={styles["user-container__avatar"]} size={25} />
    </div>
  );
};
