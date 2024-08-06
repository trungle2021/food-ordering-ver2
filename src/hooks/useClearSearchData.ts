import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { clearSearchData } from "~/store/dish/searchDishes/searchDishesSlice";

const useClearSearchData = () => {
    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {
        return () => {
            dispatch(clearSearchData())
        }
    },[dispatch, location])
}

export default useClearSearchData;