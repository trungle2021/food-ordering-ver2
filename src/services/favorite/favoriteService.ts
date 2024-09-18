import { baseFavoriteApi } from "~/utils/api";
import axios from "~/lib/axios";

const createFavoriteDish = async ({dishId, userId}: {dishId:string, userId: string}) => {
    const response = await axios.post(`${baseFavoriteApi}`, {dishId, userId});
    return response.data;
};

const deleteFavoriteDish = async (favoriteId: string) => {
    const response = await axios.delete(`${baseFavoriteApi}/${favoriteId}`);
    return response.data;
};


export const FavoriteService = {
    createFavoriteDish,
    deleteFavoriteDish
}