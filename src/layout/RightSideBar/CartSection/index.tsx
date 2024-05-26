import styles from "./styles.module.css";
import { CouponButtonIcon, ArrowRight } from "~/components/UI/Icon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCart } from "~/features/Cart/cartAction";
import { CartItem } from "~/components/UI/CartItem";
import CartItemProps from "~/interface/cart/CartItem";
export const CartSection = () => {
    const userId =  useSelector((state: any) => state.auth.user._id)
    const dispatch = useDispatch();
    const [cart, setCart] = useState([])
    useEffect(()=>{
      dispatch<any>(getCart(userId)).
      then((response:any) => {
        setCart(response.payload.items)
      })
    },[dispatch])

  const items = cart.map((item: CartItemProps) => {
    console.log(cart)
    return (
      <li key={item._id}>
        <CartItem item={item} />
      </li>
    );
  });

  return (
    <div className={`${styles["orderMenu-container"]}`}>
      <h4 className={`${styles["orderMenu-container__title"]} title-section`}>
        Order Menu
      </h4>
      <ul className={`${styles["orderMenu-container__list"]}`}>
        {items}
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
        <button
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
        </button>
        <button
          className={styles["orderMenu-container-action__button-checkout"]}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
