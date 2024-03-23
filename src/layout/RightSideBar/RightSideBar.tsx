import styles from "./RightSideBar.module.css";
import { UserSection } from "./UserSection/UserSection";
import { BalanceSection } from "./BalanceSection/BalanceSection";
import { AddressSection } from "./AddressSection/AddressSection";
import { OrderMenuSection } from "./OrderMenuSection/OrderMenuSection";

interface RightSideBarProps {
  className: string;
}

export default function RightHeader({ className }: RightSideBarProps) {
  return (
    <aside className={`${className} ${styles["sidebar--right"]}`}>
      <UserSection />
      <BalanceSection />
      <AddressSection />
      <OrderMenuSection />
    </aside>
  );
}
