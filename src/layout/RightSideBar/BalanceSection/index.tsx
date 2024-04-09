import styles from "./styles.module.css";
import { TopUp, Transfer } from "~/components/UI/Icon";
export const BalanceSection = () => {
  return (
    <div className={`${styles["balance-container"]} `}>
      <h4 className="title-section">Your Balance</h4>
      <img
        className={styles["balance-container__background-image"]}
        src="/CardBalanceBackground.png"
      />
      <div className={styles["balance-container__content"]}>
        <div className={styles["balance-container__content-info"]}>
          <p className={styles["balance-container__info-title"]}>Balance</p>
          <span className={styles["balance-container__info-amount"]}>
            $12.000
          </span>
        </div>
        <div className={styles["balance-container__function-item"]}>
          <TopUp
            className={styles["balance-container__function-button"]}
            size={50}
          />
          <span>Top Up</span>
        </div>
        <div className={styles["balance-container__function-item"]}>
          <Transfer
            className={styles["balance-container__function-button"]}
            size={50}
          />
          <span>Transfer</span>
        </div>
      </div>
    </div>
  );
};
