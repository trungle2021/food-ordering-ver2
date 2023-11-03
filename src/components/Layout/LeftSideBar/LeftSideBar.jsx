import { React, useContext } from "react";
import { AppContext } from "../../../store/AppContext";

export default function LeftSideBar({ sideBarItems }) {
  const { isExpanded, setIsExpanded } = useContext(AppContext);
  return (
    <aside className={`${isExpanded ? "w-[345px]" : ""}`}>
      <nav
        className={`${
          isExpanded ? "px-10" : ""
        } h-full flex flex-col bg-white shadow-sm`}
      >
        <div className="pb-8 pl-4 pr-4 pt-12 flex justify-between items-center">
          <img
            srcSet="/left-side-bar/logo.png 2x"
            width={`168px`}
            height={`50px`}
            className={`overflow-hidden transition-all ${
              isExpanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setIsExpanded((prevState) => !prevState)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {isExpanded ? "<" : ">"}
          </button>
        </div>
        <ul className={`mb-10 px-3`}>{sideBarItems}</ul>
        <div
          className={`relative  flex overflow-hidden transition-all ${
            !isExpanded && "w-0"
          }`}
        >
          <img srcSet="/left-side-bar/banner.png 2x" className="w-full" />
          <div className="absolute  flex flex-col items-center justify-center w-full h-[252px] bottom-6">
            <p className={` text-white font-bold text-lg px-10`}>
              Upgrade your Account to Get Free Voucher
            </p>
            <button
              className={`rounded-lg p-3 items-start self-start ml-10 mt-3 text-black bg-white text-sm `}
            >
              Upgrade
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
