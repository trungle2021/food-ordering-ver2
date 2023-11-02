import React from "react";
import {
  Avatar,
  Notification,
  OrderDiscussion,
  Settings02,
} from "../../UI/Icon/Icon";

export default function RightHeader({ className, children }) {
  return (
    <aside className={`${className} h-screen`}>
      <div className="flex flex-col  pb-2 pl-4 pr-4 pt-14">
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
        <div className="flex flex-col">
          <h2>Your Balance</h2>
          <div className="relative flex">
            <img srcSet="/right-side-bar/CardBalanceBackground.png" />
            <div className="flex justify-around absolute w-full">
              <div className="bg-white rounded-lg text-black">
                <p>Balance</p>
                <p>$12.000</p>
              </div>
              <div className="flex justify-evenly  text-white">
                <div>
                  <img
                    srcSet="/icon/Income.svg"
                    className="bg-white rounded-lg"
                  />
                  <p>Top Up</p>
                </div>
                <div className="">
                  <img
                    srcSet="/icon/Profit.svg"
                    className="bg-white rounded-lg"
                  />
                  <p>Transfer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
