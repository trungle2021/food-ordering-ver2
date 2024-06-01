import { useSelector } from "react-redux";
import {
  Avatar,
  NotificationIcon,
  OrderDiscussionIcon,
  SettingBlackIcon,
} from "~/components/UI/Icon";
import styles from "./styles.module.css";
import { RootState } from "~/app/store";

export const UserSection = () => {
  return (
    <div className={styles["user-container"]}>
      <div className={styles["user-container__function"]}>
        <OrderDiscussionIcon />
        <NotificationIcon />
        <SettingBlackIcon />
      </div>
      <Avatar className={styles["user-container__avatar"]} size={45} />
    </div>
  );
};
