import React from 'react'
import styles from './SearchBar.module.css'
import { SearchIcon } from '../Icon/Icon'

export const SearchBar = ({ text, placeholder }) => {
    return (
        <div>
            <SearchIcon className={`${styles['search-icon']}`} />
            <input type={text} placeholder={placeholder} className={`${styles['search-bar']}`} />
        </div>
    )
}
