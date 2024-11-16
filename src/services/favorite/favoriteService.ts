import { baseFavoriteApi } from "~/utils/api";
import axios from "~/lib/axios";

const createFavoriteDish = async ({dishId, userId}: {dishId:string, userId: string}) => {
    return await axios.post(`${baseFavoriteApi}`, {dishId, userId});
};

const deleteFavoriteDish = async ({dishId, userId}: {dishId:string, userId: string}) => {
    return await axios.delete(`${baseFavoriteApi}`, {
        data: {dishId, userId}
    });
};

const getFavoriteDishes = async (userId: string) => {
    return await axios.get(`${baseFavoriteApi}/user/${userId}`);
}

export const FavoriteService = {
    getFavoriteDishes,
    createFavoriteDish,
    deleteFavoriteDish
}