import axios from "~/lib/axios";
import { getOrderHistoryApi, getRecentOrdersApi } from "~/utils/api";

const fetchRecentOrderList = (limit: number): Promise<any> => {
  return axios.get(`${getRecentOrdersApi}?limit=${limit}`);
};

const fetchOrderHistory = (limit: number): Promise<any> => {
    return axios.get(`${getOrderHistoryApi}?limit=${limit}`);
}

export const OrderService = {
  fetchRecentOrderList,
  fetchOrderHistory
};

export default OrderService;
