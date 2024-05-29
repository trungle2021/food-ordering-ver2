import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '~/features/Cart/cartAction';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import styles from './styles.module.css'
import CartItemProps from '~/interface/cart/CartItem';

export const CartItem = ({item}:{ item : CartItemProps}) => {
    const [disabled, setDisabled] = useState(false)
    const [quantity, setQuantity] = useState(item.quantity);
    const [amount, setAmount] = useState(item.amount);
    const dispatch = useDispatch();
    const prevQuantityRef = useRef(item.quantity)

    useEffect(() =>{
        // update quantity and amount each time item quantity changes
        setQuantity(item.quantity);
        setAmount(item.amount);
        prevQuantityRef.current = quantity
    }, [item.quantity])

    const handleQuantityChange = (event:any) => {
        setQuantity(event.target.value);
    }

    const submitQuantityChange = (event:any) => {
        let updateQuantity = Number.parseInt(event.target.value)
        if(updateQuantity < 1){
            updateQuantity = 1;
            setQuantity(1);
            setAmount(item.amount/item.quantity);
            toast.error(`Item quantity must be at least 1`)
            return
        }
       const payload = {
            dishId: item.dish._id,
            updateQuantity
       }
        dispatch<any>(updateItem(payload))
        .then(unwrapResult)
        .catch((err:any) => {
            toast.error(err.message)
            setQuantity(item.quantity);
        });
    }
    const handleClickModifyQuantity = (dishId: string, action:string) => {
       switch (action) {
            case 'increment':
                const incrementPayload = {
                    dishId,
                    updateQuantity: quantity + 1
                }
                dispatch<any>(updateItem(incrementPayload))
                .then(unwrapResult)
                .catch((error:any) => {
                    toast.error(error.message);
                    setDisabled(!disabled)
                    if(item.quantity - prevQuantityRef.current === 1 ){
                        setQuantity(item.quantity);
                    }
                });
                break;
            case 'decrement':
                setDisabled(!disabled);
                const decrementPayload = {
                    dishId,
                    updateQuantity: quantity - 1
                }
                dispatch<any>(updateItem(decrementPayload))
                .then(unwrapResult)
                .catch((error:any) => {
                    toast.error(error.message);
                    if(item.quantity - prevQuantityRef.current === 1 ){
                        setQuantity(item.quantity);
                    }
                });
                break;
            default:
                return action;
       }
    }

    return (
        <div className={`${styles['cart-item-container']}`}>
            <img src={item.dish.image} />
            <div className={`${styles['dish-container']}`}>
                <span className={`${styles['dish-name']}`}>{item.dish.name}</span>
                <div>
                    <span>x</span>
                    <input type='text' className={`${styles['dish-quantity']}`} onChange={handleQuantityChange} onBlur={submitQuantityChange} value={quantity}/>
                </div>
            </div>
            <div className={`${styles['action-button']}`}>
                <button className={`${styles['modify-quantity-btn']}`}  onClick={()=>handleClickModifyQuantity(item.dish._id,'decrement')}>-</button>
                <button className={`${styles['modify-quantity-btn']}`} disabled={disabled} onClick={()=>handleClickModifyQuantity(item.dish._id,'increment')}>+</button>
            </div>
            
            <span className={`${styles['dish-price']}`}>+<span className='dollar'>$</span> {amount}</span>
        </div>
    )
}
