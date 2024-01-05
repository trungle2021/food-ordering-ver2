import React from "react";
import styles from './MainContent.module.css'
import { HeaderSection } from "./HeaderSection/HeaderSection";
import { CategoryItems } from '../../CategoryItems/CategoryItems'
import { PopularDishes } from '../../PopularDishes/PopularDishes'
import { RecentOrders } from '../../RecentOrders/RecentOrders'

export default function MainContent() {
  return (
    <main className={styles['main__content']} >
      <HeaderSection className={`${styles['header-section']}`} />
      <img style={{ width: '100%' }} src="/BannerMain.png" />
      <CategoryItems />
      <PopularDishes />
      <RecentOrders />
    </main >
  );
}
