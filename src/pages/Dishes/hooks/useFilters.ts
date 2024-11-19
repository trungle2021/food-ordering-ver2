import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { DishQueryParams } from '~/interface/dish';

export function useFilters() {
  const history = useHistory();
  const [filters, setFilters] = useState<DishQueryParams>({
    categories: [],
    sort: [],
    priceRange: undefined,
    page: 1,
    limit: 10,
  });

  const resetFilters = () => {
    setFilters({
      categories: [],
      sort: [],
      priceRange: undefined,
      page: 1,
      limit: 10,
    });
    updateUrl(new URLSearchParams());
  };

  const updateFilters = useCallback((newFilters: Partial<DishQueryParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

 

  const syncToUrl = useCallback(
    (filters: DishQueryParams) => {
      const params = new URLSearchParams();

      if (Array.isArray(filters.categories) && filters.categories.length > 0) {
        filters.categories.forEach((category: string) => params.append('category_name', category));
      }

      if (filters.sort?.length) {
        filters.sort.forEach((sort: string) =>
          params.append('sort', sort)
        );
      }

      if (filters?.priceRange?.min && filters?.priceRange?.max) {
        params.append('price[gte]', filters?.priceRange?.min?.toString() || '0');
        params.append('price[lte]', filters?.priceRange?.max?.toString() || '100'  );
      }
      console.log("current URL: ", history.location.pathname + '?' + params.toString())

      updateUrl(params);
    },
    [history]
  );

  const updateUrl = (newParams: URLSearchParams) => {
    history.push({ search: newParams.toString() });
  };

  return { filters, updateFilters, syncToUrl, resetFilters };
}
