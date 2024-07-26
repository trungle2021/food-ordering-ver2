import { useDispatch, useSelector } from "react-redux"
import { HeaderPage } from "~/components/HeaderPage"
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { LocationIcon } from "~/components/UI/Icon"
import CartItemProps from "~/interface/cart/CartItem"
import styles from './styles.module.css'
import { Dropdown } from "rsuite"
import { Controller, useForm } from "react-hook-form"
import { PAYMENT_METHOD } from "~/utils/static"
import { PaymentTopUpModal } from "~/components/Modal/PaymentTopUpModal"
import { getBalance } from "~/features/Balance/balanceAction"
import { UserAddressModal } from "~/components/Modal/UserAddressModal"
import { getUserByUserId } from "~/features/User/userAction"
import { CreateAddressModal } from "~/components/Modal/CreateAddressModal"
import { useParams } from "react-router-dom"
import OrderService from "~/services/order/orderSerivce"

interface CheckoutFormValues {
    paymentMethod: PAYMENT_METHOD,
    address: string,
}

const initialFormValues: CheckoutFormValues = {
    paymentMethod: PAYMENT_METHOD.INTERNAL,
    address: '',
}



export const Checkout = () => {

    const history = useHistory()
    const {orderId} = useParams()
    const dispatch = useDispatch()
    
    const [order, setOrder] = useState({});
    const cart = useSelector((state: any) => state.cart)
    const user = useSelector((state: any) => state.user)
    const userId = user?.user?._id
    
    const defaultAddress = user?.user?.user_address.find((address: any) => address.is_default_address) || {}

    const [shippingAddress, setShippingAddress] = useState<any>(defaultAddress)
    const balance = useSelector((state: any) => state.balance)
    const amount = balance.amount


    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.INTERNAL.toString())

    const [openUserAddressModal, setOpenUserAddressModal] = useState(false);
    const [openTopUpModal, setOpenTopUpModal] = useState(false)
    const [openCreateAddressModal, setOpenCreateAddressModal] = useState(false)
    const { handleSubmit, register, reset, control, watch } = useForm<CheckoutFormValues>({
        defaultValues: initialFormValues,
    });
    useEffect(() => {
        const getOrder = async(orderId: string) => {
            const order = await OrderService.getOrder(orderId)
            setOrder(order)
        }
        if (userId && orderId) {
            dispatch<any>(getBalance(userId))
            getOrder(orderId)
            // dispatch<any>(getUserByUserId(userId))
        }
    }, [orderId, userId, dispatch])

    const handlePaymentMethodChange = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
        const content = (event.target as HTMLElement).innerText;
        setPaymentMethod(content || '')
    }

    const handleOpenUserAddress = async () => {
        setOpenUserAddressModal(true)
    }

    const handleOnChangeUserAddress = (userAddress: any) => {
        console.log(userAddress)
    }

    const handleOpenCreateAddress = () => {
        setOpenCreateAddressModal(true)
    }

    const handleCloseCreateAddressModal = () => {
        setOpenCreateAddressModal(false)
    }

    const handleOpenTopUpModal = () => {
        setOpenTopUpModal(true)
    }

    const handleCloseTopUpModal = () => {
        setOpenTopUpModal(false)
    }

    const handleCloseUserAddressModal = () => {
        setOpenUserAddressModal(false)
    }

    const onSubmit = (data: any) => {
        const modifiedData = {
            ...data,
            address: defaultAddress._id
        }
        if (cart.items.length > 0) {

        }
        console.log("data: ", modifiedData)
    }

    const onError = (error: any) => {
        console.log("ERROR:::", error);
    }

    return (
        <>
            <PaymentTopUpModal maxWidth='sm' open={openTopUpModal} onClose={handleCloseTopUpModal} />
            <UserAddressModal maxWidth='sm' open={openUserAddressModal} onOpen={() => setOpenUserAddressModal(true)} onClose={handleCloseUserAddressModal} />
            <CreateAddressModal maxWidth='sm' open={openCreateAddressModal} onClose={handleCloseCreateAddressModal} />
            <HeaderPage pageName="Order" />
            <div className={styles['checkout-container']}>
                <h1>Order Details</h1>
                <form noValidate onSubmit={handleSubmit(onSubmit, onError)} >
                    <div className={styles['checkout-container__wrapper']}>
                        <div className={styles['checkout-container__info']}>
                            <div className="address-container">
                                <div className={styles['title']}>Delivery Address: </div>
                                <div className={styles['address-content']}>
                                    <div className={styles['address-heading']}>
                                        <LocationIcon />
                                        <div>{defaultAddress.address}</div>
                                        {defaultAddress.address ? <button
                                            className={`${styles["address-button"]} ${styles["button-change"]}`}
                                            onClick={handleOpenUserAddress}
                                        >
                                            Change
                                        </button> : <button
                                            className={`${styles["address-button"]} ${styles["button-change"]}`}
                                            onClick={handleOpenCreateAddress}
                                        >
                                            Add Address
                                        </button>}
                                    </div>
                                </div>
                                <div className={styles['address-description']}>
                                    <textarea placeholder="Add your notes" />
                                </div>
                            </div>
                            <div className="payment-container">
                                <div className={styles['title']}>Payment Information: </div>
                                <div className={styles['payment-content']}>
                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        render={({ field }) => (
                                            <Dropdown
                                                title={paymentMethod}
                                                onSelect={(eventKey, event) => {
                                                    handlePaymentMethodChange(eventKey, event);
                                                    field.onChange((event.target as HTMLElement).innerText); // Update the field value in react-hook-form
                                                }}
                                                {...field} // Pass the field props to the Dropdown component
                                            >
                                                <Dropdown.Item eventKey={PAYMENT_METHOD.INTERNAL}>Internal Account</Dropdown.Item>
                                                <Dropdown.Item eventKey={PAYMENT_METHOD.BANK}>Bank Account</Dropdown.Item>
                                            </Dropdown>
                                        )}
                                    />

                                    <div className={styles['payment-content__info']}>
                                        {paymentMethod.toLowerCase() === 'internal account' && <div className={styles['payment-content__info__internal-account']}>
                                            <div className={styles['payment-content__info__internal']}>Current Balance: ${amount}</div>
                                            <button type="button" onClick={handleOpenTopUpModal} className={styles['payment-content__info__internal-button-topup']}>TopUp</button>
                                        </div>}

                                        {
                                            paymentMethod.toLowerCase() === 'bank account' &&
                                            <div className={styles['payment-content__info__bank-account']}>
                                                <span>Your bank account: <span>VPBank - Ngân hàng Việt Nam Thịnh vượng **** 4370</span></span>
                                            </div>
                                        }

                                    </div>
                                </div>
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

                    <button type="submit" className={styles['checkout-container-button-payment']}>Proceed To Payment</button>
                </form >

            </div >
        </>
    )
}