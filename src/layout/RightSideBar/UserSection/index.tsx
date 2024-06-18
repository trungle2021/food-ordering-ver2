import {
  Avatar,
  NotificationIcon,
  OrderDiscussionIcon,
  SettingBlackIcon,
} from "~/components/UI/Icon";
import styles from "./styles.module.css";

export const UserSection = () => {
  return (
    <div className={styles["user-container"]}>
      <div className={styles["user-container__function"]}>
        <OrderDiscussionIcon />
        <NotificationIcon />
        <SettingBlackIcon />
      </div>
      <Avatar className={styles["user-container__avatar"]} />
    </div>
  );
};
