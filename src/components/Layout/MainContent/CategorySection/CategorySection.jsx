import React from 'react'
import { CategoryItems } from '../../../CategoryItems/CategoryItems'


export const CategorySection = () => {
    return (
        <div>
            <div>
                <h3>Category</h3>
                <span><a href="">View All</a></span>
            </div>

            <CategoryItems />
        </div>


    )
}
