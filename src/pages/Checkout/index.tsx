import { useDispatch, useSelector } from "react-redux"
import { HeaderPage } from "~/components/HeaderPage"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import { LocationIcon } from "~/components/UI/Icon"
import CartItemProps from "~/interface/cart/CartItem"
import { getCart } from "~/features/Cart/cartAction"
import styles from './styles.module.css'



export const Checkout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.cart)
    const user = useSelector((state: any) => state.auth)

    useEffect(() => {
        dispatch<any>(getCart()).then((result: any) => {
            if (result.payload.items.length === 0) {
                history.push('/dashboard');
            }
        })
    }, [dispatch])

    return (
        <>
            <HeaderPage pageName="Order" />
            <div className={styles['checkout-container']}>
                <h1>Order Details</h1>
                <div className={styles['checkout-container__wrapper']}>
                    <div className={styles['checkout-container__address']}>
                        <div className={styles['address-title']}>Delivery Address</div>
                        <div className={styles['address-content']}>
                            <div className={styles['address-heading']}>
                                <LocationIcon />
                                Elm Street, 23
                            </div>
                        </div>
                        <div className={styles['address-description']}>
                            <textarea placeholder="Add your notes" />
                        </div>
                    </div>
                    <div className={styles['checkout-container__order-details']}>
                        <ul className={`${styles["cart-container__list"]}`}>
                            {cart ? cart.items.map((item: CartItemProps) => {
                                return (
                                    <li key={item._id}>
                                        <div className={`${styles['cart-item-container']}`}>
                                            <img className={`${styles['image']}`} src={item.dish.image} />
                                            <div className={`${styles['dish-container']}`}>
                                                <span className={`${styles['dish-name']}`}>{item.dish.name}</span>
                                                <div>
                                                    <span className={styles['xQuantity']}>x</span>
                                                    <input type='text' className={`${styles['dish-quantity']}`} defaultValue={item.quantity} />
                                                </div>
                                            </div>
                                            <span className={`${styles['dish-price']}`}>+ <span className='dollar'>$</span> {item.amount} </span>
                                        </div>
                                    </li>
                                );
                            }) : "Cart is empty"}
                        </ul>

                        <hr className="line-thin" />
                        <div className={styles['checkout-container__total']}>
                            <span className={styles['checkout-container__total-title']}>Total</span>
                            <span className={styles['checkout-container__total-total-amount']}><span className='dollar'>$</span>{cart.totalPrice}</span>
                        </div>
                    </div>
                </div>

                <button className={styles['checkout-container-button-payment']}>Proceed To Payment</button>
            </div>
        </>
    )
}
