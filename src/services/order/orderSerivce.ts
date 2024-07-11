import axios from "~/lib/axios";
import { getRecentOrdersByUserIdApi, getOrderHistoryByUserIdApi } from "~/utils/api";

const fetchRecentOrderList = (userId:string, limit: number): Promise<any> => {
    return axios.get(`${getRecentOrdersByUserIdApi}/${userId}?limit=${limit}`);
};

const fetchOrderHistory = (userId:string, filter: string | undefined, page: number, limit: number): Promise<any> => {
    const queryFilter = filter ? `${filter}&` : ''
    return axios.get(`${getOrderHistoryByUserIdApi}/${userId}?${queryFilter}page=${page}&limit=${limit}`);
}

export const OrderService = {
    fetchRecentOrderList,
    fetchOrderHistory
};

export default OrderService;
