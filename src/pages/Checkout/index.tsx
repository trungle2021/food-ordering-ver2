import { useDispatch, useSelector } from "react-redux"
import { HeaderPage } from "~/components/HeaderPage"
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { LocationIcon } from "~/components/UI/Icon"
import CartItemProps from "~/interface/cart/CartItem"
import { getCart } from "~/features/Cart/cartAction"
import styles from './styles.module.css'
import { Dropdown } from "rsuite"
import { Controller, useForm } from "react-hook-form"
import { PAYMENT_METHOD } from "~/utils/static"
import UserService from "~/services/user/userService"
import { Button } from "@mui/material"
import { PaymentTopUpModal } from "~/components/PaymentTopUpModal"
import { getBalance } from "~/features/Balance/balanceAction"
import { AddAddressModal } from "~/components/AddAddressModal"
import { UserAddressModal } from "~/components/UserAddressModal"

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
    const dispatch = useDispatch()

    const cart = useSelector((state: any) => state.cart)
    const userId = useSelector((state: any) => state.auth?.user?._id)
    const balance = useSelector((state: any) => state.balance)

    const amount = balance.amount


    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.INTERNAL.toString())
    const [openUserAddressModal, setOpenUserAddressModal] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState<any>({})



    const [openTopUpModal, setOpenTopUpModal] = useState(false)
    const [openAddAddressModal, setOpenAddAddressModal] = useState(false)
    const { handleSubmit, register, reset, control, watch } = useForm<CheckoutFormValues>({
        defaultValues: initialFormValues,
    });

    useEffect(() => {
        dispatch<any>(getBalance(userId))
    }, [dispatch])


    useEffect(() => {
        dispatch<any>(getCart(userId)).then((result: any) => {
            if (result.payload.items.length === 0) {
                history.push('/dashboard');
            }
        })
    }, [dispatch])

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await UserService.getUserInfo(userId)
                const defaultAddress = response?.data?.user_address
                setDefaultAddress(defaultAddress)
        }
        getUserInfo()
    }, [userId])

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

    const handleOpenAddAddress = () => {
        setOpenAddAddressModal(true)
    }

    const handleCloseAddAddressModal = () => {
        setOpenAddAddressModal(false)
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
            <UserAddressModal maxWidth='sm' open={openUserAddressModal} onClose={handleCloseUserAddressModal} onSubmit={handleOnChangeUserAddress} />
            <AddAddressModal maxWidth='sm' open={openAddAddressModal} onClose={handleCloseAddAddressModal} />
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
                                        {defaultAddress.address ? <Button onClick={handleOpenUserAddress}>Change</Button> : <Button onClick={handleOpenAddAddress}>Add Address</Button>}


                                        {/* <Dialog maxWidth='xs' fullWidth onClose={handleCloseUserAddress} open={openUserAddressModal}>
                                            <DialogTitle sx={{ fontSize: '2rem' }}>My Address</DialogTitle>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={radioAddressId}
                                                    onChange={handleRadioChange}
                                                >
                                                    <List>
                                                        {addressList?.length > 0 && addressList.map((address: any) => (
                                                            <ListItem key={address._id} sx={{ padding: '30px' }}>
                                                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                                                                    <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
                                                                        <FormControlLabel value={address._id} control={<Radio />} label="" />
                                                                        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '5px' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <div style={{ display: 'flex', fontSize: '1.4rem', alignItems: 'center' }}>
                                                                                    <div style={{ borderRight: '.5px solid rgba(0, 0, 0, .26)', padding: '0 4px' }}>{address.recipient}</div>
                                                                                    <div style={{ color: 'rgba(0, 0, 0, .54)', fontSize: '1.3rem', lineHeight: '2.7rem', padding: '0 4px' }}>{address.phone}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ color: 'rgba(0, 0, 0, .54)', fontSize: '1.3rem' }}>{address.address}</div>

                                                                        </div>
                                                                    </div>
                                                                    <div style={{
                                                                        background: 'none',
                                                                        border: 0,
                                                                        color: '#08f',
                                                                        outline: 'none',
                                                                        fontSize: '1.3rem',
                                                                        padding: '4px',
                                                                        whiteSpace: 'nowrap',
                                                                        cursor: 'pointer'
                                                                    }}>Update</div>
                                                                </div>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </RadioGroup>
                                            </FormControl>
                                            <DialogActions sx={{ display: 'flex', gap: '10px', margin: '10px 24px' }}>
                                                <button style={{ padding: '10px' }} onClick={handleCloseUserAddress}>Cancel</button>
                                                <button style={{ padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)' }} type="submit" onClick={handleConfirmAddressChange}>Confirm</button>
                                            </DialogActions>
                                        </Dialog> */}
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