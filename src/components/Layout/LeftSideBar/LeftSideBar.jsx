import { React, useContext } from "react";
import { AppContext } from "../../../store/AppContext";
import { Logo } from "../../UI/Logo/Logo";
import { Navbar } from "../../UI/NavBar/Navbar";

export default function LeftSideBar({ sideBarItems, className }) {
  const { isExpanded, setIsExpanded } = useContext(AppContext);
  return (
    <aside className={className} >
      <h1>1</h1>
      <Logo className={`logo`} />
      <Navbar />
    </aside >
  )
}
