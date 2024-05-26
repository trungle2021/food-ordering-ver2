import axios from "~/lib/axios";
import { baseCartApi } from "~/utils/api";

const getCart = async({userId}: {userId: string}) => {
    const response = await axios.get(`${baseCartApi}/user/${userId}`);
    return response.data;
};     

const addItem = async (payload: {userId: string, dishId: string, quantity: number}) => {
    const response = await axios.post(baseCartApi,payload)
    return response.data;
};


const updateItem = async (payload: {userId: string, item: any, action: string}) => {
    const response = await axios.put(baseCartApi, payload);
    return response.data;
};

const removeItem = async ({userId, dishId}: {userId: string, dishId: string}) => {
    const response = await axios.delete(`${baseCartApi}/user/${userId}/dish/${dishId}`);
    return response.data;
};

const CartService = {
    getCart,
    addItem,
    updateItem,
    removeItem
}

export default CartService;