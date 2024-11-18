import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemProps from '../interface/cart';
import { updateItem } from "~/store/cart/cartAction";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

export const useModifyQuantityCartItem = (item: CartItemProps) => {
    const [disabled, setDisabled] = useState(false)
    const [quantity, setQuantity] = useState(item.quantity);
    const [amount, setAmount] = useState(item.amount);
    const dispatch = useDispatch();
    const prevQuantityRef = useRef(item.quantity)

    useEffect(() =>{
        setQuantity(item.quantity)
        setAmount(item.amount)
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

    return {
        handleQuantityChange,
        submitQuantityChange,
        handleClickModifyQuantity,
        quantity,
        amount,
        disabled
    }
}