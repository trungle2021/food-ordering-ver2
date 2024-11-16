import { FavoriteService } from '../services/favorite/favoriteService';
interface UseFavoriteDishProps {
  dishId: string;
  userId: string;
  onRemove?: (dishId: string) => void;
}

export function useFavoriteDish({ dishId, userId, onRemove }: UseFavoriteDishProps) {

  const toggleFavorite = async (isFavorite: boolean) => {
    if (!dishId || !userId) return;

    try {
      if (isFavorite) {
        console.log("remove favorite");
        await FavoriteService.deleteFavoriteDish({dishId, userId});
        onRemove?.(dishId);
      } else {
        console.log("add favorite");
        await FavoriteService.createFavoriteDish({ dishId, userId });
      }

    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  return { toggleFavorite };
}