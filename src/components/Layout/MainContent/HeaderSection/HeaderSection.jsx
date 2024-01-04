import React from 'react'
import { SearchBar } from '../../../UI/SearchBar/SearchBar'
import styles from './HeaderSection.module.css'
export const HeaderSection = ({ className }) => {
    return (
        <div className={`${className} ${styles['header-section']}`}>
            <span>Hello, Trung Le</span>
            <SearchBar />
        </div>
    )
}
