import axios from "~/lib/axios";
import { getOrderHistoryApi, getRecentOrdersApi } from "~/utils/api";

const fetchRecentOrderList = (limit: number): Promise<any> => {
  return axios.get(`${getRecentOrdersApi}?limit=${limit}`);
};

const fetchOrderHistory = (filter:string | undefined, page:number, limit: number): Promise<any> => {
    const queryFilter = filter ? `${filter}&` : ''
        return axios.get(`${getOrderHistoryApi}?${queryFilter}page=${page}&limit=${limit}`);
}

export const OrderService = {
  fetchRecentOrderList,
  fetchOrderHistory
};

export default OrderService;
