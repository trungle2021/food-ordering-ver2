import {
  Avatar,
  NotificationIcon,
  OrderDiscussionIcon,
  SettingBlackIcon,
} from "~/components/UI/Icon";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import { PATH } from "~/routes/routes.constant";

export const UserSection = () => {
  const history = useHistory()
  return (
    <div className={styles["user-container"]}>
      <div className={styles["user-container__function"]}>
        <OrderDiscussionIcon />
        <NotificationIcon />
       <Link to={PATH.USER_PROFILE}>
        <SettingBlackIcon />
       </Link>
      </div>
      <Avatar className={styles["user-container__avatar"]} />
    </div>
  );
};

