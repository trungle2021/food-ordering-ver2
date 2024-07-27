import React from 'react'
import styles from './styles.module.css'
import { UserSection } from '~/components/layout/RightSideBar/UserSection';

interface HeaderPageProps {
    pageName: string;
}
export const HeaderPage = ({pageName}: HeaderPageProps) => {
  return (
    <div className={styles['header-container']}>
    <span className={styles['header-container__pageName']}>{pageName}</span>
    <UserSection />
    </div>
  )
}
