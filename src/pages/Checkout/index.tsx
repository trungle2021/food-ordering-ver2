import { useDispatch, useSelector } from "react-redux"
import { HeaderPage } from "~/components/HeaderPage"
import { useHistory } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { LocationIcon } from "~/components/UI/Icon"
import CartItemProps from "~/interface/cart/CartItem"
import { getCart } from "~/features/Cart/cartAction"
import styles from './styles.module.css'
import { Dropdown, List } from "rsuite"
import { useForm } from "react-hook-form"
import { PAYMENT_METHOD } from "~/utils/static"
import UserService from "~/services/user/user-service"
import { Avatar, Button, Dialog, DialogActions, DialogTitle, FormControl, FormControlLabel, ListItem, ListItemAvatar, ListItemButton, Modal, Radio, RadioGroup, Typography } from "@mui/material"
import { Box } from "@mui/system"

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

    const handleAddressChange = (eventKey: string | null) => {
        if (addressList.length > 0) {
            const selectedAddress = addressList.find((address: any) => address._id === eventKey)
            if (selectedAddress) {
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        getAllUserAddress()
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };


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
                                        <div>{defaultAddress.address}</div>
                                        <Button onClick={handleOpen}>Change</Button>
                                        <Dialog maxWidth='xs' fullWidth onClose={handleClose} open={open}>
                                            <DialogTitle sx={{fontSize: '2rem'}}>My Address</DialogTitle>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={value}
                                                    onChange={handleChange}
                                                >
                                                    <List>
                                                        {addressList.map((address: any) => (
                                                            <ListItem key={address._id} sx={{padding: '30px'}}>
                                                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                                                                    <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start'}}>
                                                                        <FormControlLabel value={address._id} control={<Radio />} label="" />
                                                                        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '5px' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <div style={{ display: 'flex', }}>
                                                                                    <div>{address.recipient}</div>
                                                                                    <div style={{ borderRight: '.5px solid rgba(0, 0, 0, .26)', margin: '0 8px' }}></div>
                                                                                    <div style={{color: 'rgba(0, 0, 0, .54)', fontSize: '1.3rem', lineHeight: '2.7rem'}}>{address.phone}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{color: 'rgba(0, 0, 0, .54)', fontSize: '1.3rem'}}>{address.address}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{
                                                                        background: 'none',
                                                                        border: 0,
                                                                        color: '#08f',
                                                                        outline: 'none',
                                                                        fontSize: '1.3rem',
                                                                        padding: '4px',
                                                                        whiteSpace: 'nowrap'
                                                                    }}>Update</div>
                                                                </div>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </RadioGroup>
                                            </FormControl>
                                            <DialogActions>
                                                <button  style={{padding: '10px'}} onClick={handleClose}>Cancel</button>
                                                <button  style={{padding: '10px', backgroundColor: 'var(--primary)', color: 'var(--white)'}} type="submit">Confirm</button>
                                            </DialogActions>
                                        </Dialog>

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
                </form >

            </div >
        </>
    )
}
