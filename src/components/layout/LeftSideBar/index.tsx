import { PATH } from "~/routes/routes.constant";
import styles from "./styles.module.css";
import { BillIcon, DashBoardIcon, FavoriteIcon, OrderHistoryIcon, SettingIcon } from "~/components/common/UI/Icon";
import { Logo } from "~/components/common/UI/Logo";
import { Navbar } from "~/components/common/NavBar";

interface LeftSideBarProps {
  className?: string;
}


export default function LeftSideBar({ className }: LeftSideBarProps) {
  const navItems: any = [
    {
      url: `${PATH.DASHBOARD}`,
      label: "Dashboard",
      icon: <DashBoardIcon/>,
    },
    { url: `${PATH.DISHES}`, label: "Dishes", icon: <BillIcon/> },
    { url: `${PATH.FAVORITE}`, label: "Favorite", icon: <FavoriteIcon/> },
    {
      url: `${PATH.ORDER_HISTORY}`,
      label: "Order History",
      icon: <OrderHistoryIcon/>,
    },
    { url: `${PATH.USER_PROFILE}`, label: "User Profile", icon: <SettingIcon/> },
  ];

  return (
    <aside className={`${className} ${styles["sidebar--left"]}`}>
      <Logo className={`${styles["sidebar__logo"]}`} width={100} />
      <Navbar items={navItems} />
    </aside>
  );
}
