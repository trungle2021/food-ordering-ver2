import { PATH } from "~/routes/routes.constant";
import styles from "./styles.module.css";
import { Logo } from "~/components/UI/Logo";
import { Navbar } from "~/components/UI/NavBar";
import { BillIcon, DashBoardIcon, FavoriteIcon, FoodOrderIcon, OrderHistoryIcon, SettingIcon } from "~/components/UI/Icon";
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
    {
      url: `${PATH.FOOD_ORDER}`,
      label: "Food Order",
      icon: <FoodOrderIcon/>,
    },
    { url: `${PATH.FAVORITE}`, label: "Favorite", icon: <FavoriteIcon/> },
    {
      url: `${PATH.ORDER_HISTORY}`,
      label: "Order History",
      icon: <OrderHistoryIcon/>,
    },
    { url: `${PATH.BILL}`, label: "Bills", icon: <BillIcon/> },
    { url: `${PATH.SETTING}`, label: "Setting", icon: <SettingIcon/> },
  ];

  return (
    <aside className={`${className} ${styles["sidebar--left"]}`}>
      <Logo className={`${styles["sidebar__logo"]}`} width={100} />
      <Navbar items={navItems} />
    </aside>
  );
}
