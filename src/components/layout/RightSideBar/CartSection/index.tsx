import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import CartItemProps from "~/interface/cart/CartItem";
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import OrderService from "~/services/order/orderSerivce";
import { CartItem } from "~/components/specific/CartItem";
import { useGetCartQuery } from "~/services/cart/cartService"; // Import the RTK Query hook

export const CartSection = () => {
    const userId = useSelector((state: any) => state.auth?.userId);
    const history = useHistory();
    const { data, error, isLoading } = useGetCartQuery(userId, {
        skip: !userId, // Skip the query if userId is not available
    });

    const handleCheckoutAction = async () => {
        if (!cart || cart.items.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        const payload = cart.cartHasBeenUpdated ? { cartHasBeenUpdated: cart.cartHasBeenUpdated } : {};

        try {
            const response = await OrderService.checkOut(payload);
            if (response.status === "success") {
                const orderId = response.data._id;
                history.push(`/checkout/${orderId}`);
            } else {
                toast.error("Checkout failed");
            }
        } catch (error) {
            toast.error("An error occurred during checkout");
            console.error("Checkout error:", error);
        }
    };

    if (isFetching) return <div>Loading...</div>; // Optional loading state
    if (isError) return <div>Error fetching cart</div>; // Optional error state

    return (
        <div className={`${styles["cart-container"]}`}>
            <h4 className='title-section'>
                Your Cart
            </h4>
            <ul className={`${styles["cart-container__list"]}`}>
                {cart && cart.items.length > 0 ? cart.items.map((item: CartItemProps) => {
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
                        {cart?.totalPrice}
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
