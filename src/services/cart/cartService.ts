import axios from "~/lib/axios";
import { baseCartApi, getCartByUserIdApi } from "~/utils/api";

const getCart = async(userId:string) => {
    const response = await axios.get(`${getCartByUserIdApi}/${userId}`);
    return response.data;
};     

const addItem = async (payload: {userId:string, dishId: string, quantity: number}) => {
    const response = await axios.post(baseCartApi,payload)
    return response.data;
};


const updateItem = async (payload: {userId:string, dishId: string, updateQuantity: number}) => {
    const response = await axios.put(baseCartApi, payload);
    return response.data;
};

const removeItem = async (dishId: string) => {
    const response = await axios.delete(`${baseCartApi}/${dishId}`);
    return response.data;
};

const CartService = {
    getCart,
    addItem,
    updateItem,
    removeItem
}

export default CartService;