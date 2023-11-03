import React from "react";
import Card from "../../UI/Card/Card";

const CategoryItem = ({ icon, name }) => {
  return (
    <li className=" w-full">
      <Card className=" shadow-md flex flex-col bg-white justify-center items-center gap-5 p-3">
        {icon}
        <span>{name}</span>
      </Card>
    </li>
  );
};

export default CategoryItem;
