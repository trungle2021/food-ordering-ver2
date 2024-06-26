import { unwrapResult } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addItem, updateItem } from "~/features/Cart/cartAction"

export const useAddToCart = () => {
    const cart = useSelector((state: any) => state.cart)
    const dispatch = useDispatch()

    const handleAddButton = (dishId: string) => {
        const itemExistsInCart = cart.items.find((item:any) => item.dish._id === dishId);
        const payload = {
            dishId,
            quantity: 1,
        }
        if(itemExistsInCart) {
            dispatch<any>(updateItem({dishId, updateQuantity: itemExistsInCart.quantity + 1}))
            .then(unwrapResult)
            .catch((err:any) => {
                toast.error(err.message)
            });
        }else{
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