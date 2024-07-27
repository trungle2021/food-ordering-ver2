import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { PATH } from "~/routes/routes.constant";
import {
    Avatar,
    NotificationIcon,
    OrderDiscussionIcon,
    SettingBlackIcon,
} from "~/components/common/UI/Icon";

export const UserSection = () => {
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

