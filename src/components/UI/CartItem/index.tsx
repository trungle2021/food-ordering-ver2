import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { useDispatch } from 'react-redux';
import { updateItem } from '~/features/Cart/cartAction';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const CartItem = ({item}:{ item : any}) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [amount, setAmount] = useState(item.amount);

    useEffect(() =>{
        setQuantity(item.quantity);
        setAmount(item.amount);
    }, [item.quantity])

    const dispatch = useDispatch();
    const handleQuantityChange = (event:any) => {
        setQuantity(event.target.value);
    }
    const submitQuantityChange = (event:any) => {
        let updateQuantity = Number.parseInt(event.target.value)
        if(updateQuantity < 1){
            updateQuantity = 1;
            setQuantity(1);
            toast.error(`Item quantity must be at least 1`)
            return
        }
       const payload = {
            dishId: item.dish._id,
            updateQuantity
       }
        dispatch<any>(updateItem(payload))
        .then(unwrapResult)
        .then((payload:any) => {
            const items = payload.items;
            const item = items.find((item:any) => item.dish._id === payload.dishId);
            if(item){
                setAmount(item.amount);
                setQuantity(event.target.value);
            }
        })
        .catch((err:any) => {
            toast.error(err.message)
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
                .then((payload:any) =>{
                    const items = payload.items
                    const item = items.find((item:any) => item.dish._id === dishId);
                    setAmount(item.amount);
                    setQuantity(quantity + 1);
                })
                .catch((error:any) => {
                    toast.error(error.message);
                });
                break;
            case 'decrement':
                const decrementPayload = {
                    dishId,
                    updateQuantity: quantity - 1
                }
                dispatch<any>(updateItem(decrementPayload))
                .then(unwrapResult)
                .then((payload:any) =>{
                    const items = payload.items
                    const item = items.find((item:any) => item.dish._id === dishId);
                    if(item){
                        setAmount(item.amount);
                        setQuantity(quantity-1);
                    }
                  
                }).catch((error:any) => {
                    toast.error(error.message);
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
                <span >x</span>
                <input type='text' className={`${styles['dish-quantity']}`} onChange={handleQuantityChange} onBlur={submitQuantityChange} value={quantity}/>
                <button className={`${styles['modify-quantity-btn']}`} onClick={()=>handleClickModifyQuantity(item.dish._id,'increment')}>+</button>
                <button className={`${styles['modify-quantity-btn']}`} onClick={()=>handleClickModifyQuantity(item.dish._id,'decrement')}>-</button>
            </div>
            
            <span className={`${styles['dish-price']}`}>+$ {amount}</span>
        </div>
    )
}
