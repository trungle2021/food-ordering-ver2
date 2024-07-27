import { unwrapResult } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addItem, updateItem } from "~/store/cart/cartAction"

export const useAddItemToCart = () => {
    const userId = useSelector((state:any) => state.user?._id)
    const cart = useSelector((state: any) => state.cart)
    const dispatch = useDispatch()

    const handleAddButton = (dishId: string) => {
        const itemExistsInCart = cart.items.find((item:any) => item.dish._id === dishId);
 
        if(itemExistsInCart) {
            const payload = {
                userId,
                dishId: itemExistsInCart.dish._id,
                updateQuantity: itemExistsInCart.quantity + 1
            }
            dispatch<any>(updateItem(payload))
            .then(unwrapResult)
            .catch((err:any) => {
                toast.error(err.message)
            });
        }else{
            const payload = {
                userId,
                dishId,
                quantity: 1,
            }
            dispatch<any>(addItem(payload))
            .then(unwrapResult)
            .then((payload:any) => {
                toast.success('Item has been added to the cart.')
            })
            .catch((err:any) => {
                toast.error(err.message)
            });
        }}
    return handleAddButton
}