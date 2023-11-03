import React from "react";
import {
  Avatar,
  Location,
  Notification,
  OrderDiscussion,
  Settings02,
} from "../../UI/Icon/Icon";

export default function RightHeader({ className, children }) {
  return (
    <aside className={`${className} h-screen  border-l w-[455px] px-3`}>
      <div className="flex flex-col  pb-2 pl-4 pr-4 pt-14">
        {/* Setting Right */}
        <div className="flex justify-between  ml-4">
          <div className="flex space-x-4">
            <OrderDiscussion size={30} />
            <Notification size={30} />
            <Settings02 size={30} />
          </div>
          <div className="ml-auto">
            <Avatar size={30} />
          </div>
        </div>
        {/* Your Balance */}
        <div className="flex flex-col mt-7 mb-10">
          <h2 className="mb-3 text-2xl font-bold text-black">Your Balance</h2>
          <div className="relative flex items-center justify-center">
            <img srcSet="/right-side-bar/CardBalanceBackground.png" />
            <div className="absolute flex justify-around gap-8">
              <div className="bg-white rounded-lg flex flex-col justify-center px-5 py-5 text-black ">
                  <p className="text-sm">Balance</p>
                  <p className="font-bold text-2xl">$12.000</p>
              </div>
              <div className="flex justify-evenly items-center gap-6 text-white">
                <div>
                  <img
                    srcSet="/icon/Income.svg"
                    className="bg-white rounded-lg p-2"
                    width={`40px`}
                    height={`40px`}
                  />
                  <p className="text-xs">Top Up</p>
                </div>
                <div className="">
                  <img
                    srcSet="/icon/Profit.svg"
                    className="bg-white rounded-lg p-2"
                    width={`40px`}
                    height={`40px`}
                  />
                  <p className="text-xs">Transfer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Your Address */}
        <div className="flex flex-col mb-10">
          <h3 className="font-normal text-lg">Your Address</h3>
          <div className="flex gap-3 mb-2 items-center">
            <Location size={30}/>
            <span className="text-black text-lg font-bold">Elm Street, 23</span>
            <button className="ml-auto border-solid border-2 rounded-lg text-sm border-primary-color px-4 py-1 text-primary-color">Change</button>
          </div>
          <p className="text-sm font-normal mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. 
          </p>
          <div className="flex gap-4">
            <button className="border-solid border-2 px-4 py-1 rounded-lg border-action-button text-black">Add Details</button>
            <button className="border-solid border-2 px-4 py-1 rounded-lg border-action-button text-black">Add Note</button>
          </div>
        </div>
        {/* Your Order Menu */}
        <div>
        <h2 className="mb-3 text-2xl font-bold text-black">Order Menu</h2>
        
        </div>

      </div>
    </aside>
  );
}
