import axios from "../../lib/axios";
import { getCategoriesApi } from "../../utils/api";

const fetchCategoryList = (limit) => {
  return axios.get(`${getCategoriesApi}/limit=${limit}`);
};

export const CategoryService = {
  fetchCategoryList,
};

export default CategoryService;
