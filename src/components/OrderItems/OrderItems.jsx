import React, { useState } from "react";
import OrderItem from "./OrderItem/OrderItem";

const OrderItems = () => {
  return (
    <ul className="flex flex-col gap-5 border-b pb-10 mb-10">
      <OrderItem
        img={`/food/Pizza.png 2x`}
        name={`Pepperoni Pizza`}
        quantity={1}
        price={5.59}
      />
      <OrderItem
        img={`/food/Hambuger.png 2x`}
        name={`Cheese Burger`}
        quantity={1}
        price={5.59}
      />
      <OrderItem
        img={`/food/Pizza2.png 2x`}
        name={`Vegan Pizza`}
        quantity={1}
        price={5.59}
      />
    </ul>
  );
};

export default OrderItems;
