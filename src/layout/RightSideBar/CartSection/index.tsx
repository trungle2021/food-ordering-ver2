import styles from "./styles.module.css";
import { CouponButtonIcon, ArrowRight } from "~/components/UI/Icon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCart } from "~/features/Cart/cartAction";
import { CartItem } from "~/components/UI/CartItem";
import CartItemProps from "~/interface/cart/CartItem";
export const CartSection = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart)
    useEffect(() => {
        dispatch<any>(getCart())
    }, [dispatch])



    return (
        <div className={`${styles["cart-container"]}`}>
            <h4 className={`${styles["cart-container__title"]} title-section`}>
                Your Cart
            </h4>
            <ul className={`${styles["cart-container__list"]}`}>
                { cart && cart.items.length > 0 ? cart.items.map((item: CartItemProps) => {
                    return (
                        <li key={item._id}>
                            <CartItem item={item} />
                        </li>
                    );
                }): "Cart is empty"}
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
                <div className={`${styles["cart-container__service-container"]}`}>
                    <span>Service</span>
                    <span>+$1.00</span>
                </div>
                <div className={`${styles["cart-container__total-container"]}`}>
                    <span
                        className={`${styles["cart-container__total-container__title"]}`}
                    >
                        Total
                    </span>
                    <span
                        className={`${styles["cart-container__total-container__amount"]}`}
                    >
                        {cart.totalPrice}
                    </span>
                </div>
            </div>

            <div className={`${styles["cart-container__action"]}`}>
                <button
                    className={styles["cart-container__action__button-coupon"]}
                >
                    <CouponButtonIcon
                        size={30}
                        className={styles["cart-container__button-coupon-icon"]}
                    />
                    <span className={styles["cart-container__button-coupon-text"]}>
                        Have a coupon code?
                    </span>
                    <ArrowRight size={10} />
                </button>
                <button
                    className={styles["cart-container-action__button-checkout"]}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};
