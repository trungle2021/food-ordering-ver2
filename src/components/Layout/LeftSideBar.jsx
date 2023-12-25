import { React, useContext } from "react";
import { AppContext } from "../../store/AppContext";

export default function LeftSideBar({ sideBarItems, className }) {
  const { isExpanded, setIsExpanded } = useContext(AppContext);
  return (
    <>
      <h1>1</h1>
    </>
  );
}
