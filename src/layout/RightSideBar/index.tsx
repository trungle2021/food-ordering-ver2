import styles from "./style.module.css";
import { UserSection } from "./UserSection";
import { BalanceSection } from "./BalanceSection";
import { AddressSection } from "./AddressSection";
import { OrderMenuSection } from "./OrderMenuSection";

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
