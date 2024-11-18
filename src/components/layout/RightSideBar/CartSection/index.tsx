import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CartItemProps from "~/interface/cart";
import { CartItem } from "~/components/specific/CartItem";
import { useCheckout } from "~/hooks/useCheckout";
import { useCart } from "~/hooks/useCart";

export const CartSection = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart)
    const { fetchCart } = useCart();
    const userId = useSelector((state: any) => state.user?.user?._id);
    const { handleCheckoutAction } = useCheckout()

    useEffect(() => {
        if(userId) fetchCart();
    }, [userId,dispatch])

    return (
        <div className={`${styles["cart-container"]}`}>
            <h4 className='title-section'>
                Your Cart
            </h4>
            <ul className={`${styles["cart-container__list"]}`}>
                { cart && cart.items.length > 0 ? cart.items.map((item: CartItemProps) => {
                    return (
                        <li key={item._id}>
                            <CartItem item={item} imageSize='small' />
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
                {/* <button
                    className={styles["cart-container__action__button-coupon"]}
                >
                    <CouponButtonIcon
                        className={styles["cart-container__button-coupon-icon"]}
                    />
                    <span className={styles["cart-container__button-coupon-text"]}>
                        Have a coupon code?
                    </span>
                    <ArrowRightIcon />
                </button> */}
                <button
                    type="button"
                    className={styles["cart-container-action__button-checkout"]}
                    onClick={handleCheckoutAction}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};
