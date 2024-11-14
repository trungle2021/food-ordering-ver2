import styles from "./styles.module.css";
import { UserSection } from "./UserSection";
import { BalanceSection } from "./BalanceSection";
import { AddressSection } from "./AddressSection";
import { CartSection } from "./CartSection";
import { RootState } from "~/store/store";
import { useSelector } from "react-redux";

interface RightSideBarProps {
  className: string;
}

export default function RightHeader({ className }: RightSideBarProps) {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <aside className={`${className} ${styles["sidebar--right"]}`}>
      <UserSection />
      <BalanceSection />
      {user && user.user_address.length > 0 && <AddressSection />}
      <CartSection />
    </aside>
  );
}
