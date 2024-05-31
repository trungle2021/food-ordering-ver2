import React from 'react'
import { UserSection } from '~/layout/RightSideBar/UserSection';
import styles from './styles.module.css'

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
