import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useQuery = () => {
        const {search} = useLocation()
        return useMemo(() => {
            return new URLSearchParams(search);
        }, [search]) 
}
