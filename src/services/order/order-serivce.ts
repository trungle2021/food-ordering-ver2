import axios from "~/lib/axios";
import { getRecentOrdersApi } from "~/utils/api";

const fetchRecentOrderList = (limit: number): Promise<any> => {
  return axios.get(`${getRecentOrdersApi}?limit=${limit}`);
};

export const OrderService = {
  fetchRecentOrderList,
};

export default OrderService;
