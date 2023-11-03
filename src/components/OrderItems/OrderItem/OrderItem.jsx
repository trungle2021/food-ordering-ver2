import React from "react";

const OrderItem = ({ img, name, quantity, price }) => {
  return (
    <li className="flex justify-between items-center">
      <img srcSet={img} />
      <div className="flex flex-col w-30 basis-44 pb-2">
        <span className="font-medium text-lg text-black">{name}</span>
        <span>x{quantity}</span>
      </div>
      <span className="font-medium text-lg text-black pb-5">
        +<span className="text-primary-color">$</span>
        {price}
      </span>
    </li>
  );
};

export default OrderItem;
