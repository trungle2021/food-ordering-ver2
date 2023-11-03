import React from 'react'
import RecentOrder from './RecentOrder'

const RecentOrders = () => {
  return (
    <ul className="flex justify-evenly basis-32 gap-3">
        <RecentOrder   
        image={"/food/Food1.png 2x"}
        imageSize={30}
        name={"Fish Burger"}
        price={5.59}
        isFavorite={true} />
         <RecentOrder   
        image={"/food/Ramen.png 2x"}
        imageSize={30}
        name={"Ramen"}
        price={5.59}
        isFavorite={true} />
         <RecentOrder   
        image={"/food/PadThai.png 2x"}
        imageSize={30}
        name={"PadThai"}
        price={5.59}
        isFavorite={true} />
   
    </ul>
  )
}

export default RecentOrders