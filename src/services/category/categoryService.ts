import axios from "~/lib/axios";
import { getCategoriesApi } from "~/utils/api";

const getCategoryList = (limit?: number): Promise<any> => {
  return axios.get(`${getCategoriesApi}?limit=${limit}`);
};

export const CategoryService = {
  getCategoryList,
};

export default CategoryService;
