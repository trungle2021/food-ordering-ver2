import React from "react";
import Card from "../../UI/Card/Card";
import Star from "../../UI/Star/Star";
import Heart from "../../UI/Heart/Heart";
import Discount from "../../UI/Discount/Discount";

const Dish = ({
  image,
  imageSize,
  ratingCount,
  name,
  price,
  discount,
  isFavorite,
}) => {
  return (
    <li className="w-full">
      <Card className="shadow-md relative flex flex-col bg-white justify-center items-center gap-5 p-3">
        <img className="pt-10" srcSet={image} sizes={imageSize} />
        <div className="w-full top-6 absolute flex justify-between pr-4">
          {discount ? <Discount amount={discount} /> : <div></div>}
          <span>{<Heart isFavorite={isFavorite} />}</span>
        </div>

        <div className="flex justify-between w-full items-center px-4">
          <div className="flex flex-col gap-3">
            <span className="flex">
              <Star size={25} isRated={true} />
              <Star size={25} isRated={true} />
              <Star size={25} isRated={true} />
              <Star size={25} isRated={true} />
              <Star size={25} isRated={false} />
            </span>
            <span className="font-medium text-lg text-black">{name}</span>
            <span className="text-2xl font-bold text-black">
              <span className="text-primary-color">$</span>
              {price}
            </span>
          </div>
          <button className="basis-8 text-2xl text-center leading-4 p-3 rounded-lg bg-primary-color border-2 border-primary-color text-white">
            +
          </button>
        </div>
      </Card>
    </li>
  );
};

export default Dish;
