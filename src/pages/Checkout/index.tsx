import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from './styles.module.css'
import { Dropdown } from "rsuite"
import { Controller, useForm } from "react-hook-form"
import { PAYMENT_METHOD } from "~/utils/static"
import { useParams } from "react-router-dom"
import OrderService from "~/services/order/orderSerivce"
import { PaymentTopUpModal } from "~/components/specific/Modal/PaymentTopUpModal"
import { UserAddressModal } from "~/components/specific/Modal/UserAddressModal"
import { CreateAddressModal } from "~/components/specific/Modal/CreateAddressModal"
import { HeaderPage } from "~/components/specific/HeaderPage"
import { LocationIcon } from "~/components/common/UI/Icon"
import { getBalance } from "~/store/balance/balanceAction"
import OrderProps from "~/interface/order/orderResponse"
import OrderDetailProps from "~/interface/order/orderDetailResponse"
import { toast } from "react-toastify"
import { AddressResponse } from "~/interface/user/addressResponse"

interface CheckoutFormValues {
    paymentMethod: PAYMENT_METHOD,
    address: string,
}

const initialFormValues: CheckoutFormValues = {
    paymentMethod: PAYMENT_METHOD.INTERNAL,
    address: '',
}



export const Checkout = () => {

    const { orderId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const [order, setOrder] = useState<OrderProps | null>(null);
    const user = useSelector((state: any) => state.user)
    const userId = user?.user?._id

    const [shippingAddress, setShippingAddress] = useState<AddressResponse | null>(null)

    const balance = useSelector((state: any) => state.balance)
    const amount = balance.amount

    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.INTERNAL.toString())

    const [openUserAddressModal, setOpenUserAddressModal] = useState(false);
    const [openTopUpModal, setOpenTopUpModal] = useState(false)
    const [openCreateAddressModal, setOpenCreateAddressModal] = useState(false)
    const { handleSubmit, register, reset, control, watch } = useForm<CheckoutFormValues>({
        defaultValues: initialFormValues,
    });

    const getOrder = async (orderId: string) => {
        try {
            const response = await OrderService.getOrder(orderId);
            const order = response.data;
            if (!order) {
                history.push('/dashboard');
                return;
            }
            setOrder(order);
            const address = user?.user?.user_address.find((address: any) => address._id === order.shipping_address)
            if (address) {
                setShippingAddress(address)
            } else {
                const defaultAddress = user?.user?.user_address.find((address: any) => address.is_default_address) || {}
                setShippingAddress(defaultAddress)
            }
        } catch (error) {
            console.error("Failed to fetch order:", error);
            history.push('/dashboard');
        }
    };

    useEffect(() => {
        if (userId && orderId) {
            dispatch<any>(getBalance(userId))
            getOrder(orderId)
        }
    }, [orderId, userId, dispatch])


    // HANDLE USER_ADDRESS_MODAL
    const handleOpenUserAddress = async () => {
        setOpenUserAddressModal(true)
    }

    const handleCloseUserAddressModal = () => {
        setOpenUserAddressModal(false)
    }

    const handleShippingAddressChange = async (payload: any) => {
        try {
            const response = await OrderService.updateOrder(orderId, payload);
            if (response.status === 'success' && response.data) {
                toast.success('Update order successfully')
                setShippingAddress(user?.user?.user_address.find((address: any) => address._id === payload.addressId))
                setOpenUserAddressModal(false)
            } else {
                toast.error('Update order failed')
            }
        } catch (error) {
            console.error("Failed to update order:", error);
        }
    }


    // HANDLE CREATE_ADDRESS_MODAL
    const handleOpenCreateAddress = () => {
        setOpenCreateAddressModal(true)
    }

    const handleCloseCreateAddressModal = () => {
        setOpenCreateAddressModal(false)
    }

    // HANDLE TOP_UP_MODAL
    const handleOpenTopUpModal = () => {
        setOpenTopUpModal(true)
    }

    const handleCloseTopUpModal = () => {
        setOpenTopUpModal(false)
    }

    // HANLE PAYMENT METHOD CHANGE
    const handlePaymentMethodChange = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
        const content = (event.target as HTMLElement).innerText;
        setPaymentMethod(content || '')
    }

    const onSubmit = (data: any) => {
        // const modifiedData = {
        //     ...data,
        //     address: defaultAddress._id
        // }
        // console.log("data: ", modifiedData)
    }

    const onError = (error: any) => {
        console.log("ERROR:::", error);
    }

    return (
        <>
            <PaymentTopUpModal maxWidth='sm' open={openTopUpModal} onClose={handleCloseTopUpModal} />
            <UserAddressModal
                maxWidth='sm'
                open={openUserAddressModal}
                onOpen={handleOpenUserAddress}
                onClose={handleCloseUserAddressModal}
                onSubmit={handleShippingAddressChange}
                currentShippingAddressId={order?.shipping_address ?? ''} />

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
                                        <div>{shippingAddress?.address}</div>
                                        {shippingAddress?.address ? <button
                                            type="button"
                                            style={{ padding: '5px 15px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}
                                            className={`${styles["address-button"]} ${styles["button-change"]}`}
                                            onClick={handleOpenUserAddress}
                                        >
                                            Change
                                        </button> : <button
                                            type="button"
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
                                {order && order.order_details && order.order_details.length > 0 && order?.order_details.map((item: OrderDetailProps) => {
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
                                                    <span className={`${styles['dish-price']}`}><span className='dollar'>$</span> {item.price} </span>
                                                </div>
                                                <span className={`${styles['dish-price']}`}>+ <span className='dollar'>$</span> {item.price * item.quantity} </span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <hr className="line-thin" />
                            <div className={styles['checkout-container__total']}>
                                <span className={styles['checkout-container__total-title']}>Total</span>
                                <span className={styles['checkout-container__total-total-amount']}><span className='dollar'>$</span>{order?.order_total}</span>
                            </div>
                        </div>
                    </div>

                    <button type="button" className={styles['checkout-container-button-payment']}>Proceed To Payment</button>
                </form >

            </div >
        </>
    )
}