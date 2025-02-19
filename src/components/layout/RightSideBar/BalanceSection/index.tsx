import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { PaymentTopUpModal } from "~/components/specific/Modal/PaymentTopUpModal";
import { TopUp, Transfer } from "~/components/common/UI/Icon";
import { getBalance } from "~/store/balance/balanceAction";


export const BalanceSection = () => {
    const dispatch = useDispatch()
    const userId = useSelector((state: any) => state.user?.user?._id)
    const balance = useSelector((state: any) => state.balance)
    const amount = balance.amount
    const [openTopUpModal, setOpenTopUpModal] = useState(false)

    const handleOpenTopUpModal = () => {
        setOpenTopUpModal(true)
    }

    const handleCloseTopUpModal = () => {
        setOpenTopUpModal(false)
    }

    useEffect(() => {
       if(userId) dispatch<any>(getBalance(userId))
    }, [userId, dispatch])
  return (
    <>
    <PaymentTopUpModal open={openTopUpModal} onClose={handleCloseTopUpModal} />
    <h4 className="title-section">Your Balance</h4>
    <div className={`${styles["balance-container"]} `}>
      <img
        className={styles["balance-container__background-image"]}
        src="/CardBalanceBackground.png"
      />
      <div className={styles["balance-container__content"]}>
        <div className={styles["balance-container__content-info"]}>
          <p className={styles["balance-container__info-title"]}>Balance</p>
          <span className={styles["balance-container__info-amount"]}>
            ${amount}
          </span>
        </div>
        <div onClick={handleOpenTopUpModal} className={styles["balance-container__function-item"]}>
          <TopUp
            fill="#fff"
            className={`${styles["balance-container__function-button"]}`}
          />
          <span>Top Up</span>
        </div>
        <div className={styles["balance-container__function-item"]}>
          <Transfer
            fill="#fff"
            className={`${styles["balance-container__function-button"]}`}
          />
          <span>Withdraw</span>
        </div>
      </div>
    </div>
    </>
  );
};
