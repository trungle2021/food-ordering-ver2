import { React, useContext } from "react";
import { Logo } from "../../UI/Logo/Logo";
import { Navbar } from "../../UI/NavBar/Navbar";
import styled from 'styled-components'


export default function LeftSideBar({ className }) {


  const navItems = [
    { url: '#Dashboard', label: 'Dashboard', src: '/icon/Dashboard.svg' },
    { url: '#FoodOrder', label: 'Food Order', src: '/icon/FoodOrder.svg' },
    { url: '#Favorite', label: 'Favorite', src: '/icon/Favorite.svg' },
    { url: '#OrderHistory', label: 'Order History', src: '/icon/OrderHistory.svg' },
    { url: '#Bills', label: 'Bills', src: '/icon/Bills.svg' },
    { url: '#Setting', label: 'Setting', src: '/icon/Setting.svg' },
  ];



  return (
    <div className={className}>
      <Logo width='40%' />
      <Navbar items={navItems}/>
    </div>
  )
}
