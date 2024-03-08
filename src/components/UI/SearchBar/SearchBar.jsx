import React from 'react'
import styles from './SearchBar.module.css'
import { SearchIcon } from '../Icon/Icon'

export const SearchBar = ({ placeholder }) => {
    return (
        <form className={`${styles['form-search']}`}>
            <SearchIcon className={`${styles['search-icon']}`} />
            <input type='text' placeholder={placeholder} className={`${styles['search-bar']}`} />
        </form>
    )
}
