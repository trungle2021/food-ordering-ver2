import React from "react";
import Card from "../../UI/Card/Card";

const CategoryItem = ({ iconLink, name }) => {
  return ( <li className=" w-full" style={{cursor:'pointer'}}>
      <Card className=" shadow-md flex flex-col bg-white justify-center items-center gap-5 p-3">
        <img srcSet={`http://localhost:1337/${iconLink} 2x`} width={30} height={30} />
        <span>{name}</span>
      </Card>
    </li>
   
  );
};

export default CategoryItem;
