import React from "react";
import styles from './MainContent.module.css'
import { HeaderSection } from "./HeaderSection/HeaderSection";
import { CategorySection } from "./CategorySection/CategorySection";
import { PopularDishSection } from './PopularDishSection/PopularDishSection'
import { RecentOrderSection } from './RecentOrderSection/RecentOrderSection'
export default function MainContent() {
  return (
    <main className={styles['main__content']} >
      <HeaderSection className={`${styles['header-section']}`} />
      <img style={{ width: '100%' }} src="/BannerMain.png" />
      <CategorySection />
      <PopularDishSection />
      <RecentOrderSection />
    </main >
  );
}
