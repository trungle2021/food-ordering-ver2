import React from "react";
import Card from "../UI/Card/Card";
import Heart from "../UI/Heart/Heart";

const RecentOrder = ({
  image,
  imageSize,
  name,
  price,
  isFavorite,
}) => {
  return (
    <li className="w-full">
      <Card className="shadow-md relative flex flex-col bg-white justify-center items-center gap-5 p-3">
        <img className="pt-10" srcSet={image} sizes={imageSize} />
        <div className="w-full top-6 absolute flex justify-between pr-4">
          {/* {discount ? <Discount amount={discount} /> : <div></div>} */}
          <div></div>
          <button>{<Heart isFavorite={isFavorite} />}</button>
        </div>

        <div className="flex justify-center w-full items-center px-4">
          <div className="flex flex-col gap-3 items-center">
            <span className="font-medium text-lg text-black">{name}</span>
            <span className="text-2xl font-bold text-black">
              <span className="text-primary-color">$</span>
              {price}
            </span>
            <span>4.97 km - 21 min</span>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default RecentOrder;
