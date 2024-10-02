import { useState } from 'react';
import { FavoriteService } from '../services/favorite/favoriteService';
import FavoriteInfo from '~/interface/favorite/favorite';
interface UseFavoriteDishProps {
  dishId: string;
  userId: string;
  initialFavoriteInfo?: FavoriteInfo;
  onRemove?: (dishId: string) => void;
}

export function useFavoriteDish({ dishId, userId, initialFavoriteInfo, onRemove }: UseFavoriteDishProps) {
  const [favoriteId, setFavoriteId] = useState(initialFavoriteInfo?._id || '');
  const [isFavorite, setIsFavorite] = useState(!!initialFavoriteInfo);


  const toggleFavorite = async () => {
    if (!dishId || !userId) return;

    try {
      if (isFavorite) {
        await FavoriteService.deleteFavoriteDish(favoriteId);
        setIsFavorite(false);
        onRemove?.(dishId);
        setFavoriteId('');
      } else {
        const response = await FavoriteService.createFavoriteDish({ dishId, userId });
        setIsFavorite(true);
        setFavoriteId(response._id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return { isFavorite, toggleFavorite };
}