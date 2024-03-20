import { Logo } from "../../UI/Logo/Logo";
import { Navbar } from "../../UI/NavBar/Navbar";
import styles from "./LeftSideBar.module.css";

interface LeftSideBarProps {
  className?: string;
}

export default function LeftSideBar({ className }: LeftSideBarProps) {
  const navItems: Array<object> = [
    { url: "/", label: "Dashboard", src: "/icon/Dashboard.svg" },
    { url: "/food-order", label: "Food Order", src: "/icon/FoodOrder.svg" },
    { url: "/favorites", label: "Favorite", src: "/icon/Favorite.svg" },
    {
      url: "/order-history",
      label: "Order History",
      src: "/icon/OrderHistory.svg",
    },
    { url: "/bills", label: "Bills", src: "/icon/Bills.svg" },
    { url: "/settings", label: "Setting", src: "/icon/Setting.svg" },
    { url: "/logout", label: "Logout", src: "/icon/Logout.svg" },
  ];

  return (
    <aside className={`${className} ${styles["sidebar--left"]}`}>
      <Logo className={`${styles["sidebar__logo"]}`} width={100} />
      <Navbar items={navItems} />
    </aside>
  );
}
