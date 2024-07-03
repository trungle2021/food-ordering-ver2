import { useDispatch, useSelector } from "react-redux"
import { HeaderPage } from "~/components/HeaderPage"
import { useHistory } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { LocationIcon } from "~/components/UI/Icon"
import CartItemProps from "~/interface/cart/CartItem"
import { getCart } from "~/features/Cart/cartAction"
import styles from './styles.module.css'
import { Dropdown } from "rsuite"
import { useForm } from "react-hook-form"
import { PAYMENT_METHOD } from "~/utils/static"
import UserService from "~/services/user/user-service"

interface CheckoutFormValues {
    paymentMethod: PAYMENT_METHOD,
    address: string,
    orderDetails: []
}

const initialFormValues: CheckoutFormValues = {
    paymentMethod: PAYMENT_METHOD.INTERNAL,
    address: '',
    orderDetails: []
}

const loginSchemaValidator = {

}

export const Checkout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.cart)
    const auth = useSelector((state: any) => state.auth)
    const [defaultAddress, setDefaultAddress] = useState<any>({})
    const [addressList, setAddressList] = useState([])
    const userId = auth?.user?._id
    useEffect(() => {
        const getUserInfo = async () => {
            const response = await UserService.getUserInfo(userId)
            const userAddressList = response?.data?.user_address
            if (userAddressList.length > 0) {
                setDefaultAddress(response.data.user_address[0])
            }
            return;
        }
        // get user info
        getUserInfo()
    }, [userId])

    const [paymentMethod, setPaymentMethod] = useState('Choose payment method')
    const {
        handleSubmit,
        reset,
        control,
    } = useForm<CheckoutFormValues>({
        defaultValues: initialFormValues,
    });

    useEffect(() => {
        dispatch<any>(getCart()).then((result: any) => {
            if (result.payload.items.length === 0) {
                history.push('/dashboard');
            }
        })
    }, [dispatch])

    const handlePaymentMethodChange = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
        const content = (event.target as HTMLElement).innerText;
        setPaymentMethod(content || '')
    }

    const handleAddressChange = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
        if(addressList.length > 0){
            const selectedAddress = addressList.find((address:any) => address._id === eventKey)
            if(selectedAddress){
                setDefaultAddress(selectedAddress)
            }
        }
    }

    const getAllUserAddress = async () => {
        const response = await UserService.getUserAddressesById(userId);
        if (response?.data.length > 0) {
            setAddressList(response.data)
        }

    }

    const handleOnToggleAddressDropDown = (open?: boolean | undefined) => {
        if (open) {
            getAllUserAddress()
        }
        return
    }

    const handleOnTogglePaymentMethodDropDown = (open?: boolean | undefined) => {
        console.log("isOpen Payment: ", open)
    }



    const onSubmit = (data: any) => {
        console.log("data: ", data)
        // call api create order
        console.log('submit')
    }

    const onError = (error: any) => {
        console.log("ERROR:::", error);
    }

    return (
        <>
            <HeaderPage pageName="Order" />
            <div className={styles['checkout-container']}>
                <h1>Order Details</h1>
                <form noValidate onSubmit={handleSubmit(onSubmit, onError)} >
                    <div className={styles['checkout-container__wrapper']}>
                        <div className={styles['checkout-container__info']}>

                            <div className="payment-container">
                                <div className={styles['title']}>Payment Information</div>
                                <div className={styles['payment-content']}>
                                    <Dropdown title={paymentMethod} onSelect={handlePaymentMethodChange} onToggle={handleOnTogglePaymentMethodDropDown}>
                                        <Dropdown.Item eventKey="internal">Internal Account</Dropdown.Item>
                                        <Dropdown.Item eventKey="bank">Bank Account</Dropdown.Item>
                                    </Dropdown>

                                    <div className={styles['payment-content__info']}>
                                        {paymentMethod.toLowerCase() === 'internal account' && <div className={styles['payment-content__info__internal-account']}>
                                            <div className={styles['payment-content__info__internal']}>Current Balance: 500$</div>
                                            <button className={styles['payment-content__info__internal-button-topup']}>TopUp</button>
                                        </div>}

                                        {paymentMethod.toLowerCase() === 'bank account' &&
                                            <div className={styles['payment-content__info__bank-account']}>
                                                <span>Your bank account: <span>VPBank - Ngân hàng Việt Nam Thịnh vượng
                                                    **** 4370</span></span>
                                            </div>}

                                    </div>
                                </div>
                            </div>

                            <div className="address-container">
                                <div className={styles['title']}>Delivery Address</div>
                                <div className={styles['address-content']}>
                                    <div className={styles['address-heading']}>
                                        <LocationIcon />
                                        <Dropdown title={defaultAddress.address} onSelect={handleAddressChange} onToggle={handleOnToggleAddressDropDown}>
                                            {addressList.length > 0 && addressList.map((address: any) =>
                                                <Dropdown.Item key={address._id} eventKey={address._id}>{address.address}</Dropdown.Item>
                                            )}
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className={styles['address-description']}>
                                    <textarea placeholder="Add your notes" />
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
                </form>

            </div>
        </>
    )
}
