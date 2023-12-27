import React from 'react'
import styles from '../NavBar/NavBar.module.css'

export const Navbar = ({ items }) => {
    return (
        <nav className={styles['navbar__container']}>
            <ul className={styles['navbar__list']}>
                {items.map(item => (
                    <li className={styles['navbar__item']} key={item.url}>
                        <a href={item.url} className={styles['navbar__link']}>
                                <img src={item.src}/>
                                <span>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
       </nav>
    )
}
