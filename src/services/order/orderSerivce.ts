import axios from "~/lib/axios";
import { getRecentOrdersByUserIdApi, getOrderHistoryByUserIdApi, baseOrderApi } from "~/utils/api";

const fetchRecentOrderList = (userId:string, limit: number): Promise<any> => {
    return axios.get(`${getRecentOrdersByUserIdApi}/${userId}?limit=${limit}`);
};

const fetchOrderHistory = (userId:string, filter: string | undefined, page: number, limit: number): Promise<any> => {
    const queryFilter = filter ? `${filter}&` : ''
    return axios.get(`${getOrderHistoryByUserIdApi}/${userId}?${queryFilter}page=${page}&limit=${limit}`);
}

const fetchOrder = (orderId:string) : Promise<any> => {
    return axios.get(`${baseOrderApi}/${orderId}`);
}

export const OrderService = {
    fetchRecentOrderList,
    fetchOrderHistory,
    fetchOrder
};

export default OrderService;
