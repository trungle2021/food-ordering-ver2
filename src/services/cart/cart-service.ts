import axios from "~/lib/axios";
import { baseCartApi } from "~/utils/api";

const getCart = async() => {
    const response = await axios.get(baseCartApi);
    return response.data;
};     

const addItem = async (payload: {dishId: string, updateQuantity: number}) => {
    const response = await axios.post(baseCartApi,payload)
    return response.data;
};


const updateItem = async (payload: {dishId: string, updateQuantity: number}) => {
    const response = await axios.put(baseCartApi, payload);
    return response.data;
};

const removeItem = async ({dishId}: {dishId: string}) => {
    const response = await axios.delete(`${baseCartApi}/dish/${dishId}`);
    return response.data;
};

const CartService = {
    getCart,
    addItem,
    updateItem,
    removeItem
}

export default CartService;