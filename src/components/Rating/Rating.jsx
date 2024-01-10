import React from 'react'
import Star from '../UI/Star/Star'

export const Rating = ({ ratingPoint }) => {
    const starArray = []
    if (ratingPoint < 0 || ratingPoint > 5) {
        console.log("Invalid rating point");
        ratingPoint = 0
    } else {
        for (let point = 0; point < ratingPoint; point++) {
            starArray.push(<Star isRated={true} />)
        }
    }

    for (let totalStar = 0; totalStar < 5 - ratingPoint; totalStar++) {
        starArray.push(<Star isRated={false} />)
    }


    return (
        <ul>
            {starArray}
        </ul>
    )

}
