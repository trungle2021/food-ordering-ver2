import { PATH } from "~/routes/routes.constant";
import styles from "./styles.module.css";
import { Logo } from "~/components/UI/Logo";
import { Navbar } from "~/components/UI/NavBar";
interface LeftSideBarProps {
  className?: string;
}

export default function LeftSideBar({ className }: LeftSideBarProps) {
  const navItems: NavItems[] = [
    {
      url: `${PATH.DASHBOARD}`,
      label: "Dashboard",
      src: "/icon/Dashboard.svg",
    },
    {
      url: `${PATH.FOOD_ORDER}`,
      label: "Food Order",
      src: "/icon/FoodOrder.svg",
    },
    { url: `${PATH.FAVORITE}`, label: "Favorite", src: "/icon/Favorite.svg" },
    {
      url: `${PATH.ORDER_HISTORY}`,
      label: "Order History",
      src: "/icon/OrderHistory.svg",
    },
    { url: `${PATH.BILLS}`, label: "Bills", src: "/icon/Bills.svg" },
    { url: `${PATH.SETTINGS}`, label: "Setting", src: "/icon/Setting.svg" },
    { url: `${PATH.LOGOUT}`, label: "Logout", src: "/icon/Logout.svg" },
  ];

  return (
    <aside className={`${className} ${styles["sidebar--left"]}`}>
      <Logo className={`${styles["sidebar__logo"]}`} width={100} />
      <Navbar items={navItems} />
    </aside>
  );
}
