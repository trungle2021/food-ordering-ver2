import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { PATH } from "~/routes/routes.constant";
import {
    Avatar,
    NotificationIcon,
    SettingBlackIcon,
} from "~/components/common/UI/Icon";
import { CartDetailsIcon } from "~/components/specific/CartDetailsIcon";
import { useAvatar } from "~/hooks/useAvatar";

export const UserSection = () => {
    const avatarSrc = useAvatar();
    return (
        <div className={styles["user-container"]}>
            <div className={styles["user-container__function"]}>
                <CartDetailsIcon />
                <NotificationIcon />
                <Link to={PATH.USER_PROFILE}>
                    <SettingBlackIcon />
                </Link>
            </div>
            <Avatar className={styles["user-container__avatar"]} src={avatarSrc} />
        </div>
    );
};

