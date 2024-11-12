import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { PATH } from "~/routes/routes.constant";
import {
    Avatar,
    NotificationIcon,
    SettingBlackIcon,
} from "~/components/common/UI/Icon";
import { CartDetailsIcon } from "~/components/specific/CartDetailsIcon";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";

export const UserSection = () => {
    const user = useSelector((state: RootState) => state.user.user);
    
    return (
        <div className={styles["user-container"]}>
            <div className={styles["user-container__function"]}>
                <CartDetailsIcon />
                <NotificationIcon />
                <Link to={PATH.USER_PROFILE}>
                    <SettingBlackIcon />
                </Link>
            </div>
            <Avatar className={styles["user-container__avatar"]} src={user?.avatar} />
        </div>
    );
};

