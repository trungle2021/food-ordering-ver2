import React, { useContext } from "react";
import { LeftSideBarContext } from "../../../../../store/LeftSideBarContext";

export default function Item({ active, icon, text, alert }) {
  const { isExpanded } = useContext(LeftSideBarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors 
      ${
        active
          ? "bg-gradient-to-tr bg-primary-color text-white"
          : "hover:bg-indigo-50 text-gray-600"
      }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          isExpanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${
            isExpanded ? "" : "top-2"
          }`}
        ></div>
      )}
    </li>
  );
}
