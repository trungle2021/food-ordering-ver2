import styles from "./style.module.css";
import { OrderItem } from "../../../components/UI/OrderItem/OrderItem";
import { CouponButtonIcon, ArrowRight } from "../../../components/UI/Icon/Icon";
import { Button } from "../../../components/UI/Button/Button";
export const OrderMenuSection = () => {
  const orderItems = [
    { id: "1", name: "A", url: "3.vn" },
    { id: "2", name: "B", url: "3.vn" },
    { id: "3", name: "C", url: "3.vn" },
  ];

  const orderItemList = orderItems.map((item) => {
    return (
      <li key={item.id}>
        <OrderItem item={item} />
      </li>
    );
  });

  return (
    <div className={`${styles["orderMenu-container"]}`}>
      <h4 className={`${styles["orderMenu-container__title"]} title-section`}>
        Order Menu
      </h4>
      <ul className={`${styles["orderMenu-container__list"]}`}>
        {orderItemList}
      </ul>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "#c8c8c8",
          marginTop: "50px",
        }}
      />
      <div>
        <div className={`${styles["orderMenu-container__service-container"]}`}>
          <span>Service</span>
          <span>+$1.00</span>
        </div>
        <div className={`${styles["orderMenu-container__total-container"]}`}>
          <span
            className={`${styles["orderMenu-container__total-container__title"]}`}
          >
            Total
          </span>
          <span
            className={`${styles["orderMenu-container__total-container__amount"]}`}
          >
            $202.00
          </span>
        </div>
      </div>

      <div className={`${styles["orderMenu-container__action"]}`}>
        <Button
          className={styles["orderMenu-container__action__button-coupon"]}
        >
          <CouponButtonIcon
            size={30}
            className={styles["orderMenu-container__button-coupon-icon"]}
          />
          <span className={styles["orderMenu-container__button-coupon-text"]}>
            Have a coupon code?
          </span>
          <ArrowRight size={10} />
        </Button>
        <Button
          className={styles["orderMenu-container-action__button-checkout"]}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
