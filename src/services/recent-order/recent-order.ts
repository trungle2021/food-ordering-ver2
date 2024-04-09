import axios from "~/lib/axios";
import { getRecentOrdersApi } from "~/utils/api";

const fetchRecentOrderList = (limit: number, user_id: string): Promise<any> => {
  const getRecentOrdersApiAddedUserId = getRecentOrdersApi.replace(
    "USERID",
    user_id
  );
  return axios.get(`${getRecentOrdersApiAddedUserId}?limit=${limit}`);
};

export const RecentOrderService = {
  fetchRecentOrderList,
};

export default RecentOrderService;
