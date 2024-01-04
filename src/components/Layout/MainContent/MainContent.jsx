import React from "react";
import styles from './MainContent.module.css'
import { HeaderSection } from "./HeaderSection/HeaderSection";

export default function MainContent({ className }) {
  return (
    <main className={className} >
      <HeaderSection className={`${styles['header-section']}`} />
    </main >
  );
}
