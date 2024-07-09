import styles from "./styles.module.css";
import { CouponButtonIcon, ArrowRightIcon } from "~/components/UI/Icon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "~/features/Cart/cartAction";
import { CartItem } from "~/components/CartItem";
import CartItemProps from "~/interface/cart/CartItem";
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
export const CartSection = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart)
    const history = useHistory() 
    useEffect(() => {
        dispatch<any>(getCart())
    }, [dispatch])

    const handleCheckoutAction = () => {
        if(cart.items.length === 0){
            toast.error("Cart is empty")
            return;
        }
        // call api checkout items in cart here
        history.push('/checkout')
    }



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
                    className={styles["cart-container-action__button-checkout"]}
                    onClick={handleCheckoutAction}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};
