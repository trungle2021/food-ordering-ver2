import styles from "./styles.module.css";

interface DiscountProps {
  className?: string;
  amount: number | undefined;
}

const Discount = ({ className, amount }: DiscountProps) => {
  return <span className={`${styles["discount"]}`}>{amount}% Off</span>;
};

export default Discount;
