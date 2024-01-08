import { React } from "react";
import { Logo } from "../../UI/Logo/Logo";
import { Navbar } from "../../UI/NavBar/Navbar";
import styles from './LeftSideBar.module.css'


export default function LeftSideBar({ className }) {


  const navItems = [
    { url: '#Dashboard', label: 'Dashboard', src: '/icon/Dashboard.svg' },
    { url: '#FoodOrder', label: 'Food Order', src: '/icon/FoodOrder.svg' },
    { url: '#Favorite', label: 'Favorite', src: '/icon/Favorite.svg' },
    { url: '#OrderHistory', label: 'Order History', src: '/icon/OrderHistory.svg' },
    { url: '#Bills', label: 'Bills', src: '/icon/Bills.svg' },
    { url: '#Setting', label: 'Setting', src: '/icon/Setting.svg' },
    { url: '#Logout', label: 'Logout', src: '/icon/Logout.svg' },
  ];



  return (
    <aside className={`${className} ${styles["sidebar--left"]}`}>
      <Logo className={`${styles["sidebar__logo"]}`} width='100%' />
      <Navbar items={navItems}/>
    </aside>
  )
}
