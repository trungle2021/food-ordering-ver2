import React from "react";
import { Search } from "../../UI/Icon/Icon";
import CategoryItems from "../../CategoryItems/CategoryItems";
import Dishes from "../../PopularDishes/Dishes";

export default function MainContent({ className, children }) {
  return (
    <main className={`${className} flex flex-col px-14 gap-10 pt-10`}>
      <div className="flex justify-between items-center">
        <span className="text-4xl text-black font-bold">Hello, Trung Le</span>
        <form className="w-80">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What do you want eat today..."
              required
            />
          </div>
        </form>
      </div>
      <img srcSet="/Banner.png 2x" />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <span className="font-bold text-2xl text-black">Category</span>
          <a href="#" className="font-normal text-lg text-primary-color">
            View all&nbsp;&nbsp;&gt;
          </a>
        </div>
        <CategoryItems />
      </div>
      {/* Popular Dishes */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <span className="font-bold text-2xl text-black">Popular Dishes</span>
          <a href="#" className="font-normal text-lg text-primary-color">
            View all&nbsp;&nbsp;&gt;
          </a>
        </div>
        <Dishes />
      </div>
      {/* Recent Orders */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <span className="font-bold text-2xl text-black">Recent Orders</span>
          <a href="#" className="font-normal text-lg text-primary-color">
            View all&nbsp;&nbsp;&gt;
          </a>
        </div>
        <Dishes />
      </div>
    </main>
  );
}
