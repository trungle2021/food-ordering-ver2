import React from 'react'
import styles from './SearchBar.module.css'
import SearchIcon from '../../../../public/icon'
export const SearchBar = ({ text, placeholder }) => {
    return (
        <>
            <SearchIcon />
            <input type={text} placeholder={placeholder} className={`${styles['search-bar']}`} />
        </>
    )
}
