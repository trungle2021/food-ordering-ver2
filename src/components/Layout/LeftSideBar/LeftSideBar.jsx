import { React, useContext } from "react";
import {
  LeftSideBarContext,
  LeftSideBarProvider,
} from "../../../store/LeftSideBarContext";

export default function LeftSideBar({ children }) {
  const { isExpanded, setIsExpanded } = useContext(LeftSideBarContext);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="pb-2 pl-4 pr-4 pt-14 flex justify-between items-center">
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
            {isExpanded ? "close" : "open"}
          </button>
        </div>
        <ul className={`flex-1 px-3`}>{children}</ul>
        <div
          className={`relative border-t flex  p-3 overflow-hidden transition-all ${
            !isExpanded && "w-0"
          }`}
        >
          <img
            srcSet="/left-side-bar/banner.png 2x"
            width={`100%`}
            // width={`252px`}
            // height={`200px`}
          />
          <div className="absolute top-14 right-30 p-4 ">
            <p className={`mb-4 text-white font-bold text-lg pl-7 pr-10`}>
              Upgrade your Account to Get Free Voucher
            </p>
            <button
              className={`rounded-lg text-black bg-white  ml-7 mr-10 px-6 py-4 text-sm `}
            >
              Upgrade
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
