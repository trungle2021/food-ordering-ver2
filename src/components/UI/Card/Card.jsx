import React from "react";
const Card = ({ className, children }) => {
  return <div className={`${className} rounded-2xl h-full`}>{children}</div>;
};

export default Card;
