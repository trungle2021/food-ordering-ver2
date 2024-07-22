import axios from "~/lib/axios";
import { getRecentOrdersByUserIdApi, getOrderHistoryByUserIdApi, baseOrderApi } from "~/utils/api";

const getRecentOrderList = (userId:string, limit: number): Promise<any> => {
    return axios.get(`${getRecentOrdersByUserIdApi}/${userId}?limit=${limit}`);
};

const getOrderHistory = (userId:string, filter: string | undefined, page: number, limit: number): Promise<any> => {
    const queryFilter = filter ? `${filter}&` : ''
    return axios.get(`${getOrderHistoryByUserIdApi}/${userId}?${queryFilter}page=${page}&limit=${limit}`);
}

const getOrder = (orderId:string) : Promise<any> => {
    return axios.get(`${baseOrderApi}/${orderId}`);
}

const checkOut = () : Promise<any> => {
    return axios.post(`${baseOrderApi}/check-out`);
}

export const OrderService = {
    getRecentOrderList,
    getOrderHistory,
    getOrder,
    checkOut
};

export default OrderService;
