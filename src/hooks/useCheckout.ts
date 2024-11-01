import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import OrderService from "~/services/order/orderSerivce";

export const useCheckout = () => {
    const cart = useSelector((state: any) => state.cart)
    const history = useHistory() 
    
    const handleCheckoutAction = async () => {
        if(cart.items.length === 0){
            toast.error("Cart is empty")
            return;
        }
    
        try {
            const response = await OrderService.checkOut(cart);
            const {sessionId, sessionData} = response.data
            if (sessionId && sessionData) {
                history.push(`/checkout/${sessionId}`, {sessionData});
            } else {
                toast.error("Checkout failed");
            }
        } catch (error) {
            toast.error("An error occurred during checkout");
            console.error("Checkout error:", error);
        }
    }

    return {
        handleCheckoutAction
    }
}