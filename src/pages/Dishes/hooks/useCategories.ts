import { useState } from "react";

import { useEffect } from "react";
import { CategoryProps } from "~/interface/category";
import CategoryService from "~/services/category/categoryService";

export function useCategories(limit: number) {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const response = await CategoryService.getCategoryList(limit);
        setCategories(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, [limit]);

  return { categories, isLoading, error };
} 