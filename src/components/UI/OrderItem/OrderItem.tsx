import React from 'react'
import styles from './OrderItem.module.css'

export const OrderItem = ({ item }) => {
    return (
        <div className={`${styles['order-item-container']}`}>
            <img src={item.url} />
            <div className={`${styles['dish-container']}`}>
                <span className={`${styles['dish-name']}`}>Dish Name</span>
                <span className={`${styles['dish-quantity']}`}>x1</span>
            </div>
            <span className={`${styles['dish-price']}`}>+$5.59</span>
        </div>
    )
}
