import { useState, useEffect } from 'react';
import { DishService } from '~/services/dish/dishService';
import { BaseDishProps } from '~/interface/dish';


export function useDishData(limit: number, searchParams: URLSearchParams) {
  const [dishes, setDishes] = useState<BaseDishProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const queryString = searchParams.toString();
        const response = await DishService.getDishes(queryString);
        setDishes(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dishes');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchParams, limit]);

  return { dishes, isLoading, error };
} 