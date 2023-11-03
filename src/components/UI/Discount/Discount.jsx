import React from "react";

const Discount = ({ amount }) => {
  return (
    <div
      className=" rounded-r-xl px-4 py-2"
      style={{ backgroundColor: "#EB5757", color: "white" }}
    >
      <span className="text-lg font-normal">{amount}% Off</span>
    </div>
  );
};

export default Discount;
