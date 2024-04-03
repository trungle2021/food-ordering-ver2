import {
  Avatar,
  Notification,
  OrderDiscussion,
  SettingBlack,
} from "../../../components/UI/Icon/Icon";
import styles from "./style.module.css";

export const UserSection = () => {
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
