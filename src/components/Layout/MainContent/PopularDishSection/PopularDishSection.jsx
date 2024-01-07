import React from 'react'
import { PopularDishes } from '../../../PopularDishes/PopularDishes'
export const PopularDishSection = () => {
    return (
        <div>
            <div>
                <h3>Popular Dishes</h3>
                <span><a href="">View All</a></span>
            </div>
            <PopularDishes />
        </div>
    )
}
