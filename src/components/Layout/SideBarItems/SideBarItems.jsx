import React from "react";
import Item from "./MenuItem/MenuItem";
import {
  Dashboard,
  FoodOrder,
  Favorite,
  Message,
  OrderHistory,
  Bills,
  Settings,
} from "../../UI/Icon/Icon";

export default function SideBarItems() {
  return (
    <>
      <Item
        icon={<Dashboard size={40} />}
        text="Dashboard"
        active={true}
        alert={true}
      />
      <Item icon={<FoodOrder size={40} />} text="Food Order" />
      <Item icon={<Favorite size={40} />} text="Favorite" />
      <Item icon={<Message size={40} />} text="Message" alert={true} />
      <Item icon={<OrderHistory size={40} />} text="Order History" />
      <Item icon={<Bills size={40} />} text="Bills" />
      <Item icon={<Settings size={40} />} text="Setting" />
    </>
  );
}
